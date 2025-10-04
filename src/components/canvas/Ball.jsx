import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";
import WebGLFallback from "../WebGLFallback";
import { isMobileDevice, isWebGLAvailable, getMobileOptimizedDpr } from "../../utils/deviceDetection";

const Ball = ({ imgUrl, isMobile }) => {
  const [decal] = useTexture([imgUrl]);

  const ballContent = (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow={!isMobile} receiveShadow={!isMobile} scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </>
  );

  if (isMobile) {
    return ballContent;
  }

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      {ballContent}
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLAvailable());
    setIsMobile(isMobileDevice());

    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-full min-h-[200px]">
        <WebGLFallback message="Tech icons require WebGL" />
      </div>
    );
  }

  // On mobile, prefer a static icon image for stability
  if (isMobile) {
    return (
      <div className="w-full h-full min-h-[112px] flex items-center justify-center">
        <img src={icon} alt="tech" className="w-20 h-20 object-contain" loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <Canvas
      frameloop='demand'
      dpr={getMobileOptimizedDpr()}
      gl={{ 
        preserveDrawingBuffer: false,
        antialias: !isMobile,
        powerPreference: isMobile ? 'low-power' : 'default'
      }}
      style={{ touchAction: 'pan-y' }}
      performance={{ min: isMobile ? 0.5 : 0.75 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableDamping={!isMobile}
        />
        <Ball imgUrl={icon} isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
