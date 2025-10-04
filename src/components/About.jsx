import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import myPhoto from "../assets/me.jpg";
import CV from "../assets/Deepanshu_CV.pdf";

const StatCard = ({ icon, number, label }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.5, 0.75)}
    className='bg-tertiary p-6 rounded-xl border border-[#915EFF]/20 hover:border-[#915EFF]/50 transition-colors'
  >
    <div className='flex flex-col items-center text-center'>
      <div className='text-4xl mb-2'>{icon}</div>
      <h3 className='text-white text-2xl font-bold'>{number}</h3>
      <p className='text-secondary text-sm mt-1'>{label}</p>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()} className='text-center mb-12'>
        <p className='text-secondary text-sm uppercase tracking-wider'>✨ Transforming ideas into digital experiences ✨</p>
        <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mt-2'>
          About <span className='text-[#915EFF]'>Me</span>
        </h2>
      </motion.div>

      <div className='mt-12 grid md:grid-cols-2 grid-cols-1 gap-12 items-center'>
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1)}
          className='flex flex-col gap-6'
        >
          <h3 className='text-white text-3xl font-bold'>
            Hello, I'm <span className='text-[#915EFF]'>Deepanshu</span>
          </h3>
          <p className='text-secondary text-[17px] leading-[30px]'>
            I'm a student passionate about learning web development and building modern, interactive projects with React, Three.js, and other cutting-edge technologies. I enjoy solving problems, exploring creative designs, and growing my skills through real-world projects.
          </p>
          <div className='flex flex-wrap gap-4 mt-4'>
            <a 
              href={CV} 
              download="Deepanshu_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className='bg-[#915EFF] hover:bg-[#7c3aed] text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2'
            >
              <span>📄</span> Download CV
            </a>
            <button
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className='border-2 border-[#915EFF] text-[#915EFF] hover:bg-[#915EFF] hover:text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2'
            >
              <span>👁️</span> View Projects
            </button>

          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className='flex justify-center'
        >
          <img 
            src={myPhoto} 
            alt='Deepanshu' 
            loading='lazy'
            decoding='async'
            className='w-60 h-60 rounded-full object-cover shadow-xl border-4 border-purple-500 object-[50%_20%]'
          />
        </motion.div>
      </div>

      <div className='mt-16 grid md:grid-cols-3 grid-cols-1 gap-6'>
        <StatCard icon="💼" number="3" label="Projects Completed" />
        <StatCard icon="🏆" number="2" label="Certificates Earned" />
        <StatCard icon="📚" number="1+" label="Years Learning" />
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
