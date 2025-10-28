"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  type LucideIcon,
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
import { ProjectContext } from "@/context/context-Modal";
import axios from "axios";


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
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

enum ProjectStatus {
  ACTIVO = "activo",
  COMPLETADO = "completado",
  CANCELADO = "cancelado",
}

interface Project {
  id: number;

  name: string;

  description: string;

  status: ProjectStatus;

  color: string;

  createdAt: Date;

  updateAt: Date;

  isActive: boolean;

  icon?:LucideIcon

}

export interface Response {
  data: Project[];
  message: string;
  ok: boolean;
  status: number;
  total: number;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [valor, setValor] = React.useState(false);

  const [projects, setProjects] = React.useState<Project[]>([]);

 

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<Response>(
          "http://localhost:3000/api/project/?page=1&pageSize=10",

          {
            headers: {
              "Content-Type": "application/json",
              // Puedes agregar más headers como tokens de autenticación:
              // 'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log("proyectos:", response.data);
        setProjects(response.data.data);
      } catch (err) {
        console.error("Error al recibir los proyectos:", err);
      }
    }

    fetchData();
  }, [valor]);



  return (
    <ProjectContext.Provider value={{ valor, setValor }}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
          <NavProjects projects={projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </ProjectContext.Provider>
  );
}
