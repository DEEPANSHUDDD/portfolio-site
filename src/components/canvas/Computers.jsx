import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import WebGLFallback from "../WebGLFallback";
import { isMobileDevice, isWebGLAvailable, getMobileOptimizedDpr, assetUrl } from "../../utils/deviceDetection";

const Computers = ({ isMobile }) => {
  // Use absolute path based on Vite base URL for reliability
  const computer = useGLTF(assetUrl("/desktop_pc/scene.gltf"));
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
        shadow-mapSize={isMobile ? 512 : 1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -3.4, -2.2] : [0, -3.25, -1.5]}
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
      <div className="w-full h-[600px]">
        <WebGLFallback message="3D model requires WebGL support" />
      </div>
    );
  }

  // Render only on desktop to avoid blank/oversized 3D on small screens
  if (!isDesktop) {
    return (
      <div className="w-full h-[300px] md:h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <img
          src={assetUrl('/assets/mobile.png')}
          alt="3D preview"
          loading="lazy"
          decoding="async"
          className="w-auto h-full object-contain opacity-80"
        />
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
      performance={{ min: isMobile ? 0.5 : 0.75 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={!isMobile}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={!isMobile}
          dampingFactor={0.05}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
