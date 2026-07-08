"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useRef, useMemo } from "react";
import type { Mesh } from "three";

function BrandObject() {
  const ref = useRef<Mesh>(null);
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x = Math.sin(Date.now() * 0.0002) * 0.08;
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1}
      rotationIntensity={reducedMotion ? 0 : 0.15}
      floatIntensity={reducedMotion ? 0 : 0.4}
    >
      <mesh ref={ref} castShadow receiveShadow>
        <dodecahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          color="#1c2333"
          metalness={0.85}
          roughness={0.22}
          clearcoat={0.6}
          clearcoatRoughness={0.3}
          reflectivity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5], fov: 38 }}
      dpr={[1, 1.5]}
      shadows
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0b0d12"]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3, 4, 3]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, -1, -2]} intensity={0.5} color="#d4af6a" />
      <BrandObject />
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.5}
        scale={8}
        blur={2.5}
        far={2}
      />
      <Environment preset="studio" />
    </Canvas>
  );
}
