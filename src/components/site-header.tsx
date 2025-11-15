"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfile } from "@/components/auth/user-profile";
import { useSession } from "@/lib/auth-client";
import { Sparkles, LayoutDashboard, Settings, Users, DollarSign, FileText, Briefcase, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

export function SiteHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <h1 className="text-xl sm:text-2xl font-bold shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-warm">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <span className="text-foreground">
                RampRight
              </span>
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <Link href="/pricing">
              <Button
                variant={isActive("/pricing") ? "default" : "ghost"}
                size="sm"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Pricing
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant={isActive("/blog") ? "default" : "ghost"}
                size="sm"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Blog
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button
                variant={isActive("/case-studies") ? "default" : "ghost"}
                size="sm"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Case Studies
              </Button>
            </Link>
            <Link href="/documents">
              <Button
                variant={isActive("/documents") ? "default" : "ghost"}
                size="sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </Button>
            </Link>

            {/* Authenticated User Navigation */}
            {session && (
              <>
                <div className="h-6 w-px bg-border mx-2" />
                <Link href="/dashboard">
                  <Button
                    variant={isActive("/dashboard") ? "default" : "ghost"}
                    size="sm"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/admin/plans">
                  <Button
                    variant={isActive("/admin/plans") ? "default" : "ghost"}
                    size="sm"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Plans
                  </Button>
                </Link>
                <Link href="/admin/setup">
                  <Button
                    variant={isActive("/admin/setup") ? "default" : "ghost"}
                    size="sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Setup
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* User Profile */}
          <div className="flex items-center gap-2 shrink-0">
            <UserProfile />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className="flex md:hidden items-center gap-2 mt-4 overflow-x-auto pb-2">
          <Link href="/pricing">
            <Button
              variant={isActive("/pricing") ? "default" : "ghost"}
              size="sm"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Pricing
            </Button>
          </Link>
          <Link href="/blog">
            <Button
              variant={isActive("/blog") ? "default" : "ghost"}
              size="sm"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Blog
            </Button>
          </Link>
          <Link href="/case-studies">
            <Button
              variant={isActive("/case-studies") ? "default" : "ghost"}
              size="sm"
            >
              <Briefcase className="h-4 w-4 mr-1" />
              Studies
            </Button>
          </Link>
          <Link href="/documents">
            <Button
              variant={isActive("/documents") ? "default" : "ghost"}
              size="sm"
            >
              <FileText className="h-4 w-4 mr-1" />
              Docs
            </Button>
          </Link>
          {session && (
            <>
              <Link href="/dashboard">
                <Button
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  size="sm"
                >
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/plans">
                <Button
                  variant={isActive("/admin/plans") ? "default" : "ghost"}
                  size="sm"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Plans
                </Button>
              </Link>
              <Link href="/admin/setup">
                <Button
                  variant={isActive("/admin/setup") ? "default" : "ghost"}
                  size="sm"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Setup
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
