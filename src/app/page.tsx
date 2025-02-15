'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const skills = [
  { name: 'Digital Marketing', level: 95 },
  { name: 'Strategic Planning', level: 90 },
  { name: 'Team Leadership', level: 88 },
  { name: 'Content Marketing', level: 92 },
  { name: 'SEO', level: 90 },
  { name: 'Digital Strategy', level: 95 },
  { name: 'Growth Hacking', level: 85 },
  { name: 'Project Management', level: 88 },
  { name: 'CRM', level: 85 },
  { name: 'Marketing Operations', level: 92 }
];

const experiences = [
  {
    period: "2023 - 2024",
    role: "Director of Marketing Operations",
    company: "QuickSoft Technology",
    description: "Led digital transformation initiatives, aligned marketing strategies with business objectives, and optimized marketing technologies for startups and small businesses."
  },
  {
    period: "2021 - 2023",
    role: "Manager Strategic Partnerships",
    company: "Naya Pravesh Foundation",
    description: "Spearheaded strategic partnerships, implemented growth hacking strategies, and managed cross-functional projects for business expansion."
  },
  {
    period: "2019 - 2021",
    role: "Senior Marketing Manager",
    company: "True Value Infosoft",
    description: "Developed and executed comprehensive marketing strategies, led team of marketing professionals, and implemented lead generation initiatives."
  },
  {
    period: "2018 - 2019",
    role: "Project Manager",
    company: "Adiyogi Energy Pvt Ltd",
    description: "Managed digital strategy implementation, B2C marketing campaigns, and business development initiatives."
  },
  {
    period: "2015 - 2018",
    role: "Marketing Operations Manager",
    company: "Yashvardhan Arts & Interior",
    description: "Led marketing operations, product marketing initiatives, and cross-functional team management."
  },
  {
    period: "2013 - 2015",
    role: "Marketing Manager",
    company: "Cucine Lube India",
    description: "Managed HNI sales, customer relationship management, and strategic marketing initiatives."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content text-center">
          <motion.div 
            className="max-w-2xl"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-5xl font-bold mb-8">Marketing Technologist & Digital Strategist</h1>
            <p className="text-xl mb-8">
              Embracing the new era of AI and technology to build solutions that solve real-world problems
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary">Get in Touch</Link>
              <Link href="/blog" className="btn btn-outline">Read My Blog</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Vision & Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title justify-center mb-4">Vision</h3>
                  <p>To leverage emerging technologies and AI to create innovative solutions that drive meaningful impact in the digital landscape.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title justify-center mb-4">Mission</h3>
                  <p>Building solutions that value society's foundation and address real-world challenges through the strategic integration of marketing and technology.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section with enhanced styling */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">My Journey in Tech</h2>
            <div className="card bg-base-100">
              <div className="card-body">
                <p className="text-lg mb-6">
                  My love for technology began in 2007 when my father bought me my first PC. 
                  Little did he know, he was opening a whole new world that would shape my future career path.
                </p>
                <p className="text-lg">
                  Today, I'm passionate about leveraging AI and emerging technologies to create 
                  solutions that add value to society and solve real-world challenges.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Journey</h2>
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="mb-8 relative pl-8 border-l-2 border-primary"
                initial="initial"
                whileInView="animate"
                variants={fadeIn}
                viewport={{ once: true }}
              >
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-2" />
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-sm opacity-70">{exp.period}</p>
                <p className="font-medium">{exp.company}</p>
                <p className="mt-2">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* Skills Section with icons */}
        <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div 
            key={index}
            className="card bg-base-200 hover:shadow-lg transition-shadow"
            initial="initial"
            whileInView="animate"
            variants={fadeIn}
            viewport={{ once: true }}
            >
            <div className="card-body">
              <h3 className="card-title">
              <span className="text-primary text-xl">⚡</span>
              {skill.name}
              </h3>
              <div className="w-full bg-base-300 rounded-full h-2.5 mt-2">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-1000" 
                style={{ width: `${skill.level}%` }}
              />
              </div>
            </div>
            </motion.div>
          ))}
          </div>
        </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          variants={fadeIn}
          viewport={{ once: true }}
          >
          <h2 className="text-3xl font-bold mb-6">Let's Create Something Amazing Together</h2>
          <p className="text-lg mb-8">
            Looking to leverage technology for your next big idea? Let's connect and explore how we can make it happen.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary btn-lg">Start a Conversation</Link>
            <Link href="/blog" className="btn btn-outline btn-lg">Explore My Insights</Link>
          </div>
          </motion.div>
        </div>
        </section>
      </div>
      );
    }
