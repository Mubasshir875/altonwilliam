import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows, MeshReflectorMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface ExperienceProps {
  carColor?: string;
  autoRotate?: boolean;
  boost?: boolean;
}

export default function Experience({ 
  carColor = "#0a0a0a", 
  autoRotate = true, 
  boost = false 
}: ExperienceProps) {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[8, 3, 8]} fov={40} />
      <OrbitControls 
        enablePan={false} 
        maxPolarAngle={Math.PI / 2} 
        minDistance={5} 
        maxDistance={15}
        autoRotate={autoRotate}
        autoRotateSpeed={boost ? 10 : 0.5}
      />
      
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 20]} />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <CarScene carColor={carColor} boost={boost} />
      
      {/* Red Underglow */}
      <pointLight position={[0, 0.1, 0]} color="#ff0000" intensity={boost ? 30 : 15} distance={5} />
      <pointLight position={[0, 0.1, 1.5]} color="#ff0000" intensity={boost ? 15 : 8} distance={3} />
      <pointLight position={[0, 0.1, -1.5]} color="#ff0000" intensity={boost ? 15 : 8} distance={3} />
      
      <Environment preset="city" />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={1}
        />
      </mesh>
    </Canvas>
  );
}

export function CarScene({ carColor, boost }: { carColor: string; boost: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={groupRef}>
      <Float speed={boost ? 5 : 1.5} rotationIntensity={boost ? 0.5 : 0.2} floatIntensity={boost ? 1 : 0.5}>
        <group>
          <CarBody color={carColor} boost={boost} />
          {/* Windows Detail */}
          <mesh position={[0, 0.9, -0.2]} castShadow>
            <boxGeometry args={[1.61, 0.61, 2.01]} />
            <meshStandardMaterial color={boost ? "#ff0000" : "#000"} roughness={0} metalness={1} transparent opacity={0.6} />
          </mesh>
          
          <Wheel position={[1, 0.4, 1.5]} boost={boost} />
          <Wheel position={[-1, 0.4, 1.5]} boost={boost} />
          <Wheel position={[1, 0.4, -1.5]} boost={boost} />
          <Wheel position={[-1, 0.4, -1.5]} boost={boost} />
        </group>
      </Float>
      
      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.75} 
        scale={10} 
        blur={2.5} 
        far={4} 
      />
    </group>
  );
}

function CarBody({ color, boost }: { color: string; boost: boolean }) {
  return (
    <group>
      {/* Main Chassis - Sleeker ZR1 Profile */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[2.1, 0.45, 4.6]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
      </mesh>
      
      {/* Cabin with Split Window Detail */}
      <group position={[0, 0.85, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[1.7, 0.55, 2.2]} />
          <meshStandardMaterial color="#ff0000" roughness={0.5} metalness={0.2} transparent opacity={0.4} />
        </mesh>
        {/* Split Window Pillar */}
        <mesh position={[0, 0.2, -1.1]}>
          <boxGeometry args={[0.05, 0.2, 0.05]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>

      {/* Flow-Through Hood */}
      <mesh castShadow position={[0, 0.5, 1.5]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[1.4, 0.1, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Side Air Inlets */}
      <mesh position={[1.05, 0.5, -0.5]}>
        <boxGeometry args={[0.1, 0.4, 0.8]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1.05, 0.5, -0.5]}>
        <boxGeometry args={[0.1, 0.4, 0.8]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Massive ZR1 Carbon Wing */}
      <group position={[0, 1.2, -2.2]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 0.04, 0.6]} />
          <meshStandardMaterial color="#111" roughness={0.1} metalness={1} />
        </mesh>
        {/* Wing Supports */}
        <mesh position={[0.7, -0.3, 0]}>
          <boxGeometry args={[0.05, 0.6, 0.1]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <mesh position={[-0.7, -0.3, 0]}>
          <boxGeometry args={[0.05, 0.6, 0.1]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>

      {/* Headlights - Aggressive LED */}
      <mesh position={[0.8, 0.45, 2.3]}>
        <boxGeometry args={[0.3, 0.05, 0.1]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={boost ? 10 : 4} />
      </mesh>
      <mesh position={[-0.8, 0.45, 2.3]}>
        <boxGeometry args={[0.3, 0.05, 0.1]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={boost ? 10 : 4} />
      </mesh>

      {/* Taillights - Quad Style */}
      <group position={[0, 0.5, -2.31]}>
        <mesh position={[0.4, 0, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={boost ? 8 : 3} />
        </mesh>
        <mesh position={[-0.4, 0, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={boost ? 8 : 3} />
        </mesh>
      </group>

      {/* Logo - ZR1 Badge */}
      <mesh position={[0, 0.4, 2.31]}>
        <boxGeometry args={[0.15, 0.15, 0.01]} />
        <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={boost ? 20 : 10} />
      </mesh>
    </group>
  );
}

function Wheel({ position, boost }: { position: [number, number, number]; boost: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += boost ? 0.2 : 0.05;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      {/* Rims - Red Accents */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.32, 32]} />
        <meshStandardMaterial color="#ff0000" metalness={1} roughness={0.2} emissive="#ff0000" emissiveIntensity={boost ? 2 : 0.5} />
      </mesh>
    </group>
  );
}
