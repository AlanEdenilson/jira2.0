import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ContextProject, ContextProvider, ContextTask } from "@/context/context-Modal"
import { useState } from "react"
import Project from "./Project"

enum ProjectStatus {
  ACTIVO = "activo",
  COMPLETADO = "completado",
  CANCELADO = "cancelado",
}

interface Projects {
  id: number;

  name: string;

  description: string;

  status: ProjectStatus;

  color: string;

  createdAt: Date;

  updateAt: Date;

  isActive: boolean;

  task:[]

}

export interface Response {
  data: typeof Project[];
  message: string;
  ok: boolean;
  status: number;
  total: number;
}

export default function Page() {
  const [id,setId] = useState<number | null>(null);
  const [value,setValue] = useState<boolean>(false);
  const [projects, setProjects] = useState<Projects[]|[]| Projects>([]);
  



  return (
    <ContextProvider.Provider value={{id,setId}}>
      <ContextTask.Provider value={{value,setValue}}>
        <ContextProject.Provider value={{projects,setProjects}}>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex  flex-col gap-3 p-4 pt-0 ">
          
         <Project></Project>

        </div>
      </SidebarInset>
    </SidebarProvider>
    </ContextProject.Provider>
    </ContextTask.Provider>
    </ContextProvider.Provider>
  )
}
