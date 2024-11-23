import clsx from "clsx";
import { useState } from "react";

import { ABOUT_PAGE, CONTACTS_PAGE, GROUP_PAGE, HOME_PAGE, PROJECTS_PAGE } from "../resources/paths";
import { fonts } from "../resources/fonts/fonts";
import Button from "./Button";
import { ForthIcon } from "../resources/icons";

const NavLinks = [
  { title: "Home", path: HOME_PAGE },
  { title: "Contact", path: CONTACTS_PAGE },
  { title: "Group", path: GROUP_PAGE },
  { title: "About", path: ABOUT_PAGE },
  { title: "Projects", path: PROJECTS_PAGE },
];

type NavbarProps = {
  shadow?: boolean;
  actions?: boolean;
};

function Navbar({ shadow, actions = true }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={clsx(
        "w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white",
        { "shadow-lg": shadow },
        fonts.NM
      )}
    >
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href={HOME_PAGE} className="flex items-center gap-2 text-xl font-black border-none sm:text-2xl">
            <img
              alt="Logo"
              src="/icons/artist-desk-light-logo.svg"
              loading="eager"
              width={41}
              height={41}
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-white lg:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 lg:flex">
            {NavLinks.map((navLink) => (
              <a
                key={navLink.title}
                href={navLink.path}
                className="text-lg transition duration-200 ease-in-out hover:underline underline-offset-8"
              >
                {navLink.title}
              </a>
            ))}
            {actions && (
              <Button
                startIcon={<ForthIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                title="Your Dashboard"
                size="btn-md"
                className="text-sm sm:text-base"
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="text-black bg-white lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {NavLinks.map((navLink) => (
              <a
                key={navLink.title}
                href={navLink.path}
                onClick={toggleMobileMenu}
                className="block text-lg hover:underline underline-offset-8"
              >
                {navLink.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;