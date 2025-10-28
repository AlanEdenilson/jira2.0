import { useContext, useEffect, useState } from "react";
import { ScrollAreaDemo } from "./ScrollArea";
import { ContextProvider } from "@/context/context-Modal";
import axios from "axios";
import type { Response } from "@/components/app-sidebar";
import type { ProjectStatus } from "@/context/type/Types";

interface Project {
  id: number;

  name: string;

  description: string;

  status: ProjectStatus;

  color: string;

  createdAt: Date;

  updateAt: Date;

  isActive: boolean;

  tags: string[];

}

const Project = () => {
  const mockData = [
    {
      id: 1,
      name: "Proyecto Alpha",
      description: "Descripción del proyecto Alpha",
      status: "ACTIVO",
      color: "#3B82F6",
      createdAt: "2024-01-15",
      updateAt: "2024-10-20",
      tags: [
        "v1.2.0-beta.50",
        "v1.2.0-beta.49",
        "v1.2.0-beta.48",
        "v1.2.0-beta.47",
      ],
    },
  ];
  const [projects, setProjects] = useState(mockData);
  const contex= useContext(ContextProvider);

  if(contex==null){
   throw new Error("Contexto no disponible");
  }

  const {id,setId} = contex ;

   useEffect(() => {


    async function getProject(){
      try {
        const response = await axios.get<Response>(
          "http://localhost:3000/api/project/"+id,

          {
            headers: {
              "Content-Type": "application/json",
              // Puedes agregar más headers como tokens de autenticación:
              // 'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log("proyecto:", response.data);
        setProjects([response.data]);

        
      } catch (err) {
        console.error("Error al recibir los proyectos:", err);
      }

    }

    if (id !== null) {
      getProject();
    }else{
      console.log("ID de proyecto es null");
    }
  },[id]);

  console.log("ID de proyecto en componente:", id);

  
  if (id == null) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

 

  const getStatusColor = (status) => {
    const colors = {
      activo: "bg-green-100 text-green-800",
      EN_DESARROLLO: "bg-blue-100 text-blue-800",
      PAUSADO: "bg-yellow-100 text-yellow-800",
      COMPLETADO: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

 

  return (
    <>
      <div className="bg-muted/50 h-40 max-h-40  rounded-xl ">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-100rounded-lg shadow-sm border border-gray-200 h-40  hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {project.name}
                  </h2>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status.replace("_", " ")}
                  </span>
                </div>
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: project.color }}
                ></div>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {project.description}
              </p>

              <div className="mt-1 pt-1 border-t border-gray-100 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>
                    Creado: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    Act: {new Date(project.updateAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-muted/50 h-90 min-h-90  rounded-xl   flex  gap-5 pl-10 pt-10">
        <ScrollAreaDemo variante="completado" titulo="completado"></ScrollAreaDemo>

        <ScrollAreaDemo variante="enproceso" titulo="enproceso"></ScrollAreaDemo>
      </div>
    </>
  );
};

export default Project;
