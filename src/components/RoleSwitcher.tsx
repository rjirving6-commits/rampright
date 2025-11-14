"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCog, Users, ChevronDown } from "lucide-react";

export type UserRole = "manager" | "new-hire";

const ROLE_STORAGE_KEY = "demo-user-role";

export function RoleSwitcher() {
  const [role, setRole] = useState<UserRole>("new-hire");
  const [mounted, setMounted] = useState(false);

  // Load role from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedRole = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole;
    if (savedRole === "manager" || savedRole === "new-hire") {
      setRole(savedRole);
    }
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem(ROLE_STORAGE_KEY, newRole);
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent("roleChanged", { detail: newRole }));
    // Reload to update navigation
    window.location.reload();
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Users className="h-4 w-4 mr-2" />
        Loading...
      </Button>
    );
  }

  const roleConfig = {
    manager: {
      label: "Manager",
      icon: UserCog,
      description: "View as hiring manager",
    },
    "new-hire": {
      label: "New Hire",
      icon: Users,
      description: "View as new employee",
    },
  };

  const currentConfig = roleConfig[role];
  const CurrentIcon = currentConfig.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <CurrentIcon className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{currentConfig.label}</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Demo Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleRoleChange("new-hire")}
          className="cursor-pointer"
        >
          <Users className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">New Hire</div>
            <div className="text-xs text-muted-foreground">
              Employee onboarding
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleRoleChange("manager")}
          className="cursor-pointer"
        >
          <UserCog className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">Manager</div>
            <div className="text-xs text-muted-foreground">
              Setup & monitor
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Hook to get current role
export function useUserRole(): UserRole {
  const [role, setRole] = useState<UserRole>("new-hire");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedRole = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole;
    if (savedRole === "manager" || savedRole === "new-hire") {
      setRole(savedRole);
    }

    // Listen for role changes
    const handleRoleChange = (e: Event) => {
      const customEvent = e as CustomEvent<UserRole>;
      setRole(customEvent.detail);
    };

    window.addEventListener("roleChanged", handleRoleChange);
    return () => window.removeEventListener("roleChanged", handleRoleChange);
  }, []);

  return mounted ? role : "new-hire";
}
