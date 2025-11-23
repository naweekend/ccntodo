"use client";

import { useUser } from "@clerk/nextjs";
import { Brain, Home, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftSidebar({ className = "" }: { className?: string }) {
  const { user } = useUser();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/home") return pathname === "/home" || pathname === "/";
    if (path.startsWith("/profile") && user?.id) {
      return pathname?.startsWith(`/profile/${user.id}`);
    }
    // For everything else, just match exact path
    return pathname === path;
  };

  const navItems = [
    { href: "/home", icon: Home, label: "Home" },
    { href: `/profile/${user?.id}`, icon: User, label: "Profile" },
    { href: "/iq", icon: Brain, label: "IQ Test" },
  ];

  return (
    <aside className={`${className} w-100 flex flex-col justify-start py-6 px-5`}>
      <ul>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group relative mx-auto flex items-center gap-4 px-4 rounded-sm active:scale-95 py-3 max-w-80 w-full
                transition-all duration-200
                ${active
                  ? "font-bold text-foreground"
                  : "text-foreground/90 hover:bg-foreground/10"
                }
              `}
            >
              {/* Active indicator bar */}
              {active && (
                <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-sm" />
              )}

              {/* Correct Icon */}
              <IconComponent
                className="size-7"
                strokeWidth={active ? 2.8 : 2}
              />

              <span className="text-xl font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </ul>

      {/* Post Button */}
      <div className="bg-red-">
        <Link
          href="/home?focus=true"
          className="mt-6 max-w-80 mx-auto w-full px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center gap-2 text-xl font-bold transition-all active:scale-95"
        >
          <Plus className="size-7" />
          <span><span className="max-xl:hidden">Create </span>Post</span>
        </Link>
      </div>
    </aside>
  );
}