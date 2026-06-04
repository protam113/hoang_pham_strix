'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function InteractiveClean() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // ─── Three.js Scene Setup ──────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // WebGL Renderer with Alpha transparent channel and High performance preference
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;

    // Perspective Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // ─── Studio Lighting (Enhances metallic reflections) ──────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Dynamic key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(6, 6, 6);
    scene.add(keyLight);

    // Cool rim light (adds gorgeous glowing ice blue reflections)
    const rimLight = new THREE.PointLight(0x007fff, 3.5, 18);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    // Warm fill light for contrast
    const fillLight = new THREE.DirectionalLight(0xd1f0ff, 1.2);
    fillLight.position.set(-6, 4, 3);
    scene.add(fillLight);

    // ─── Load 3D GLTF/GLB Logo Model ──────────────────────────────────────────
    const loader = new GLTFLoader();
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    let logoModel: THREE.Object3D | null = null;
    let initialScale = 1;

    loader.load(
      '/3d/logo.glb',
      (gltf) => {
        logoModel = gltf.scene;

        // Auto-center and fit the model perfectly inside the view box
        const box = new THREE.Box3().setFromObject(logoModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Shift coordinates so model's physical center sits exactly at (0, 0, 0)
        logoModel.position.x += -center.x;
        logoModel.position.y += -center.y;
        logoModel.position.z += -center.z;

        // Scale factor: scale model to fit beautifully in the viewport
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.6 / maxDim;
        initialScale = scale;

        // Start at 0 scale for high-end entrance animation
        logoGroup.scale.set(0, 0, 0);
        logoGroup.add(logoModel);

        // Customize mesh materials to look incredibly glossy, metallic, and colorful
        logoModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              materials.forEach((m) => {
                if (m instanceof THREE.MeshStandardMaterial) {
                  // Apply premium Vietstrix signature tech blue
                  m.color.set('#0183c4');
                  m.roughness = 0.15;
                  m.metalness = 0.85;
                  // Add subtle deep blue self-illumination for dramatic contrast & volume
                  m.emissive.set('#001a47');
                  m.needsUpdate = true;
                }
              });
            }
          }
        });

        setLoading(false);

        // 🌟 Premium Entrance Animation using GSAP
        gsap.to(logoGroup.scale, {
          x: initialScale,
          y: initialScale,
          z: initialScale,
          duration: 1.6,
          ease: 'elastic.out(1, 0.65)',
        });

        gsap.fromTo(
          logoGroup.rotation,
          { y: -Math.PI * 2, x: 0.3 },
          {
            y: 0,
            x: 0,
            duration: 1.8,
            ease: 'power4.out',
          }
        );
      },
      undefined,
      (error) => {
        console.error('An error happened while loading 3D logo.glb:', error);
      }
    );

    // ─── Interactive Mouse Move Parallax ──────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // range [-0.5, 0.5]
      const y = (e.clientY - rect.top) / rect.height - 0.5; // range [-0.5, 0.5]
      mouse.targetX = x * 1.3;
      mouse.targetY = y * 1.3;
    };

    const handleMouseEnter = () => {
      if (!logoModel) return;
      // Elegant springy scale up on hover
      gsap.to(logoGroup.scale, {
        x: initialScale * 1.15,
        y: initialScale * 1.15,
        z: initialScale * 1.15,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      if (!logoModel) return;
      // Return smooth back to base scale
      gsap.to(logoGroup.scale, {
        x: initialScale,
        y: initialScale,
        z: initialScale,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // ─── Responsive Window Resizing ──────────────────────────────────────────
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ─── Visibility Observer (Pauses loop when scrolled offscreen) ───────────
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    // ─── Animation Frame Loop (Clock based) ──────────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;

    const tick = () => {
      animId = requestAnimationFrame(tick);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      if (logoGroup) {
        // Slow ambient self rotation on Y axis
        logoGroup.rotation.y += 0.0065;

        // Interpolated smooth mouse parallax follow
        mouse.x += (mouse.targetX - mouse.x) * 0.085;
        mouse.y += (mouse.targetY - mouse.y) * 0.085;

        // Fix continuous rotation build up by setting absolute angle based on mouse direction
        logoGroup.rotation.y = elapsedTime * 0.4 + mouse.x * 0.45;
        logoGroup.rotation.x = mouse.y * 0.4;

        // Gentle premium levitating floating wave
        logoGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.15;
      }

      renderer.render(scene, camera);
    };
    tick();

    // ─── Clean Up Resources ──────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-4/5 md:aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full outline-none" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
          <div className="w-12 h-12 border-4 border-main border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
