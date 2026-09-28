"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function CRTMonitor({ onClick }: { onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = THREE.MathUtils.lerp(
        material.emissiveIntensity,
        hovered ? 0.8 : 0.4,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Monitor body */}
      <RoundedBox
        args={[2, 1.6, 1.2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
      </RoundedBox>

      {/* Screen bezel */}
      <RoundedBox
        args={[1.7, 1.3, 0.05]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.05, 0.58]}
      >
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </RoundedBox>

      {/* Screen (clickable) */}
      <mesh
        ref={screenRef}
        position={[0, 0.05, 0.61]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[1.5, 1.1]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#4ade80"
          emissiveIntensity={0.4}
          roughness={0.1}
        />
      </mesh>

      {/* Screen text */}
      <Text
        position={[0, 0.15, 0.62]}
        fontSize={0.08}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        {"> Click to open terminal"}
      </Text>
      
      <Text
        position={[0, -0.05, 0.62]}
        fontSize={0.06}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
        fillOpacity={0.6}
      >
        recruiter-brief v1.0
      </Text>

      {/* Monitor stand */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.2, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Monitor base */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Power LED */}
      <mesh position={[0.7, -0.6, 0.6]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color="#4ade80"
          emissive="#4ade80"
          emissiveIntensity={hovered ? 2 : 1}
        />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Desk surface */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#3d3024" roughness={0.7} metalness={0} />
      </mesh>

      {/* Coffee mug */}
      <group position={[1.2, 0.15, 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.07, 0.15, 16]} />
          <meshStandardMaterial color="#f5f5f4" roughness={0.3} />
        </mesh>
        {/* Coffee */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.05, 16]} />
          <meshStandardMaterial color="#3d2817" roughness={0.1} />
        </mesh>
      </group>

      {/* Notebook */}
      <mesh position={[-1.1, 0.08, 0.2]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Pen */}
      <mesh position={[-0.8, 0.1, 0.3]} rotation={[0, 0.5, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial color="#c9a227" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

function Scene({ onMonitorClick }: { onMonitorClick: () => void }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight
        position={[2, 4, 3]}
        angle={0.4}
        penumbra={0.5}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[-2, 2, 1]} intensity={0.3} color="#fbbf24" />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <CRTMonitor onClick={onMonitorClick} />
      </Float>
      
      <Desk />

      <Environment preset="night" />
    </>
  );
}

interface DeskSceneProps {
  onTerminalOpen: () => void;
  className?: string;
}

export default function DeskScene({ onTerminalOpen, className = "" }: DeskSceneProps) {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return (
      <div className={`flex items-center justify-center bg-surface-card rounded-lg border border-surface-border ${className}`}>
        <button
          onClick={onTerminalOpen}
          className="flex flex-col items-center gap-3 p-8 text-stone-400 hover:text-terminal-green transition-colors"
        >
          <svg
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-mono text-sm">Open Recruiter Terminal</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene onMonitorClick={onTerminalOpen} />
        </Suspense>
      </Canvas>
      <p className="text-center text-xs font-mono text-stone-600 mt-2">
        Click the monitor to open the terminal
      </p>
    </div>
  );
}
