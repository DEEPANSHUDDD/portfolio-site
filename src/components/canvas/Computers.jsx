import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import WebGLFallback from "../WebGLFallback";
import { isMobileDevice, isWebGLAvailable, getMobileOptimizedDpr } from "../../utils/deviceDetection";
import { web } from "../../assets";

const Computers = ({ isMobile }) => {
  const computer = useGLTF(`${import.meta.env.BASE_URL}desktop_pc/scene.gltf`);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    if (computer.scene && !modelReady) {
      computer.scene.traverse((child) => {
        if (child.geometry && child.geometry.attributes.position) {
          const positions = child.geometry.attributes.position.array;
          let hasNaN = false;
          for (let i = 0; i < positions.length; i++) {
            if (isNaN(positions[i])) {
              positions[i] = 0;
              hasNaN = true;
            }
          }
          if (hasNaN) {
            child.geometry.attributes.position.needsUpdate = true;
            child.geometry.computeBoundingSphere();
          }
        }
      });
      setModelReady(true);
    }
  }, [computer, modelReady]);

  if (!modelReady) {
    return null;
  }

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? 256 : 1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -3.2, -2.4] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
    
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    setIsDesktop(!mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-[320px] sm:h-[420px] md:h-[520px]">
        <WebGLFallback message="3D model requires WebGL support" />
      </div>
    );
  }

  // On mobile, render a static image instead of a 3D canvas for stability
  if (isMobile) {
    return (
      <div className="w-full h-[280px] sm:h-[360px] md:h-[420px] flex items-center justify-center">
        <img src={web} alt="Computer" className="max-h-full object-contain" loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <Canvas
      frameloop='demand'
      shadows={false}
      dpr={getMobileOptimizedDpr()}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: false,
        antialias: !isMobile,
        powerPreference: isMobile ? 'low-power' : 'high-performance'
      }}
      style={{ touchAction: 'pan-y' }}
      performance={{ min: isMobile ? 0.5 : 0.75 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enabled
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.05}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
