import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

// Variants for word-by-word animation
const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.8,
      staggerChildren: 0.05,
    },
  },
};

const word = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Left line + dot */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* Main content */}
        <div>
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-white text-center"
          >
            Hi, I'm{" "}
            <span className="animate-gradient font-extrabold">
              <Typewriter
                words={["Deepanshu", "a Developer", "a Designer"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </motion.h1>

          {/* Cinematic Paragraph */}
          <motion.p
            className="mt-6 text-xl md:text-2xl text-gray-300 text-center max-w-3xl tracking-wide leading-relaxed flex flex-wrap justify-center"
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {"I'm a student passionate about learning web development and creating interactive projects with modern tools and design."
              .split(" ")
              .map((wordText, index) => (
                <motion.span key={index} variants={word} className="mr-2">
                  {wordText}
                </motion.span>
              ))}
          </motion.p>
        </div>
      </div>

      {/* 3D Canvas */}
      <ComputersCanvas />

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
