'use client';

import { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import('three');

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // ── Main particle field ──────────────────────────────────────
      const COUNT = 700;
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);

      const accent = new THREE.Color('#E8650A');
      const white = new THREE.Color('#ffffff');

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        const c = Math.random() > 0.72 ? accent : white;
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.028,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // ── Secondary ring of larger glowing dots ────────────────────
      const RING = 80;
      const ringPos = new Float32Array(RING * 3);
      const ringCol = new Float32Array(RING * 3);
      for (let i = 0; i < RING; i++) {
        const theta = (i / RING) * Math.PI * 2;
        const r = 6 + Math.random() * 2;
        ringPos[i * 3]     = Math.cos(theta) * r;
        ringPos[i * 3 + 1] = Math.sin(theta) * r;
        ringPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
        ringCol[i * 3]     = accent.r;
        ringCol[i * 3 + 1] = accent.g;
        ringCol[i * 3 + 2] = accent.b;
      }
      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
      ringGeo.setAttribute('color', new THREE.BufferAttribute(ringCol, 3));
      const ringMat = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      });
      const ring = new THREE.Points(ringGeo, ringMat);
      scene.add(ring);

      // ── Mouse parallax ───────────────────────────────────────────
      let targetX = 0;
      let targetY = 0;
      const onMouse = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 1.2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 1.2;
      };
      window.addEventListener('mousemove', onMouse);

      // ── Resize ───────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // ── Render loop ──────────────────────────────────────────────
      let frame = 0;
      const animate = () => {
        rafRef.current = requestAnimationFrame(animate);
        frame += 0.0005;

        particles.rotation.y = frame * 0.6;
        particles.rotation.x = frame * 0.15;

        ring.rotation.z = -frame * 0.8;

        // Smooth camera drift toward mouse
        camera.position.x += (targetX - camera.position.x) * 0.025;
        camera.position.y += (-targetY - camera.position.y) * 0.025;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        geo.dispose();
        mat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        renderer.dispose();
      };
    })();

    return () => cleanup?.();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.65 }}
    />
  );
}
