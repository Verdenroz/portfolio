'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button, GithubIcon, LinkedinIcon } from "@/components/ui"

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" className="bg-background text-foreground p-24 mt-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-around gap-8 md:gap-12">
        <div
          className={`md:w-1/2 md:order-2 flex justify-center ${
            mounted
              ? 'motion-preset-fade motion-scale-in-95 motion-duration-300'
              : 'opacity-100'
          }`}
        >
          <Image
            src="/HT_headshot.webp"
            alt="Harvey Tseng"
            width={300}
            height={300}
            priority
            sizes="(max-width: 768px) 240px, 300px"
            className="rounded-full border-4 border-primary shadow-lg"
          />
        </div>
        <div
          className={`md:w-1/2 md:order-1 text-center md:text-left ${
            mounted
              ? 'motion-preset-fade motion-translate-y-in-[10px] motion-duration-300'
              : 'opacity-100'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Harvey Tseng</h1>
          <h2 className="text-2xl md:text-3xl mb-6">Full Stack Developer</h2>
            <p className="text-xl mb-8">With a passion for fintech 💸 and birds! 🐦</p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <Button asChild variant="outline">
              <a href="https://github.com/Verdenroz" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://linkedin.com/in/harvey-tseng" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

