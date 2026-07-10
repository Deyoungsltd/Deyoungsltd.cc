"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Image, MeshReflectorMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import type { Mesh, Group } from "three";
import * as THREE from "three";

interface HeroSceneProps {
  business?: "electronics" | "bole" | "combined";
}

function OrbitingItem({ url, position, speed, offset, color }: { url: string; position: [number, number, number]; speed: number; offset: number; color: string }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * position[0];
      ref.current.position.y = Math.sin(t * 0.5) * 0.5; 
      ref.current.position.z = Math.sin(t) * position[0];
      ref.current.rotation.y = -t + Math.PI / 2; 
    }
  });

  return (
    <group ref={ref}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh>
          <planeGeometry args={[1.6, 2.1]} />
          <meshPhysicalMaterial color={color} metalness={0.1} roughness={0.1} transmission={0.9} thickness={0.5} transparent opacity={0.2} />
        </mesh>
        <Image url={url} scale={[1.4, 1.9]} transparent opacity={1} />
        <mesh scale={[1.65, 2.15, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
      </Float>
    </group>
  );
}

function BrandObject({ business }: { business?: "electronics" | "bole" | "combined" }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.z += delta * 0.1;
    }
  });

  const color = business === "bole" ? "#9a3412" : business === "electronics" ? "#101828" : "#4a4a4a";

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref} castShadow receiveShadow>
        <torusKnotGeometry args={[0.7, 0.2, 128, 32]} />
        <meshPhysicalMaterial color={color} metalness={1} roughness={0.1} clearcoat={1} clearcoatRoughness={0} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

export default function HeroScene({ business = "electronics" }: HeroSceneProps) {
  const items = useMemo(() => {
    const electronics = [
      { url: "/products/fan.png", pos: [3, 0, 0] as [number, number, number], speed: 0.3, offset: 0, color: "#00ccff" },
      { url: "/products/stabilizer.png", pos: [3, 0, 0] as [number, number, number], speed: 0.3, offset: Math.PI * 0.66, color: "#00ccff" },
      { url: "/products/fan.png", pos: [3, 0, 0] as [number, number, number], speed: 0.3, offset: Math.PI * 1.33, color: "#00ccff" },
    ];
    const bole = [
      { url: "/products/bole_main.png", pos: [3, 0, 0] as [number, number, number], speed: 0.4, offset: 0, color: "#ffaa00" },
      { url: "/products/bole_side.png", pos: [3, 0, 0] as [number, number, number], speed: 0.4, offset: Math.PI * 0.66, color: "#ffaa00" },
      { url: "/products/bole_main.png", pos: [3, 0, 0] as [number, number, number], speed: 0.4, offset: Math.PI * 1.33, color: "#ffaa00" },
    ];
    if (business === "bole") return bole;
    if (business === "electronics") return electronics;
    return [...electronics, ...bole].map((item, i) => ({
      ...item,
      pos: [3.5, 0, 0] as [number, number, number],
      offset: item.offset + (i > 2 ? Math.PI / 2 : 0),
    }));
  }, [business]);

  return (
    <Canvas camera={{ position: [0, 0.5, 7], fov: 35 }} dpr={[1, 1.5]} shadows gl={{ antialias: true }}>
      <color attach="background" args={["#050608"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
      <pointLight position={[-5, -2, -5]} intensity={1} color={business === "bole" ? "#ffaa00" : "#00ccff"} />
      <BrandObject business={business} />
      {items.map((item, i) => (<OrbitingItem key={i} {...item} />))}
      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={15} blur={3} far={2} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial blur={[300, 100]} resolution={1024} mixBlur={1} mixStrength={40} roughness={1} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4} color="#050608" metalness={0.5} />
      </mesh>
      <Environment preset="city" />
    </Canvas>
  );
}
