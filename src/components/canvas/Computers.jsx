import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import WebGLFallback from "../WebGLFallback";
import { isMobileDevice, isWebGLAvailable, getMobileOptimizedDpr } from "../../utils/deviceDetection";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
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
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
    
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

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

  return (
    <Canvas
      frameloop='demand'
      shadows={!isMobile}
      dpr={getMobileOptimizedDpr()}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: !isMobile,
        powerPreference: isMobile ? 'low-power' : 'high-performance'
      }}
      performance={{ min: isMobile ? 0.5 : 0.75 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
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
