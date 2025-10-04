export const isMobileDevice = () => {
  return window.innerWidth < 768;
};

export const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

export const getMobileOptimizedDpr = () => {
  if (isMobileDevice()) {
    // Cap DPR on mobile devices to reduce GPU and memory load
    return Math.min(window.devicePixelRatio || 1, 1.5);
  }
  // Prefer crisp rendering on desktop while allowing the browser to pick between 1x and 2x
  return [1, 1.5];
};
