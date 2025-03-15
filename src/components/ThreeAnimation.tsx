
import { useEffect, useRef } from "react";

// We'll use the global THREE object loaded via CDN
declare global {
  interface Window {
    THREE: any;
  }
}

const ThreeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const particlesRef = useRef<any>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !window.THREE) {
      console.error("Three.js is not loaded or container not found");
      return;
    }

    // Extract THREE objects from the global scope
    const { Scene, PerspectiveCamera, WebGLRenderer, BufferGeometry, 
            PointsMaterial, Float32BufferAttribute, Points, 
            Color, AdditiveBlending } = window.THREE;

    // Scene setup
    const scene = new Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const createParticles = () => {
      const geometry = new BufferGeometry();
      const particleCount = 1000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const distances = [];

      const color = new Color("#3b82f6"); // Blue color

      for (let i = 0; i < particleCount * 3; i += 3) {
        // Position
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;

        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;

        // Calculate distance from center for animation
        const distance = Math.sqrt(x * x + y * y + z * z);
        distances.push(distance);

        // Color - slightly vary the color
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        // Size - particles further from center are smaller
        sizes[i / 3] = 0.5 + Math.random() * 1.5;
      }

      geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
      geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
      geometry.setAttribute("size", new Float32BufferAttribute(sizes, 1));

      const material = new PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: AdditiveBlending,
      });

      const particles = new Points(geometry, material);
      scene.add(particles);
      particlesRef.current = { particles, distances };

      return particles;
    };

    createParticles();

    // Animation loop
    const animate = () => {
      if (particlesRef.current) {
        const { particles, distances } = particlesRef.current;

        // Rotate particles
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;

        // Pulsate particles
        const positions = particles.geometry.attributes.position.array;
        const time = Date.now() * 0.0005;

        for (let i = 0; i < positions.length; i += 3) {
          const idx = i / 3;
          const distanceFactor = distances[idx] * 0.01;
          
          const x = positions[i];
          const y = positions[i + 1];
          const z = positions[i + 2];
          
          // Calculate normalized direction vector
          const length = Math.sqrt(x * x + y * y + z * z);
          
          if (length > 0) {
            const nx = x / length;
            const ny = y / length;
            const nz = z / length;
            
            // Pulsate effect - move particles slightly in and out
            const pulseFactor = Math.sin(time + distanceFactor) * 5;
            
            positions[i] = nx * (distances[idx] + pulseFactor);
            positions[i + 1] = ny * (distances[idx] + pulseFactor);
            positions[i + 2] = nz * (distances[idx] + pulseFactor);
          }
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
      }

      // Render the scene
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          console.error("Error removing renderer:", e);
        }
      }
      
      if (particlesRef.current) {
        const { particles } = particlesRef.current;
        particles.geometry.dispose();
        particles.material.dispose();
        sceneRef.current.remove(particles);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden" />;
};

export default ThreeAnimation;
