"use client";

import {
  Folder,
  Forward,
  Frame,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import { ContextProvider, ProjectContext } from "@/context/context-Modal";
import axios from "axios";
import Project from "@/App/dashboard/Project";
import { api } from "@/ruta";

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

  icon?: LucideIcon;
}

export function NavProjects({ projects }: { projects: Project[] | Project |[]}) {
  const { isMobile } = useSidebar();

  const contex = React.useContext(ContextProvider);

  const projectsArray: Project[] = Array.isArray(projects) ? projects : projects ? [projects] : [];

  const context2 =React. useContext(ProjectContext);
  
    if (!context2){
      throw new Error('a ocurrido un error al usar el esado del proyecto')
    }
  
    const { valor,setValor} = context2


  if (contex == null) {
    throw new Error("Contexto no disponible");
  }

   const {  setId } = contex;

  async function borrar(id:number) {
    try {
      const response = await axios.delete(
        api+"/api/project/" + id,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Datos enviados exitosamente:", response.data);
      setValor(!valor)
    } catch (error) {
      console.log(error)
    }
  }

 

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projectsArray.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <span
                onClick={() => {
                  setId(item.id);
                }}
              >
                <Frame style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>{borrar(item.id)}}>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
