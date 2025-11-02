import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  student,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Frontend Learning",
    company_name: "Self Learning",
    icon: html, // update with your logo
    iconBg: "#F06529",
    date: "April 2024 - September 2024",
    points: [
      "Learned HTML, CSS, and JavaScript fundamentals.",
      "Built small static websites and practiced responsive design.",
      "Gained strong foundation in frontend web development.",
    ],
  },
  {
    title: "React.js Projects",
    company_name: "Personal Portfolio",
    icon: reactjs, // update with your logo
    iconBg: "#61DAFB",
    date: "October 2024 - March 2025",
    points: [
      "Created portfolio website with React and Tailwind CSS.",
      "Added animations using Framer Motion.",
      "Learned component-driven development and state management.",
    ],
  },
  {
    title: "3D Web Development",
    company_name: "Self Projects",
    icon: threejs, // update with your logo
    iconBg: "#915EFF",
    date: "April 2025 - September 2025",
    points: [
      "Developed 3D portfolio sections with Three.js.",
      "Experimented with Vite and advanced animations.",
      "Started exploring backend and full-stack concepts.",
    ],
  },
  {
    title: "Student Developer",
    company_name: "Current",
    icon: student, // custom logo you add
    iconBg: "#1E1E2E",
    date: "October 2025 - Present",
    points: [
      "Building full-stack applications with React and Node.js.",
      "Preparing for internships and placements.",
      "Working on larger personal projects and refining skills.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "He consistently showed strong skills in web design and front-end development. His attention to detail and ability to learn fast made him stand out in every group project.",
    name: "Prof. Meera Sharma",
    designation: "Mentor & Lecturer",
    company: "Department of Computer Science, Gautam Buddha University",
  },
  {
    testimonial:
      "I had the chance to work with him on several college assignments — he’s reliable, creative, and always helps the team stay organized. His React and design knowledge really helped us complete our project on time.",
    name: "Arjun Singh",
    designation: "Teammate",
    company: "BCA Program, IIIMT College",
  },
  {
    testimonial:
      "He took the lead in designing and developing our project portfolio website. The clean design and animations impressed both students and faculty.",
    name: "Priya Verma",
    designation: "Project Partner",
    company: "IIIMT College",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
