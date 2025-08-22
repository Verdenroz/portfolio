"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Handle hydration and initial theme setup
  React.useEffect(() => {
    setMounted(true)
    
    // If theme is system, set it to the resolved theme (light or dark)
    if (theme === "system" && resolvedTheme) {
      setTheme(resolvedTheme)
    }
  }, [theme, resolvedTheme, setTheme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const getThemeLabel = () => {
    if (!mounted) return "Toggle theme"
    
    return theme === "light" ? "Switch to dark mode" : "Switch to light mode"
  }

  const getCurrentTheme = () => {
    if (!mounted) return "light"
    return theme === "dark" ? "dark" : "light"
  }

  const getThemeIcon = () => {
    const currentTheme = getCurrentTheme()

    if (currentTheme === "light") {
      return (
        <motion.div
          key="sun"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <SunIcon className="h-4 w-4" />
        </motion.div>
      )
    } else {
      return (
        <motion.div
          key="moon"
          initial={{ scale: 0, rotate: 90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: -90 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <MoonIcon className="h-4 w-4" />
        </motion.div>
      )
    }
  }

  const getButtonStyle = () => {
    if (!mounted) return ""

    const currentTheme = getCurrentTheme()

    if (currentTheme === "light") {
      return "bg-gradient-to-br from-yellow-200 to-orange-300 hover:from-yellow-300 hover:to-orange-400 border-yellow-300 text-orange-800 shadow-lg hover:shadow-yellow-200/50"
    } else {
      return "bg-gradient-to-br from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-800 border-blue-700 text-blue-100 shadow-lg hover:shadow-blue-500/20"
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${getButtonStyle()}`}
        aria-label={getThemeLabel()}
      >
        <AnimatePresence mode="wait">
          {getThemeIcon()}
        </AnimatePresence>
        
        {/* Glow effect for light theme */}
        {getCurrentTheme() === "light" && mounted && (
          <motion.div
            className="absolute inset-0 rounded-md"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(251, 191, 36, 0)",
                "0 0 0 4px rgba(251, 191, 36, 0.3)",
                "0 0 0 0 rgba(251, 191, 36, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        
        <span className="sr-only">{getThemeLabel()}</span>
      </Button>
    </motion.div>
  )
}

