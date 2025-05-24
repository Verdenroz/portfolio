"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showTitle, setShowTitle] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section element
      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + 100 

        setShowTitle(scrollPosition > heroBottom)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Check initial position
    handleScroll()

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const NavItem = ({
    to,
    children,
  }: {
    to: string
    children: React.ReactNode
  }) => (
    <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
      <ScrollLink to={to} smooth={true} duration={500} className="cursor-pointer">
        {children}
      </ScrollLink>
    </Button>
  )

  return (
    <header className="bg-background/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AnimatePresence mode="wait">
              {showTitle && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ScrollLink
                    to="hero"
                    smooth={true}
                    duration={500}
                    className="text-xl font-bold text-foreground cursor-pointer"
                  >
                    Harvey Tseng
                  </ScrollLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isMobile ? (
            <div className="flex items-center">
              <ThemeToggle />
              <Button variant="ghost" onClick={toggleMenu} className="ml-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavItem to="projects">Projects</NavItem>
              <NavItem to="contributions">Contributions</NavItem>
              <NavItem to="experience">Experience</NavItem>
              <NavItem to="activities">Activities</NavItem>
              <ThemeToggle />
            </div>
          )}
        </div>

        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 flex flex-col space-y-2 overflow-hidden"
            >
              <NavItem to="projects">Projects</NavItem>
              <NavItem to="contributions">Contributions</NavItem>
              <NavItem to="experience">Experience</NavItem>
              <NavItem to="activities">Activities</NavItem>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
