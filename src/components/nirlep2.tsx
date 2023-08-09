"use client"
import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

const variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.2
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  }
}

function SocialLink(props: {
  icon: React.ReactNode,
  link: string,
}) {
  return (
    <motion.div
      variants={variants}
      initial={"hidden"}
      animate={"visible"}
      transition={{
        staggerChildren: 0.2
      }}
    >
      <Link href={props.link} target="_blank" className="p-5 rounded-full flex items-center justify-center hover-glassmorphism">
        {props.icon}
      </Link>
    </motion.div>
  )
}

export default function Main({ scroll }: { scroll: number }) {
  return (
    <div className="nirlep2-container overflow-x-hidden h-screen w-screen flex items-center justify-center flex-col">
      <motion.div
        className="text-2xl"
        variants={{
          "hidden": {
            opacity: 0,
            y: 80,
            scale: 0.2
          },
          "visible": {
            opacity: 1,
            y: 0,
            scale: 1,
            x: -scroll * 2000
          }
        }}
        initial={"hidden"}
        animate={"visible"}
      >hey i&apos;m</motion.div>
      <motion.div
        className="nirlep2 text-[100px] lg:text-[200px] md:text-[170px] font-bold font-roboto-slab select-none hoverable leading-none -mt-4"
        variants={{
          "hidden": {
            opacity: 0,
            y: 80,
            scale: 0.2
          },
          "visible": {
            opacity: 1,
            y: 0,
            scale: 1,
            x: scroll * 2000
          }
        }}
        initial={"hidden"}
        animate={"visible"}
      >
        <span>N</span>
        <span>I</span>
        <span>R</span>
        <span>L</span>
        <span>E</span>
        <span>P</span>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.2 },
          visible: {
            opacity: 1,
            scale: 1,
          }
        }}
        initial={"hidden"}
        animate={"visible"}
        className="links mt-4 flex gap-3"
      >
        <SocialLink icon={<Github className="w-8 h-8" />} link={"https://github.com/nirlep5252"} />
        <SocialLink icon={<svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
        </svg>
        } link={"https://discord.com/invite/9rYbc54KtY"} />
        <SocialLink icon={<Linkedin className="w-8 h-8" />} link="https://www.linkedin.com/in/nirlep5252/" />
        <SocialLink icon={<Twitter className="w-8 h-8" />} link="https://twitter.com/nirlep_5252_" />
      </motion.div>
    </div >
  )
}
