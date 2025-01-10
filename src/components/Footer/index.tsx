'use client'

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import React from "react";
import styles from "./Footer.module.css";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div 
      className="absolute -z-10 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <footer className="flex flex-col items-center justify-center w-full bg-riviera-green text-[#111111] bg-footer font-editorial">
        <motion.div 
          className="grid-cols-1 sm:flex sm:flex-row sm:place-items-start justify-between w-full space-y-4"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <img
            src="/images/rivieraPurple.svg"
            className="hidden absolute aspect-square ml-0 h-max max-h-[20rem] w-full sm:w-auto z-0 md:ml-8 md:inline"
            alt="Riviera Logo"
          />
          <div 
            className="min-h-full max-w-[100%] sm:max-w-[30%] flex flex-col items-center justify-center"

          >
            <div className="h-[12vh] w-full bg-no-repeat bg-cover bg-center flex flex-row items-center justify-center md:min-h-[20rem]">
              <a 
                href="https://riviera.vit.ac.in"
                target="_blank"
                rel="noreferrer"
                className="w-[40%] z-10 my-[2.5rem] h-auto self-center md:w-[80%]"
               
              >
                <img
                  src="/images/footer-logo-25.svg"
                  className="w-auto h-auto"
                  alt="VIT Logo"
                />
              </a>
            </div>
          </div>
          <motion.div 
            className="flex flex-row sm:w-[35%] justify-around"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className={`font-editorial font-[400] z-10 flex flex-col sm:pt-8 mb-4 md:mb-0`}>
              <motion.h1 
                className="font-oddval font-semibold text-2xl mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Socials
              </motion.h1>
              {["Instagram", "Youtube", "LinkedIn", "Facebook"].map((social, index) => (
                <motion.a
                  key={social}
                  href={`https://www.${social.toLowerCase()}.com/rivieravituniversity/`}
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.link} mb-4 w-fit pointer-cursor-element ${index === 3 ? 'sm:mb-0' : ''}`}
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>

            
            <div className={`font-editorial font-[400] z-10 flex flex-col sm:pt-8 mb-4 md:mb-0`}>
              <motion.h1 
                className="font-oddval font-semibold text-2xl mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Links
              </motion.h1>
              {[
                { href: "/", text: "Home" },
                { href: "/events", text: "Events" },
                { href: "/faq", text: "Accommodation" },
                { href: "/faq", text: "FAQs" }
              ].map((link, index) => (
               
                <motion.a
                  key={link.text}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.link} mb-4 w-fit pointer-cursor-element ${index === 3 ? 'sm:mb-0' : ''}`}
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {link.text}
                </motion.a>
              ))}
            </div>
          </motion.div>



          <motion.div
            className={`font-oddval font-[400] z-10 flex flex-col sm:justify-around sm:mr-[5%] sm:pt-8`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="text-center sm:text-left mb-[2.5rem]">
              <motion.h1 
                className="font-semibold text-2xl mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Contact Us
              </motion.h1>
              <motion.p 
                className="mb-3 text-sm md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Dr K Gokul Kumar
              </motion.p>
              <motion.p 
                className="mb-3 text-sm md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Convenor, Riviera<span className="font-mono">&apos;24</span>
              </motion.p>
              <motion.a
                href="mailto:convenor.riviera@vit.ac.in"
                className={`${styles.link} pointer-cursor-element mb-4 text-sm md:text-xl`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                convenor.riviera<span className="font-mono">@</span>vit.ac.in
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </footer>
    </motion.div>
  );
};

export default Footer;

