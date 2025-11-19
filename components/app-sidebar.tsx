"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/vercel.svg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/dashboard/auth/admin",
        },
        {
          title: "Posts",
          url: "/dashboard/posts",
        },
        {
          title: "Settings",
          url: "/dashboard/profile",
        },
      ],
    },
    {
      title: "Categories",
      url: "/dashboard/posts",
      icon: Bot,
      items: [
        {
          title: "Entertainment",
          url: "/dashboard/posts/entertainment",
        },
        {
          title: "Technology",
          url: "/dashboard/posts/technology",
        },
        {
          title: "Development",
          url: "/dashboard/posts/Development",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/dashboard/docs",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/dashboard/docs/introduction",
        },
        {
          title: "Get Started",
          url: "/dashboard/docs/getstarted",
        },
        {
          title: "Tutorials",
          url: "/dashboard/docs/tutorials",
        },
        {
          title: "Changelog",
          url: "/dashboard/docs/changelog",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/admin",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}; 

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
    const { data: session } = authClient.useSession();
    const user = {
      name: session?.user.name || "User Name",
      email: session?.user.email || "email@email.com",
      avatar: session?.user.image || "/vercel.svg", 
    }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
