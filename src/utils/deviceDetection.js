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
    return Math.min(window.devicePixelRatio, 1.5);
  }
  return [1, 2];
};
