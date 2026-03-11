"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  networkNodes,
  NetworkConnection as ConnectionType,
} from "@/data/network-nodes";

interface ConnectionProps {
  connection: ConnectionType;
  isActive?: boolean;
  dimmed?: boolean;
  rippleTime?: number;
}

// Data stream particles per connection
const PULSE_COUNT = 5;

export function NetworkConnectionLine({
  connection,
  isActive,
  dimmed,
  rippleTime = Infinity,
}: ConnectionProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  const progressRefs = useRef<number[]>(
    Array.from({ length: PULSE_COUNT }, (_, i) => i / PULSE_COUNT)
  );

  const sourceNode = networkNodes.find((n) => n.id === connection.source);
  const targetNode = networkNodes.find((n) => n.id === connection.target);

  const strength = connection.strength ?? 0.5;

  const lineObject = useMemo(() => {
    if (!sourceNode || !targetNode) return null;

    // Create a curved line (quadratic bezier) for organic feel
    const start = new THREE.Vector3(...sourceNode.position);
    const end = new THREE.Vector3(...targetNode.position);
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          -0.3
        )
      );

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(30);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const baseOpacity = dimmed ? 0.03 : isActive ? 0.4 : 0.06 + strength * 0.1;
    const material = new THREE.LineBasicMaterial({
      color: "#00d4ff",
      transparent: true,
      opacity: baseOpacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Line(geometry, material);
  }, [sourceNode, targetNode, strength, isActive, dimmed]);

  useFrame((state, delta) => {
    if (!sourceNode || !targetNode) return;

    // Ripple effect — temporary brightness and speed boost
    const clock = state.clock.getElapsedTime();
    const timeSinceRipple = clock - rippleTime;
    const isRippling = timeSinceRipple > 0 && timeSinceRipple < 0.8;
    const rippleIntensity = isRippling
      ? Math.sin((timeSinceRipple / 0.8) * Math.PI)
      : 0;

    const speed = (isActive ? 0.6 : 0.2 + strength * 0.15) + rippleIntensity * 0.8;

    for (let i = 0; i < PULSE_COUNT; i++) {
      const pulse = pulseRefs.current[i];
      if (!pulse) continue;

      progressRefs.current[i] += delta * speed;
      if (progressRefs.current[i] > 1) progressRefs.current[i] = 0;

      const t = progressRefs.current[i];
      const [sx, sy, sz] = sourceNode.position;
      const [tx, ty, tz] = targetNode.position;

      // Lerp along straight path
      pulse.position.set(
        sx + (tx - sx) * t,
        sy + (ty - sy) * t,
        sz + (tz - sz) * t
      );

      const mat = pulse.material as THREE.MeshBasicMaterial;
      const fadeCurve = Math.sin(t * Math.PI);
      mat.opacity = dimmed
        ? fadeCurve * 0.1
        : isActive
          ? fadeCurve * 0.9
          : fadeCurve * (0.5 + rippleIntensity * 0.4);

      // Size variation across particles for depth
      const pulseScale = isActive ? 0.06 : 0.035;
      const sizeVariation = 0.6 + (i / PULSE_COUNT) * 0.8;
      pulse.scale.setScalar(pulseScale * sizeVariation * (1 + fadeCurve * 0.5));
    }

    // Update line opacity dynamically (includes ripple)
    if (lineObject) {
      const mat = lineObject.material as THREE.LineBasicMaterial;
      const baseOp = dimmed ? 0.04 : isActive ? 0.35 : 0.05 + strength * 0.08;
      mat.opacity = baseOp + rippleIntensity * 0.3;
    }
  });

  if (!lineObject || !sourceNode || !targetNode) return null;

  return (
    <group ref={groupRef}>
      <primitive object={lineObject} />

      {/* Data stream particles */}
      {Array.from({ length: PULSE_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={isActive ? "#ffffff" : "#00d4ff"}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
