import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import WebGLFallback from "../WebGLFallback";
import { isMobileDevice, isWebGLAvailable, getMobileOptimizedDpr, assetUrl } from "../../utils/deviceDetection";

const Earth = ({ isMobile }) => {
  // Use absolute path based on Vite base URL for reliability
  const earth = useGLTF(assetUrl("/planet/scene.gltf"));
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    if (earth.scene && !modelReady) {
      earth.scene.traverse((child) => {
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
  }, [earth, modelReady]);

  if (!modelReady) {
    return null;
  }

  return (
    <primitive 
      object={earth.scene} 
      scale={isMobile ? 2.0 : 2.5} 
      position-y={0} 
      rotation-y={0} 
    />
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
    setIsMobile(isMobileDevice());
    setIsDesktop(!isMobileDevice());

    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On mobile, replace 3D earth with a gradient globe placeholder
  if (!isDesktop) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl shadow-purple-900/30" />
      </div>
    );
  }

  if (!webGLSupported) {
    return (
      <div className="w-full h-full min-h-[300px]">
        <WebGLFallback message="Earth model requires WebGL support" />
      </div>
    );
  }

  return (
    <Canvas
      shadows={false}
      frameloop='demand'
      dpr={getMobileOptimizedDpr()}
      gl={{ 
        preserveDrawingBuffer: false,
        antialias: false,
        powerPreference: 'high-performance'
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      performance={{ min: isMobile ? 0.5 : 0.75 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate={!isMobile}
          autoRotateSpeed={isMobile ? 0 : 0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={!isMobile}
        />
        <Earth isMobile={isMobile} />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
