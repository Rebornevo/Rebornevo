"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleGalaxy() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate spiral galaxy coordinates and colors
  const { positions, colors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#00f0ff"), // neon blue
      new THREE.Color("#bd00ff"), // neon purple
      new THREE.Color("#ff007a"), // neon pink
    ];

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 8;
      const theta = Math.random() * Math.PI * 2 + r * 0.8; // spiral twist factor
      
      const x = Math.cos(theta) * r + (Math.random() - 0.5) * 0.5;
      const y = (Math.random() - 0.5) * 0.4;
      const z = Math.sin(theta) * r + (Math.random() - 0.5) * 0.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const baseColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow orbital rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;

    // Smooth inertia tracking of mouse pointer
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.3;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetY, 0.05);
    pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, targetX, 0.05);
  });

  return (
    <group ref={pointsRef}>
      <Points positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </Points>
    </group>
  );
}

function FloatingObjects() {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (meshRef1.current) {
      meshRef1.current.rotation.x = elapsed * 0.08;
      meshRef1.current.rotation.y = elapsed * 0.12;
      meshRef1.current.position.y = Math.sin(elapsed * 0.4) * 0.25 + 1.2;
      meshRef1.current.position.x = Math.cos(elapsed * 0.25) * 0.3 - 2.2;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = -elapsed * 0.1;
      meshRef2.current.rotation.y = elapsed * 0.06;
      meshRef2.current.position.y = Math.cos(elapsed * 0.35) * 0.25 - 1.2;
      meshRef2.current.position.x = Math.sin(elapsed * 0.45) * 0.3 + 2.2;
    }
  });

  return (
    <>
      {/* Floating wireframe icosahedron */}
      <mesh ref={meshRef1} position={[-2.2, 1.2, 0]}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial
          color="#00f0ff"
          roughness={0.1}
          metalness={0.1}
          transmission={0.6}
          thickness={0.8}
          wireframe
        />
      </mesh>

      {/* Floating wireframe torus */}
      <mesh ref={meshRef2} position={[2.2, -1.2, 0]}>
        <torusGeometry args={[0.45, 0.14, 16, 80]} />
        <meshPhysicalMaterial
          color="#bd00ff"
          roughness={0.1}
          metalness={0.1}
          transmission={0.7}
          thickness={1}
          wireframe
        />
      </mesh>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#bd00ff" />
        <directionalLight position={[0, 4, 4]} intensity={1.2} color="#ffffff" />
        <ParticleGalaxy />
        <FloatingObjects />
      </Canvas>
    </div>
  );
}
