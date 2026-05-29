import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Grid, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ----------------------------- Particle field ----------------------------- */
function Particles({ count = 1400, paused = false }: { count?: number; paused?: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current && !paused) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#00F5FF"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------ Floating shards --------------------------- */
function Shards({ paused = false }: { paused?: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current && !paused) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    }
  });

  const shards = useMemo(
    () => [
      { pos: [-4.5, 1.5, -2], scale: 1.1, color: "#00F5FF" },
      { pos: [4.2, -0.8, -1], scale: 0.8, color: "#FF006E" },
      { pos: [2.6, 2.2, -3], scale: 0.6, color: "#FFB800" },
      { pos: [-3, -1.8, -1.5], scale: 0.7, color: "#00F5FF" },
      { pos: [0, 2.8, -4], scale: 0.5, color: "#FF006E" },
    ],
    []
  );

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <Float
          key={i}
          speed={paused ? 0 : 1.4}
          rotationIntensity={paused ? 0 : 1.1}
          floatIntensity={paused ? 0 : 1.3}
        >
          <mesh position={s.pos as [number, number, number]} scale={s.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={s.color} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ----------------------- Mouse parallax on the camera --------------------- */
function CameraRig({ enabled = true }: { enabled?: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (!enabled) return;
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.8 + 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* --------------------------------- Scene ---------------------------------- */
export default function HeroScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      className="absolute inset-0 -z-10"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.5, 9], fov: 60 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      // Pause the render loop entirely under reduced-motion to save power.
      frameloop={reduced ? "demand" : "always"}
    >
      <color attach="background" args={["#0A0A0F"]} />
      <fog attach="fog" args={["#0A0A0F", 9, 24]} />
      <ambientLight intensity={0.4} />

      <Suspense fallback={null}>
        <Stars radius={60} depth={40} count={reduced ? 600 : 1800} factor={3} fade speed={0.4} />
        <Particles count={reduced ? 500 : 1400} paused={reduced} />
        <Shards paused={reduced} />

        {/* Infinite neon grid fading to the horizon */}
        <Grid
          position={[0, -3.2, 0]}
          args={[40, 40]}
          cellSize={0.8}
          cellThickness={0.6}
          cellColor="#0c5b63"
          sectionSize={4}
          sectionThickness={1.1}
          sectionColor="#00F5FF"
          fadeDistance={28}
          fadeStrength={2}
          infiniteGrid
        />
      </Suspense>

      <CameraRig enabled={!reduced} />
    </Canvas>
  );
}
