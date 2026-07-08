"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Image } from "@react-three/drei";
import { useRef, useMemo } from "react";
import type { Mesh, Group } from "three";

interface HeroSceneProps {
  business?: "electronics" | "bole";
}

function OrbitingItem({ url, position, speed, offset }: { url: string; position: [number, number, number]; speed: number; offset: number }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * position[0];
      ref.current.position.z = Math.sin(t) * position[0];
      ref.current.rotation.y = -t; // Face the center
    }
  });

  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Image 
          url={url} 
          scale={[1.2, 1.2]} 
          transparent 
          opacity={0.9}
          // Slightly tilt for dynamic feel
          rotation={[0, 0, 0]}
        />
      </Float>
    </group>
  );
}

function BrandObject({ business }: { business?: "electronics" | "bole" }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
    }
  });

  const color = business === "bole" ? "#9a3412" : "#101828";

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} castShadow receiveShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene({ business = "electronics" }: HeroSceneProps) {
  const items = useMemo(() => {
    if (business === "bole") {
      return [
        { url: "https://picsum.photos/seed/bole1/400/400", pos: [2.5, 0, 0] as [number, number, number], speed: 0.4, offset: 0 },
        { url: "https://picsum.photos/seed/bole2/400/400", pos: [2.5, 0, 0] as [number, number, number], speed: 0.4, offset: Math.PI * 0.66 },
        { url: "https://picsum.photos/seed/bole3/400/400", pos: [2.5, 0, 0] as [number, number, number], speed: 0.4, offset: Math.PI * 1.33 },
      ];
    }
    return [
      { url: "https://picsum.photos/seed/elec1/400/400", pos: [2.5, 0, 0] as [number, number, number], speed: 0.3, offset: 0 },
      { url: "https://picsum.photos/seed/elec2/400/400", pos: [2.5, 0, 0] as [number, number, number], speed: 0.3, offset: Math.PI * 0.66 },
      { url: "https://picsum.photos/seed/elec3/400/400", pos: [2.5, 0, 0] as [number, number, number], speed: 0.3, offset: Math.PI * 1.33 },
    ];
  }, [business]);

  return (
    <Canvas
      camera={{ position: [0, 0.4, 6], fov: 38 }}
      dpr={[1, 1.5]}
      shadows
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0b0d12"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={1.8} castShadow />
      <pointLight position={[-3, -1, -2]} intensity={0.8} color={business === "bole" ? "#ffcc00" : "#00ccff"} />
      
      <BrandObject business={business} />
      
      {items.map((item, i) => (
        <OrbitingItem 
          key={i} 
          url={item.url} 
          position={item.pos} 
          speed={item.speed} 
          offset={item.offset} 
        />
      ))}

      <ContactShadows position={[0, -1.4, 0]} opacity={0.6} scale={10} blur={2.5} far={2} />
      <Environment preset="city" />
    </Canvas>
  );
}
