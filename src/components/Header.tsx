"use client";

import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavItem = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <Button variant="ghost" asChild onClick={() => setIsMenuOpen(false)}>
      <ScrollLink
        to={to}
        smooth={true}
        duration={500}
        className="cursor-pointer"
      >
        {children}
      </ScrollLink>
    </Button>
  );

  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <nav className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          <ScrollLink
            to="hero"
            smooth={true}
            duration={500}
            className="text-xl font-bold text-foreground cursor-pointer"
          >
            Harvey Tseng
          </ScrollLink>
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
        {isMobile && isMenuOpen && (
          <div className="mt-4 flex flex-col space-y-2">
            <NavItem to="projects">Projects</NavItem>
            <NavItem to="contributions">Contributions</NavItem>
            <NavItem to="experience">Experience</NavItem>
            <NavItem to="activities">Activities</NavItem>
          </div>
        )}
      </nav>
    </header>
  );
}
