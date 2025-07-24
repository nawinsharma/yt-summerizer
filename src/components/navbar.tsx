"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/landing/resizable-navbar";
import { useState } from "react";
import { authClient } from '@/lib/auth-client';
import SignOutForm from '@/components/sign-out-form';
import Link from 'next/link';
import Logo from './logo';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Nav() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  
  // Determine if we're on dashboard pages
  const isDashboard = pathname.startsWith('/dashboard');
  
  // Different nav items for dashboard vs landing page
  const navItems: Array<{ name: string; link: string }> = isDashboard ? (
    pathname.startsWith('/dashboard') ? [
      // Dashboard nav items can be added here later

    ] : []
  ) : [
   
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center">
            {/* Logo with red YouTube icon */}
            <Link href="/" className="flex items-center gap-2 self-center font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                {/* YouTube icon in red */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" className="size-4">
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.185 3.5 12 3.5 12 3.5s-7.185 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.4 0 12 0 12s0 3.6.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.815 20.5 12 20.5 12 20.5s7.185 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.6 24 12 24 12s0-3.6-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <span className="text-xl font-bold">SumTube</span>
            </Link>
          </div>
          <NavItems items={navItems} />
          <div className="relative z-[70] flex items-center gap-2">
            {/* <ThemeToggle /> */}
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none cursor-pointer">
                      {/* Show user's profile image if available, fallback to first letter of name/email */}
                      {user.image && user.image.startsWith('http') ? (
                        <img
                          src={user.image}
                          alt={user.name || user.email || 'User'}
                          className="h-8 w-8 rounded-full object-cover border border-gray-300"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg border border-gray-300">
                          {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-semibold">{user.name || user.email}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <SignOutForm>
                        <button className="w-full text-center cursor-pointer text-red-600 hover:text-red-700">Logout</button>
                      </SignOutForm>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {!isDashboard && (
                  <NavbarButton 
                    href="/dashboard" 
                    variant="secondary"
                    as={Link}
                  >
                    Dashboard
                  </NavbarButton>
                )}
              </>
            ) : (
              <NavbarButton 
                href="/sign-in" 
                variant="secondary"
                as={Link}
              >
                Login
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <div className="flex items-center gap-2">
              {/* <ThemeToggle /> */}
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-border mt-4 pt-4 px-4 space-y-2">
              {user ? (
                <>
                  {!isDashboard && (
                    <Link
                      href="/dashboard"
                      className="block py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <SignOutForm>
                    <button
                      className="block w-full text-left py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </SignOutForm>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

// Export as default for compatibility
export default Nav;