"use client";

import { Suspense, useRef, useCallback, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import {
  networkNodes,
  networkConnections,
  NetworkNode as NodeType,
} from "@/data/network-nodes";
import { NetworkNodeMesh } from "./NetworkNode";
import { NetworkConnectionLine } from "./NetworkConnection";

// Background floating particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const t = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = t * 0.015;
    particlesRef.current.rotation.x = Math.sin(t * 0.008) * 0.1;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        color="#00d4ff"
        size={0.035}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function NetworkScene({
  onNodeClick,
  activeNodeId,
  onHoverNode,
  onBackgroundClick,
}: {
  onNodeClick?: (node: NodeType) => void;
  activeNodeId: string | null;
  onHoverNode?: (node: NodeType | null) => void;
  onBackgroundClick?: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, camera } = useThree();

  // Smoothed mouse for fluid tracking
  const smoothMouse = useRef({ x: 0, y: 0 });
  const targetCameraZ = useRef(9);

  // Track which nodes are connected to the active node
  const connectedToActive = useMemo(() => {
    if (!activeNodeId) return new Set<string>();
    const connected = new Set<string>();
    connected.add(activeNodeId);
    networkConnections.forEach((conn) => {
      if (conn.source === activeNodeId) connected.add(conn.target);
      if (conn.target === activeNodeId) connected.add(conn.source);
    });
    return connected;
  }, [activeNodeId]);

  // Ripple propagation — maps nodeId → rippleTime (clock time when ripple hits)
  const rippleTimesRef = useRef<Map<string, number>>(new Map());
  const [, forceRippleRender] = useState(0);

  // Build adjacency map once
  const adjacencyMap = useMemo(() => {
    const map = new Map<string, string[]>();
    networkConnections.forEach((conn) => {
      if (!map.has(conn.source)) map.set(conn.source, []);
      if (!map.has(conn.target)) map.set(conn.target, []);
      map.get(conn.source)!.push(conn.target);
      map.get(conn.target)!.push(conn.source);
    });
    return map;
  }, []);

  // Trigger ripple on hover
  const hoveredIdRef = useRef<string | null>(null);
  const handleHoverForRipple = useCallback(
    (node: NodeType | null) => {
      onHoverNode?.(node);
      const newId = node?.id ?? null;
      if (newId === hoveredIdRef.current) return;
      hoveredIdRef.current = newId;

      if (!newId) {
        rippleTimesRef.current.clear();
        forceRippleRender((c) => c + 1);
        return;
      }

      // BFS from hovered node — assign ripple times with 0.15s delay per hop
      const times = new Map<string, number>();
      const now = performance.now() / 1000;
      const queue: [string, number][] = [[newId, 0]];
      const visited = new Set<string>([newId]);
      times.set(newId, now);

      while (queue.length > 0) {
        const [current, depth] = queue.shift()!;
        if (depth >= 2) continue;
        const neighbors = adjacencyMap.get(current) ?? [];
        for (const neighbor of neighbors) {
          if (visited.has(neighbor)) continue;
          visited.add(neighbor);
          times.set(neighbor, now + (depth + 1) * 0.15);
          queue.push([neighbor, depth + 1]);
        }
      }

      rippleTimesRef.current = times;
      forceRippleRender((c) => c + 1);
    },
    [adjacencyMap, onHoverNode]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth the mouse input for fluid movement
    smoothMouse.current.x = THREE.MathUtils.lerp(
      smoothMouse.current.x,
      mouse.x,
      0.08
    );
    smoothMouse.current.y = THREE.MathUtils.lerp(
      smoothMouse.current.y,
      mouse.y,
      0.08
    );

    const mx = smoothMouse.current.x;
    const my = smoothMouse.current.y;

    // Find active node for camera focus
    const activeNode = activeNodeId
      ? networkNodes.find((n) => n.id === activeNodeId)
      : null;

    if (activeNode && activeNode.tier !== "core") {
      // Rotate group to focus the clicked node toward the camera
      const [nx, ny, nz] = activeNode.position;
      const targetRotY = -Math.atan2(nx, nz || 0.01);
      const targetRotX = Math.atan2(ny, Math.sqrt(nx * nx + (nz || 0.01) * (nz || 0.01)));

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY + mx * 0.08 + Math.sin(t * 0.1) * 0.01,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX + my * 0.04 + Math.cos(t * 0.08) * 0.01,
        0.04
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mx * -0.02,
        0.04
      );
    } else {
      // Default: full mouse parallax
      groupRef.current.rotation.y =
        mx * 0.35 + Math.sin(t * 0.1) * 0.02;
      groupRef.current.rotation.x =
        my * 0.18 + Math.cos(t * 0.08) * 0.015;
      groupRef.current.rotation.z = mx * -0.04;
    }

    // Camera zoom — pull in when a node is active
    targetCameraZ.current = activeNodeId ? 6.5 : 9;
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetCameraZ.current,
      0.03
    );

    // Slight camera offset toward mouse for depth
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mx * 0.5,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      my * 0.3,
      0.03
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Deep background stars */}
      <Stars
        radius={50}
        depth={30}
        count={1500}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      <FloatingParticles />

      <group ref={groupRef} position={[2.5, 0, 0]}>
        {/* Lighting — off-center to avoid blasting the core node */}
        <ambientLight intensity={0.4} />
        <pointLight
          position={[2, 2, 8]}
          intensity={1.5}
          color="#00d4ff"
          distance={25}
        />
        <pointLight
          position={[-6, 4, 3]}
          intensity={1.2}
          color="#38bdf8"
          distance={20}
        />
        <pointLight
          position={[6, -4, 3]}
          intensity={1}
          color="#60a5fa"
          distance={20}
        />
        <pointLight
          position={[0, -5, 4]}
          intensity={0.8}
          color="#00d4ff"
          distance={15}
        />

        {/* Connection lines */}
        {networkConnections.map((conn) => {
          const isActive =
            activeNodeId !== null &&
            (conn.source === activeNodeId || conn.target === activeNodeId);
          const dimmed =
            activeNodeId !== null &&
            !connectedToActive.has(conn.source) &&
            !connectedToActive.has(conn.target);

          const rippleTime = Math.min(
            rippleTimesRef.current.get(conn.source) ?? Infinity,
            rippleTimesRef.current.get(conn.target) ?? Infinity
          );

          return (
            <NetworkConnectionLine
              key={`${conn.source}-${conn.target}`}
              connection={conn}
              isActive={isActive}
              dimmed={dimmed}
              rippleTime={rippleTime}
            />
          );
        })}

        {/* Nodes */}
        {networkNodes.map((node) => {
          const hasActive = activeNodeId !== null;
          const isSelfActive = activeNodeId === node.id;
          const isConnected = connectedToActive.has(node.id);

          return (
            <NetworkNodeMesh
              key={node.id}
              node={node}
              onClick={onNodeClick}
              onHover={handleHoverForRipple}
              isActive={isSelfActive}
              isConnectedToActive={
                hasActive
                  ? isSelfActive
                    ? true
                    : isConnected
                  : undefined
              }
              rippleTime={rippleTimesRef.current.get(node.id) ?? null}
            />
          );
        })}
      </group>
    </>
  );
}

interface NeuralNetworkProps {
  className?: string;
  onNodeClick?: (node: NodeType) => void;
  onHoverNode?: (node: NodeType | null) => void;
  activeNodeId?: string | null;
  onBackgroundClick?: () => void;
}

export default function NeuralNetwork({
  className = "",
  onNodeClick,
  onHoverNode,
  activeNodeId = null,
  onBackgroundClick,
}: NeuralNetworkProps) {
  const handleNodeClick = useCallback(
    (node: NodeType) => {
      onNodeClick?.(node);
    },
    [onNodeClick]
  );

  return (
    <div className={`w-full h-full ${className}`} style={{ minHeight: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        onPointerMissed={() => onBackgroundClick?.()}
      >
        <Suspense fallback={null}>
          <NetworkScene
            onNodeClick={handleNodeClick}
            activeNodeId={activeNodeId}
            onHoverNode={onHoverNode}
            onBackgroundClick={onBackgroundClick}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
