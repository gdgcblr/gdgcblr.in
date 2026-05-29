"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "sphere" | "box" | "tetrahedron";
  fieldStrength?: number;
}

const AntigravityInner: React.FC<AntigravityProps> = ({
  count = 400,
  magnetRadius = 30,
  ringRadius = 12,
  waveSpeed = 0.2,
  waveAmplitude = 0.5,
  particleSize = 0.25,
  lerpSpeed = 0.04,
  autoAnimate = true,
  particleVariance = 1.0,
  rotationSpeed = 0.1,
  depthFactor = 2,
  pulseSpeed = 0.5,
  particleShape = "sphere",
  fieldStrength = 12,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const shouldReduceMotion = useReducedMotion();

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });
  const globalMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;

      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 20;

      const randomRadiusOffset = (Math.random() - 0.5) * 2;
      const colorIndex = Math.floor(Math.random() * GOOGLE_COLORS.length);

      temp.push({
        t,
        speed: shouldReduceMotion ? 0 : speed,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        randomRadiusOffset,
        color: new THREE.Color(GOOGLE_COLORS[colorIndex]),
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height, shouldReduceMotion]);

  // Set colors on mount
  useEffect(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      meshRef.current!.setColorAt(i, particle.color);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [particles]);

  useFrame((state) => {
    if (shouldReduceMotion) return;

    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v } = state;
    const m = globalMouse.current;

    const mouseDist = Math.sqrt(
      Math.pow(m.x - lastMousePos.current.x, 2) +
        Math.pow(m.y - lastMousePos.current.y, 2),
    );

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: m.x, y: m.y };
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.5) * (v.width / 4);
      destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
    }

    const smoothFactor = 0.05;
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;

    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, i) => {
      let { t, speed, mx, my, mz, cz, randomRadiusOffset } = particle;

      t = particle.t += speed / 2;

      const projectionFactor = 1 - cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;

      const dx = mx - projectedTargetX;
      const dy = my - projectedTargetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Constant slow floating motion when idle
      let targetPos = {
        x: mx + Math.sin(t * 0.15 + randomRadiusOffset * 10) * 2.5,
        y: my + Math.cos(t * 0.12 + randomRadiusOffset * 10) * 2.5,
        z: mz * depthFactor + Math.sin(t * 0.1 + randomRadiusOffset) * 2.5,
      };

      let currentLerpSpeed = lerpSpeed;
      if (dist < magnetRadius) {
        // Add a unique phase offset (i * 0.5) so they spread completely around the pointer
        const angle = Math.atan2(dy, dx) + globalRotation + i * 0.5;

        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));

        const currentRingRadius = ringRadius + wave + deviation;

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetPos.z =
          mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor);

        // Realistic magnetic acceleration: stronger pull when closer to the core
        const pullFactor = 1 - dist / magnetRadius;
        currentLerpSpeed = lerpSpeed + 0.15 * pullFactor;
      }

      particle.cx += (targetPos.x - particle.cx) * currentLerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * currentLerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * currentLerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.sqrt(
        Math.pow(particle.cx - projectedTargetX, 2) +
          Math.pow(particle.cy - projectedTargetY, 2),
      );

      const distFromRing = Math.abs(currentDistToMouse - ringRadius);
      let scaleFactor = 1 - distFromRing / 10;

      scaleFactor = Math.max(0, Math.min(1, scaleFactor));

      const finalScale =
        scaleFactor *
        (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) *
        particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === "capsule" && (
        <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
      )}
      {particleShape === "sphere" && <sphereGeometry args={[0.25, 16, 16]} />}
      {particleShape === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === "tetrahedron" && <tetrahedronGeometry args={[0.3]} />}
      {/* We use instanceColor now, so material color is white and acts as a multiplier */}
      <meshBasicMaterial color="white" transparent={true} opacity={0.7} />
    </instancedMesh>
  );
};

export default function Particles(props: AntigravityProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-100"
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 50], fov: 35 }}>
        <fog attach="fog" args={["#ffffff", 30, 80]} />
        <AntigravityInner {...props} />
      </Canvas>
    </div>
  );
}
