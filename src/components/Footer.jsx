import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='w-full bg-black text-gray-400 py-6'>
      <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4'>
        <div className='text-sm'>
          Terms & Conditions
        </div>

        <div className='flex gap-6'>
          <a
            href='https://www.linkedin.com/in/deepanshu-kumar-6919a5319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
            target='_blank'
            rel='noopener noreferrer'
            className='text-2xl hover:text-[#a855f7] transition-colors'
          >
            <FaLinkedin />
          </a>
          <a
            href='https://github.com/DEEPANSHUDDD'
            target='_blank'
            rel='noopener noreferrer'
            className='text-2xl hover:text-[#a855f7] transition-colors'
          >
            <FaGithub />
          </a>
          <a
            href='https://www.instagram.com/deepanshu_5226/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-2xl hover:text-[#a855f7] transition-colors'
          >
            <FaInstagram />
          </a>
        </div>

        <div className='text-sm'>
          © 2025 Deepanshu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
