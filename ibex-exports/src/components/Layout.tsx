import React from "react";
import { Link, useLocation } from "wouter";
import { MapPin, Phone, Mail, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [location] = useLocation();
  const { site } = useContent();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Export Info", path: "/export-info" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 md:px-8 text-xs font-medium hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2" data-testid="topbar-phone">
              <Phone size={14} className="text-accent" /> {site.phone}
            </span>
            <span className="flex items-center gap-2" data-testid="topbar-email">
              <Mail size={14} className="text-accent" /> {site.email}
            </span>
          </div>
          <div className="flex items-center gap-2" data-testid="topbar-location">
            <MapPin size={14} className="text-accent" /> {site.location}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" data-testid="nav-logo">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-accent font-serif font-bold text-xl group-hover:bg-primary/90 transition-colors">
              IE
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-none text-foreground tracking-tight">{site.companyName.split(' ')[0]}</span>
              <span className="text-[10px] tracking-[0.2em] text-primary uppercase font-bold">{site.companyName.split(' ')[1] || ''}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary relative py-2 ${
                  location === link.path ? "text-primary" : "text-foreground/80"
                }`}
                data-testid={`nav-link-${link.name.toLowerCase().replace(" ", "-")}`}
              >
                {link.name}
                {location === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-t-full" />
                )}
              </Link>
            ))}
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 border-transparent ml-4 rounded-none font-semibold px-6 shadow-md shadow-accent/20" data-testid="nav-btn-quote">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-border shadow-xl p-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`p-3 text-base font-medium rounded-md flex items-center justify-between ${
                  location === link.path ? "bg-primary/5 text-primary" : "text-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(" ", "-")}`}
              >
                {link.name}
                <ChevronRight size={16} className="text-muted-foreground" />
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
              <Button asChild className="w-full bg-accent text-accent-foreground font-semibold">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Get Quote</Link>
              </Button>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground p-2">
                <span className="flex items-center gap-2"><Phone size={14} /> {site.phone}</span>
                <span className="flex items-center gap-2"><Mail size={14} /> {site.email}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-[6px] border-accent">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-primary font-serif font-bold text-xl">
                  IE
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl leading-none text-background tracking-tight">{site.companyName.split(' ')[0]}</span>
                  <span className="text-[10px] tracking-[0.2em] text-accent uppercase font-bold">{site.companyName.split(' ')[1] || ''}</span>
                </div>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
                {site.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif font-semibold text-lg mb-6 text-background">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.slice(0, 5).map(link => (
                  <li key={`footer-${link.path}`}>
                    <Link href={link.path} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2">
                      <ChevronRight size={12} className="text-accent" /> {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-serif font-semibold text-lg mb-6 text-background">Our Products</h4>
              <ul className="space-y-3">
                <li><Link href="/products" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2"><ChevronRight size={12} className="text-accent" /> Premium Basmati Rice</Link></li>
                <li><Link href="/products" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2"><ChevronRight size={12} className="text-accent" /> Pink Himalayan Salt</Link></li>
                <li><Link href="/products" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2"><ChevronRight size={12} className="text-accent" /> Organic Herbs & Spices</Link></li>
                <li><Link href="/products" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2"><ChevronRight size={12} className="text-accent" /> Dried Fruits & Nuts</Link></li>
                <li><Link href="/products" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2"><ChevronRight size={12} className="text-accent" /> Cotton Products</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif font-semibold text-lg mb-6 text-background">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                  <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                  <span className="whitespace-pre-wrap">{site.address}</span>
                </li>
                <li className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                  <Phone size={18} className="text-accent shrink-0" />
                  <span>{site.phone}</span>
                </li>
                <li className="flex items-center gap-3 text-primary-foreground/70 text-sm">
                  <Mail size={18} className="text-accent shrink-0" />
                  <span>{site.email}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
            <p>&copy; {new Date().getFullYear()} IBEX Exports. All rights reserved.</p>
            <div className="flex gap-4 items-center">
              <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
              <span className="w-px h-3 bg-primary-foreground/20" />
              <Link href="/admin/login" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
