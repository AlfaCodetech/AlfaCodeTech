
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeAnimationProps {
  className?: string;
}

const ThreeAnimation = ({ className }: ThreeAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x0071e3,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create several floating objects in the background
    const createFloatingObject = (position: THREE.Vector3, color: number, scale: number) => {
      const geometry = new THREE.IcosahedronGeometry(1, 0);
      const material = new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity: 0.7,
        flatShading: true
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);
      
      return mesh;
    };

    const objects = [
      createFloatingObject(new THREE.Vector3(-3, 2, -5), 0x0071e3, 0.5),
      createFloatingObject(new THREE.Vector3(3, -2, -7), 0x00c2ff, 0.7),
      createFloatingObject(new THREE.Vector3(-2, -3, -6), 0x5edfff, 0.4),
      createFloatingObject(new THREE.Vector3(4, 1, -8), 0x0071e3, 0.6),
      createFloatingObject(new THREE.Vector3(0, 3, -9), 0x00a8ff, 0.8),
    ];

    // Handle mouse movement for parallax effect
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles slowly
      particlesMesh.rotation.x = elapsedTime * 0.05;
      particlesMesh.rotation.y = elapsedTime * 0.03;
      
      // Move floating objects
      objects.forEach((obj, i) => {
        const speed = 0.2 + i * 0.05;
        obj.rotation.x = elapsedTime * speed * 0.3;
        obj.rotation.y = elapsedTime * speed * 0.2;
        obj.position.y += Math.sin(elapsedTime * speed) * 0.002;
        obj.position.x += Math.cos(elapsedTime * speed) * 0.002;
      });
      
      // Apply subtle camera movement based on mouse position
      camera.position.x += (mousePosition.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mousePosition.current.y * 0.5 - camera.position.y) * 0.05;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      
      objects.forEach(obj => {
        scene.remove(obj);
        obj.geometry.dispose();
        (obj.material as THREE.Material).dispose();
      });
    };
  }, []);

  return <div ref={containerRef} className={`three-container ${className}`} />;
};

export default ThreeAnimation;
