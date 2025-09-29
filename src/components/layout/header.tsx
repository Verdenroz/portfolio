"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Link as ScrollLink } from "react-scroll"
import Link from "next/link"
import { Button } from "@/components/ui"
import { ThemeToggle } from "@/components/shared"
import { Menu, X, ChevronLeft } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  
  // Check if we're on a project page
  const isProjectPage = pathname?.startsWith('/projects/')
  
  // Check if we're on activities page
  const isActivitiesPage = pathname === '/activities'

  // Navigation handler for project pages
  const handleProjectPageNavigation = (sectionId: string) => {
    router.push(`/#${sectionId}`)
    
    // Function to attempt scrolling with retries for async content
    const attemptScroll = (retryCount = 0) => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (retryCount < 5) {
        // Retry after a short delay if element not found (async loading)
        setTimeout(() => attemptScroll(retryCount + 1), 200)
      }
    }
    
    // Initial scroll attempt after a small delay
    setTimeout(() => attemptScroll(), 100)
    
    setIsMenuOpen(false)
  }

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
  }) => {
    if (isProjectPage || isActivitiesPage) {
      // On project or activities pages, use navigation handler to return to home
      return (
        <Button 
          variant="ghost" 
          onClick={() => handleProjectPageNavigation(to)}
          className="cursor-pointer"
        >
          {children}
        </Button>
      )
    }
    
    // On home page, use ScrollLink for smooth scrolling
    return (
      <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
        <ScrollLink to={to} smooth={true} duration={500} className="cursor-pointer">
          {children}
        </ScrollLink>
      </Button>
    )
  }

  return (
    <header className="bg-background/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 px-8 z-50">
      <nav className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AnimatePresence mode="wait">
              {isProjectPage ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Button
                    variant="ghost"
                    asChild
                    className="flex items-center gap-2 hover:bg-primary/10 transition-colors group"
                  >
                    <Link href="/#projects">
                      <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                      <span className="hidden sm:inline">Back to Projects</span>
                      <span className="sm:hidden">Back</span>
                    </Link>
                  </Button>
                </motion.div>
              ) : isActivitiesPage ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Button
                    variant="ghost"
                    asChild
                    className="flex items-center gap-2 hover:bg-primary/10 transition-colors group"
                  >
                    <Link href="/#activities">
                      <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                      <span className="hidden sm:inline">Back to Activities</span>
                      <span className="sm:hidden">Back</span>
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                showTitle && (
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
                )
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
              {!isProjectPage && <NavItem to="projects">Projects</NavItem>}
              <NavItem to="contributions">Contributions</NavItem>
              <NavItem to="experience">Experience</NavItem>
              {!isActivitiesPage && <NavItem to="activities">Activities</NavItem>}
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
              {!isProjectPage && <NavItem to="projects">Projects</NavItem>}
              <NavItem to="contributions">Contributions</NavItem>
              <NavItem to="experience">Experience</NavItem>
              {!isActivitiesPage && <NavItem to="activities">Activities</NavItem>}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
