'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Briefcase, User, Mail } from 'lucide-react';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Header } from '@/components/layout';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            {/* 404 Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold bg-gradient-to-br from-primary via-primary to-primary/60 bg-clip-text text-transparent leading-none mb-6">
                404
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The page you&apos;re looking for seems to have taken a different path. 
                Let&apos;s get you back to exploring my work and experience.
              </p>
            </motion.div>

            {/* Navigation Assistance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/#projects" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    View Projects
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h3 className="text-lg font-medium text-foreground mb-6">
                Popular Sections
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <Link 
                  href="/#skills"
                  className="group p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-center"
                >
                  <div className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform">
                    <User className="w-full h-full" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Skills
                  </span>
                </Link>

                <Link 
                  href="/#experience"
                  className="group p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-center"
                >
                  <div className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform">
                    <Briefcase className="w-full h-full" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Experience
                  </span>
                </Link>

                <Link 
                  href="/#contributions"
                  className="group p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-center"
                >
                  <div className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform">
                    <GitHubLogoIcon className="w-full h-full" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    GitHub
                  </span>
                </Link>

                <Link 
                  href="/#activities"
                  className="group p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-center"
                >
                  <div className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform">
                    <Mail className="w-full h-full" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Activities
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="border-t border-border pt-8"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Can&apos;t find what you&apos;re looking for?
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="ghost" size="sm">
                  <a 
                    href="https://github.com/verdenroz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                    aria-label="Visit Harvey's GitHub profile"
                  >
                    <GitHubLogoIcon className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a 
                    href="https://linkedin.com/in/harvey-tseng" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                    aria-label="Visit Harvey's LinkedIn profile"
                  >
                    <LinkedInLogoIcon className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}