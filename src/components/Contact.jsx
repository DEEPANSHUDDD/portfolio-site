import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
let toastRef; // avoid importing react-hot-toast in initial chunk

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import LazyViewport from "./LazyViewport";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Lazily import toast to keep initial bundle smaller
    if (!toastRef) {
      import('react-hot-toast').then(m => { toastRef = m.default; }).catch(() => {});
    }

    emailjs
      .send(
        'service_ifmlkig',
        'template_f5iywcb',
        {
          from_name: form.name,
          to_name: "Deepanshu",
          from_email: form.email,
          to_email: "deepanshu981854@gmail.com",
          message: form.message,
        },
        '_m6Sd3fOE45jbI_aV'
      )
      .then(
        () => {
          setLoading(false);
          toastRef?.success('✅ Thank you! Your message has been sent.', {
            style: {
              background: '#1a1a2e',
              color: '#fff',
              border: '1px solid #8b5cf6',
              padding: '12px 16px',
            },
            iconTheme: { primary: '#8b5cf6', secondary: '#fff' },
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          toastRef?.error('❌ Something went wrong. Please try again.', {
            style: {
              background: '#1a1a2e',
              color: '#fff',
              border: '1px solid #ef4444',
              padding: '12px 16px',
            },
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          });
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <LazyViewport minHeight={300} rootMargin="200px 0px" threshold={0.2}>
          <div className='w-full h-full [&>canvas]:touch-pan-y'>
            <EarthCanvas />
          </div>
        </LazyViewport>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
