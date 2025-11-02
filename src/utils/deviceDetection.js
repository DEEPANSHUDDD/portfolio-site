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
    // Force DPR to 1 on mobile to prevent oversized canvases and heavy GPU load
    return 1;
  }
  // On desktop, allow between 1 and 1.5 for quality without overloading
  return [1, 1.5];
};

/**
 * Builds an absolute URL for assets served from Vite's base path.
 * Ensures correct paths on GitHub Pages and similar deployments.
 */
export const assetUrl = (relativePath) => {
  const trimmed = String(relativePath || '').replace(/^\/?/, '');
  return `${import.meta.env.BASE_URL}${trimmed}`;
};
