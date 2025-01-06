/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import React from "react";
import styles from "./Footer.module.css";
import { div } from "motion/react-client";


const Footer = () => {
  return (
    <div className="absolute -z-10 w-full">
        <footer className="flex flex-col items-center justify-center w-full bg-riviera-green text-[#111111] bg-footer font-editorial">
      <div className="grid-cols-1 sm:flex sm:flex-row sm:place-items-start justify-between w-full space-y-4">
        <img
          src="/Riviera green logo.svg"
          className="hidden absolute aspect-square ml-0 h-max max-h-[20rem] w-full sm:w-auto z-0 md:ml-8 md:inline"
        ></img>
        <div className="min-h-full max-w-[100%] sm:max-w-[30%] flex flex-col items-center justify-center">
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
        <div className="flex flex-row sm:w-[35%] justify-around">
          <div
            className={` font-oddval font-[400] z-10 flex flex-col sm:pt-8 mb-4 md:mb-0 `}
          >
            <h1 className="font-oddval font-semibold text-2xl mb-6">Socials</h1>
            <a
              href="https://www.instagram.com/rivieravituniversity/"
              target="_blank"
              rel="noreferrer"
              className={`${styles.link} mb-4 w-fit pointer-cursor-element`}
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@riviera-vituniversity5936"
              target="_blank"
              rel="noreferrer"
              className={`${styles.link} mb-4 w-fit pointer-cursor-element`}
            >
              Youtube
            </a>
            <a
              href="https://www.linkedin.com/school/riviera-vit-university/"
              target="_blank"
              rel="noreferrer"
              className={`${styles.link} mb-4 w-fit pointer-cursor-element`}
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/rivieraVITUniversity"
              target="_blank"
              rel="noreferrer"
              className={`${styles.link} mb-4 w-fit pointer-cursor-element sm:mb-0`}
            >
              Facebook
            </a>
          </div>
          <div
            className={`font-oddval font-[400] z-10 flex flex-col sm:pt-8 pb-[3rem] h-min`}
          >
            <h1 className="font-semibold mb-6 text-2xl">Links</h1>
            {/* <a href="/" className="mb-4">Home</a>
          <a href="/about" className="mb-4">About</a>
          <a href="/events" className="mb-4">Events</a>
          <a href="/hero" className="mb-4">ProShows</a>
          <a href="/merchandise" className="mb-4">Merchandise</a> */}
            <Link
              data-hover="home"
              href="/"
              className={`${styles.link} mb-4 w-fit pointer-cursor-element`}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`${styles.link} mb-4 w-fit pointer-cursor-element`}
            >
              Events
            </Link>
            <Link
              href="/faq"
              className={`${styles.link} mb-4 w-fit pointer-cursor-element`}
            >
              Accommodation
            </Link>
            <Link
              href="/faq"
              className={`${styles.link} mb-4 w-fit pointer-cursor-element`}
            >
              FAQs
            </Link>
          </div>
        </div>
        <div
          className={`font-oddval font-[400] z-10 flex flex-col sm:justify-around sm:mr-[5%] sm:pt-8`}
        >
          <div className="text-center sm:text-left mb-[2.5rem]">
            <h1 className="font-semibold text-2xl mb-6">Contact Us</h1>
            <p className="mb-3 text-sm md:text-xl">Dr K Gokul Kumar</p>
            <p className="mb-3 text-sm md:text-xl">
              Convenor, Riviera<span className="font-mono">&apos;24</span>
            </p>
            <a
              href="mailto:convenor.riviera@vit.ac.in"
              className={`${styles.link} pointer-cursor-element mb-4 text-sm md:text-xl`}
            >
              convenor.riviera<span className="font-mono">@</span>vit.ac.in
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
