import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Hero, Navbar, Footer } from "./components";
import LazyViewport from "./components/LazyViewport";

const Experience = React.lazy(() => import("./components/Experience"));
const Tech = React.lazy(() => import("./components/Tech"));
const Works = React.lazy(() => import("./components/Works"));
const Feedbacks = React.lazy(() => import("./components/Feedbacks"));
const StarsCanvas = React.lazy(() => import("./components/canvas/Stars"));
const Toaster = React.lazy(() => import('react-hot-toast').then(m => ({ default: m.Toaster })));

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className='relative z-0 bg-primary'>
        <div className='bg-none md:bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <LazyViewport minHeight={300}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </LazyViewport>
        <LazyViewport minHeight={200}>
          <Suspense fallback={null}>
            <Tech />
          </Suspense>
        </LazyViewport>
        <LazyViewport minHeight={200}>
          <Suspense fallback={null}>
            <Works />
          </Suspense>
        </LazyViewport>
        <LazyViewport minHeight={200}>
          <Suspense fallback={null}>
            <Feedbacks />
          </Suspense>
        </LazyViewport>
        <div className='relative z-0'>
          <Contact />
          <LazyViewport minHeight={200}>
            <Suspense fallback={null}>
              <div className='[&>canvas]:touch-pan-y'>
                <StarsCanvas />
              </div>
            </Suspense>
          </LazyViewport>
        </div>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <Toaster position="top-right" reverseOrder={false} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
