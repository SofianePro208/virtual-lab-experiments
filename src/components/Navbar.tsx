import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Atom, FlaskConical, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Atom className="w-8 h-8 text-primary animate-pulse-glow" />
              <FlaskConical className="w-4 h-4 text-secondary absolute -bottom-1 -left-1" />
            </div>
            <span className="text-xl font-bold text-gradient">مختبر العلوم</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#physics" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              الفيزياء
            </a>
            <a href="#chemistry" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              الكيمياء
            </a>
            <a href="#experiments" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              التجارب
            </a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              حول
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg">
              ابدأ الآن
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#physics" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                الفيزياء
              </a>
              <a href="#chemistry" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                الكيمياء
              </a>
              <a href="#experiments" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                التجارب
              </a>
              <a href="#about" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                حول
              </a>
              <Button variant="hero" size="lg" className="mt-2">
                ابدأ الآن
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
