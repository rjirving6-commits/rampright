"use client";

import Link from "next/link";
import { UserProfile } from "@/components/auth/user-profile";
import { ModeToggle } from "./ui/mode-toggle";
import { Sparkles, LayoutDashboard, BookOpen, Settings, Users } from "lucide-react";
import { Button } from "./ui/button";
import { RoleSwitcher, useUserRole } from "./RoleSwitcher";
import { Badge } from "./ui/badge";
import { DemoResetButton } from "./DemoResetButton";

export function SiteHeader() {
  const role = useUserRole();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-warm">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-foreground">
                RampRight
              </span>
            </Link>
          </h1>
          <nav className="hidden md:flex items-center gap-2">
            {role === "new-hire" ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/onboarding/modules/company_overview">
                  <Button variant="ghost" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Modules
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/admin/setup">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Setup
                  </Button>
                </Link>
                <Link href="/admin/plans">
                  <Button variant="ghost" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Plans
                  </Button>
                </Link>
              </>
            )}
          </nav>
          <Badge variant="secondary" className="hidden lg:flex">
            Demo Mode
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <DemoResetButton />
          <RoleSwitcher />
          <UserProfile />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
