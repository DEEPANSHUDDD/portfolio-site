import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { isMobileDevice, isWebGLAvailable, getMobileOptimizedDpr } from "../../utils/deviceDetection";

const Stars = ({ isMobile }) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    const count = isMobile ? 2000 : 5000;
    const positions = random.inSphere(new Float32Array(count), { radius: 1.2 });
    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        positions[i] = 0;
      }
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (!isMobile && ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color='#f272c8'
          size={isMobile ? 0.0015 : 0.0018}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
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

  if (!isDesktop) {
    return (
      <div className='w-full h-auto absolute inset-0 z-[-1] bg-gradient-to-b from-gray-900 to-black' />
    );
  }

  if (!webGLSupported) {
    return (
      <div className='w-full h-auto absolute inset-0 z-[-1] bg-gradient-to-b from-gray-900 to-black' />
    );
  }

  return (
    <div className='w-full h-auto absolute inset-0 z-[-1] touch-pan-y'>
      <Canvas 
        frameloop='demand'
        camera={{ position: [0, 0, 1] }}
        dpr={getMobileOptimizedDpr()}
        gl={{
          antialias: !isMobile,
          powerPreference: isMobile ? 'low-power' : 'default'
        }}
        performance={{ min: isMobile ? 0.3 : 0.5 }}
        className='touch-pan-y'
      >
        <Suspense fallback={null}>
          <Stars isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
