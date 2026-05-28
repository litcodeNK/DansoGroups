'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.offsetWidth || window.innerWidth;
    const H = mount.offsetHeight || 600;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 6;

    /* ── Particles ── */
    const N = 80;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pointMat = new THREE.PointsMaterial({
      color: 0x2d5be3,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointGeo, pointMat);

    /* ── Connection lines between nearby particles ── */
    const lineVerts: number[] = [];
    const MAX_DIST = 3.8;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < MAX_DIST * MAX_DIST) {
          lineVerts.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2d5be3,
      transparent: true,
      opacity: 0.12,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);

    const group = new THREE.Group();
    group.add(points);
    group.add(lines);
    scene.add(group);

    /* ── Animation loop ── */
    let rafId: number;
    function animate() {
      rafId = requestAnimationFrame(animate);
      group.rotation.y += 0.00065;
      group.rotation.x += 0.00025;
      renderer.render(scene, camera);
    }
    animate();

    /* ── Resize ── */
    function onResize() {
      if (!mount) return;
      const w = mount.offsetWidth;
      const h = mount.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      pointGeo.dispose();
      pointMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
