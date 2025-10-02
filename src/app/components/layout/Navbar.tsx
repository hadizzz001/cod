import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, X } from "lucide-react";
import ThemeToggle from '../ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
   

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Courses", href: "/#courses" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/#blog" },
    { name: "Team", href: "/#team" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300 dark:bg-gray-900 dark:text-white",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between relative z-9999999 " style={{ zIndex: "9999999" }}>

        <div className="flex md:space-x-6 items-center">
          <a href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Coducators Logo"
              className="h-12 md:h-14"
            />
          </a>
          <ul className="hidden md:flex space-x-1 ">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-300 dark:bg-gray-900 dark:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a href="/soon">
          <button className="xl:flex hidden overflow-hidden gap-2 justify-center items-center py-3 px-5 my-auto text-lg font-semibold leading-none text-center text-white rounded-xl shadow-md shiny-bg">
            <span className="self-stretch my-auto">Upcoming Courses</span>
            <ArrowRight />
          </button>

        </a>

<ThemeToggle />


        <div className="sm:hidden  ">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out py-20",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ul className="flex flex-col items-center space-y-4 pt-8">
          {navLinks.map((link, index) => (
            <li key={index} className="w-full">
              <a
                href={link.href}
                className="block text-center py-4 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="flex flex-col items-center space-y-4 pt-8">
             
            <a href="/soon">
              <button className="xl:flex  overflow-hidden gap-2 justify-center items-center py-3 px-5 my-auto text-lg font-semibold leading-none text-center text-white rounded-xl shadow-md shiny-bg">
                <span className="self-stretch my-auto inline-flex">Upcoming Courses</span>
                <ArrowRight className="inline-flex" />
              </button>

            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
