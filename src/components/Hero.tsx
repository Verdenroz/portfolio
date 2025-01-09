'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

export default function Hero() {
  return (
    <section id="hero" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Harvey Tseng</h1>
          <h2 className="text-2xl md:text-3xl mb-6">Full Stack Developer</h2>
            <p className="text-xl mb-8">With a passion for fintech 💸, the stock market 📈, and birds! 🐦</p>
          <div className="flex space-x-4">
            <Button asChild variant="outline">
              <a href="https://github.com/Verdenroz" target="_blank" rel="noopener noreferrer">
                <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://linkedin.com/in/harvey-tseng" target="_blank" rel="noopener noreferrer">
                <LinkedInLogoIcon className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="HT_headshot.jpg"
            alt="Harvey Tseng"
            width={300}
            height={300}
            className="rounded-full border-4 border-primary shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}

