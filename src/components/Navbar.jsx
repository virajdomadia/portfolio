import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#100425]/70 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#DC00D3] to-[#0CFFFF]">
            Anurag
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-8 text-lg font-medium">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-[#0CFFFF] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden bg-[#100425] px-6 pb-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-lg text-white hover:text-[#0CFFFF] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;
