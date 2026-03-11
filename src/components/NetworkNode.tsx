"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { NetworkNode as NodeType } from "@/data/network-nodes";
import "./FresnelMaterial";

interface NetworkNodeProps {
  node: NodeType;
  onClick?: (node: NodeType) => void;
  isActive?: boolean;
  isConnectedToActive?: boolean;
  onHover?: (node: NodeType | null) => void;
  rippleTime?: number | null;
}

export function NetworkNodeMesh({
  node,
  onClick,
  isActive,
  isConnectedToActive,
  onHover,
  rippleTime = null,
}: NetworkNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const fresnelRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Spring physics state
  const velocity = useRef<[number, number, number]>([0, 0, 0]);
  const currentPos = useRef<[number, number, number]>([...node.position]);
  const targetPos = useRef<[number, number, number]>([...node.position]);

  // Orbital entrance — start far out along radial direction, glide inward
  useEffect(() => {
    const [px, py, pz] = node.position;
    const dist = Math.sqrt(px * px + py * py + pz * pz) || 1;
    const outwardScale = 2.5;
    const angle = (Math.random() - 0.5) * 0.6;

    currentPos.current = [
      px * outwardScale + Math.sin(angle) * dist * 0.5,
      py * outwardScale + Math.cos(angle) * dist * 0.5,
      pz * outwardScale - 2,
    ];
  }, [node.position]);

  // Scale fade-in tracking
  const mountTime = useRef(0);
  const hasSetMount = useRef(false);
  const easedEntranceRef = useRef(0);

  const baseScale =
    node.tier === "core"
      ? 0.55
      : node.tier === "primary"
        ? 0.32
        : node.tier === "secondary"
          ? 0.22
          : 0.12;

  const scale = (node.scale ?? 1) * baseScale;

  // Hit area matches the visual sphere
  const hitRadius = scale;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Scale fade-in — easeOutCubic over 1.5s
    if (!hasSetMount.current) {
      mountTime.current = t;
      hasSetMount.current = true;
    }
    const elapsed = t - mountTime.current;
    const entranceFactor = Math.min(elapsed / 1.5, 1);
    const easedEntrance = 1 - Math.pow(1 - entranceFactor, 3);
    easedEntranceRef.current = easedEntrance;

    // Spring physics with fluid floating
    const springK = 1.2;
    const damping = 0.96;
    const [cx, cy, cz] = currentPos.current;
    const [tx, ty, tz] = targetPos.current;

    // Unique per-node floating — multiple frequencies for organic feel
    const seed = node.position[0] * 7 + node.position[1] * 13;
    const floatX =
      Math.sin(t * 0.4 + seed) * 0.2 +
      Math.sin(t * 0.7 + seed * 2) * 0.08;
    const floatY =
      Math.cos(t * 0.35 + seed * 0.5) * 0.25 +
      Math.cos(t * 0.6 + seed) * 0.1;
    const floatZ =
      Math.sin(t * 0.25 + seed * 1.5) * 0.12;

    // When hovered, gently pull toward camera
    const hoverPull = hovered ? 0.3 : 0;

    const fx = tx + floatX;
    const fy = ty + floatY;
    const fz = tz + floatZ + hoverPull;

    // Spring force
    velocity.current[0] += (fx - cx) * springK * delta;
    velocity.current[1] += (fy - cy) * springK * delta;
    velocity.current[2] += (fz - cz) * springK * delta;

    // Damping
    velocity.current[0] *= damping;
    velocity.current[1] *= damping;
    velocity.current[2] *= damping;

    // Update position
    currentPos.current[0] += velocity.current[0];
    currentPos.current[1] += velocity.current[1];
    currentPos.current[2] += velocity.current[2];

    groupRef.current.position.set(
      currentPos.current[0],
      currentPos.current[1],
      currentPos.current[2]
    );

    // Scale animation — smooth pop with entrance fade-in
    const baseTargetScale = isActive ? scale * 1.5 : hovered ? scale * 1.25 : scale;
    const targetScale = baseTargetScale * easedEntrance;
    if (meshRef.current) {
      const s = meshRef.current.scale.x;
      const newS = THREE.MathUtils.lerp(s, targetScale, 0.12);
      meshRef.current.scale.setScalar(newS);
    }

    // Glow pulse — tier-aware caps to prevent core "sun" effect
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      const isCore = node.tier === "core";
      const baseOpacity = isCore
        ? (isActive ? 0.15 : hovered ? 0.12 : 0.08)
        : isActive
          ? 0.4
          : isConnectedToActive
            ? 0.28
            : hovered
              ? 0.35
              : 0.15;
      mat.opacity =
        (baseOpacity + Math.sin(t * 2 + seed) * (isCore ? 0.03 : 0.08)) * easedEntrance;

      const glowScale = isCore
        ? (isActive ? 2.0 : hovered ? 1.8 : 1.5)
        : (isActive ? 3.5 : hovered ? 3.0 : 2.5);
      glowRef.current.scale.setScalar(
        THREE.MathUtils.lerp(
          glowRef.current.scale.x,
          scale * glowScale,
          0.08
        )
      );
    }

    // Pulse ring
    if (ringRef.current) {
      const ringMat = ringRef.current.material as THREE.MeshBasicMaterial;
      if (isActive || hovered) {
        const pulse = (t * 0.8) % 1;
        ringRef.current.scale.setScalar(scale * (2 + pulse * 4));
        ringMat.opacity = 0.5 * (1 - pulse);
        ringRef.current.visible = true;
      } else {
        ringRef.current.visible = false;
      }
    }

    // Wireframe rotation — slow spin, faster when hovered/active
    if (wireframeRef.current) {
      const spinSpeed = isActive ? 0.4 : hovered ? 0.25 : 0.08;
      wireframeRef.current.rotation.y += delta * spinSpeed;
      wireframeRef.current.rotation.x += delta * spinSpeed * 0.3;
      wireframeRef.current.scale.setScalar(
        THREE.MathUtils.lerp(
          wireframeRef.current.scale.x,
          targetScale * 1.15,
          0.08
        )
      );
    }

    // Fresnel shell — scale and opacity
    if (fresnelRef.current) {
      fresnelRef.current.scale.setScalar(
        THREE.MathUtils.lerp(
          fresnelRef.current.scale.x,
          targetScale * 1.05,
          0.08
        )
      );
      const fresnelMat = fresnelRef.current.material as unknown as { opacity: number; glowIntensity: number };
      fresnelMat.opacity = easedEntrance * (hovered || isActive ? 0.9 : 0.5);
      fresnelMat.glowIntensity = isActive ? 0.8 : hovered ? 0.6 : 0.3;
    }

    // Ripple flash — brief emissive boost when ripple arrives
    let rippleFlash = 0;
    if (rippleTime !== null) {
      const timeSinceRipple = t - rippleTime;
      if (timeSinceRipple > 0 && timeSinceRipple < 0.6) {
        rippleFlash = Math.sin((timeSinceRipple / 0.6) * Math.PI) * 0.8;
      }
    }

    // Update emissive intensity dynamically (includes ripple)
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const baseEmissive = node.tier === "core"
        ? (isActive ? 1.0 : hovered ? 0.8 : 0.6)
        : (isActive ? 2.5 : hovered ? 2.2 : isConnectedToActive ? 1.5 : 1);
      mat.emissiveIntensity = baseEmissive + rippleFlash;
    }
  });

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
    onHover?.(node);
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "default";
    onHover?.(null);
  };

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    // Subtle nudge on click
    velocity.current = [
      (Math.random() - 0.5) * 0.15,
      Math.random() * 0.1 + 0.05,
      (Math.random() - 0.5) * 0.1,
    ];
    onClick?.(node);
  };

  // Dimmed when another node is active and this one isn't connected
  const dimmed = isActive === false && isConnectedToActive === false;

  // Show label for non-tertiary always, show extra info on hover
  const showLabel =
    node.tier !== "tertiary" && node.label && node.tier !== "core";

  return (
    <group ref={groupRef}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef} scale={scale * 3.5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[0.9, 1, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Invisible hit area — larger than visual so small nodes are easy to hover */}
      <mesh
        scale={hitRadius}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        visible={false}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Visual sphere */}
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={dimmed ? "#1a1a2e" : node.color}
          emissive={dimmed ? "#0a0a15" : node.color}
          emissiveIntensity={0.6}
          roughness={node.tier === "core" ? 0.35 : 0.1}
          metalness={node.tier === "core" ? 0.6 : 0.95}
          transparent={dimmed}
          opacity={dimmed ? 0.4 : 1}
        />
      </mesh>

      {/* Fresnel edge glow shell */}
      {!dimmed && (
        <mesh ref={fresnelRef} scale={scale * 1.05}>
          <sphereGeometry args={[1, 32, 32]} />
          <fresnelShaderMaterial
            color={node.color}
            fresnelPower={node.tier === "core" ? 1.5 : 2.5}
            opacity={easedEntranceRef.current * (hovered || isActive ? 0.9 : 0.5)}
            glowIntensity={isActive ? 0.8 : hovered ? 0.6 : 0.3}
            transparent
            depthWrite={false}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Rotating wireframe overlay */}
      {!dimmed && node.tier !== "tertiary" && (
        <mesh ref={wireframeRef} scale={scale * 1.15}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={node.color}
            wireframe
            transparent
            opacity={easedEntranceRef.current * (isActive ? 0.4 : hovered ? 0.3 : 0.12)}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Label — always visible for non-tertiary, enhanced on hover */}
      {showLabel && (
        <Html
          position={[0, scale * 1.3 + 0.3, 0]}
          center
          style={{
            pointerEvents: "none",
            opacity: dimmed ? 0.2 : 1,
            transition: "opacity 0.3s",
          }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span
              className="font-mono text-[10px] font-bold tracking-widest uppercase whitespace-nowrap select-none"
              style={{
                color:
                  isActive || hovered
                    ? "#00d4ff"
                    : "rgba(255,255,255,0.5)",
                textShadow:
                  "0 0 12px rgba(0,212,255,0.5), 0 2px 8px rgba(0,0,0,0.9)",
                transition: "color 0.2s",
              }}
            >
              {node.label}
            </span>
            {/* Tech pills on hover */}
            {hovered && !isActive && node.tech && (
              <div className="flex gap-1 mt-0.5">
                {node.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[7px] font-mono px-1 py-0.5 rounded bg-[#00d4ff]/15 text-[#00d4ff]/70 border border-[#00d4ff]/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Html>
      )}

      {/* Core JCG label */}
      {node.tier === "core" && (
        <Html center style={{ pointerEvents: "none" }}>
          <div className="flex flex-col items-center">
            <span
              className="font-mono text-3xl font-bold select-none"
              style={{
                color: "#000000",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                letterSpacing: "0.15em",
              }}
            >
              JCG
            </span>
            <span
              className="font-mono text-[8px] tracking-[0.2em] uppercase mt-1 select-none"
              style={{
                color: "#0a0a15",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                transition: "color 0.3s",
              }}
            >
              AI ENGINEER
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
