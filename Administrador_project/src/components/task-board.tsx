"use client"

import { useContext, useEffect, useState } from "react"
import { TaskCard } from "./task-card"
import axios from "axios"
import { ContextProvider, ContextTask } from "@/context/context-Modal"


export type Task = {
  id: string
  title: string
  description?:string
  taskId: string
  assignee: string | null
  status: "completado" | "enproceso" 
}

const initialTasks: Task[] = [
  { id: "1", title: "gggg", taskId: "PRAC-4", assignee: null, status: "completado" },
  
]

export function TaskBoard({variant}: {variant: string}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const contex2= useContext(ContextProvider);
  
    if(contex2==null){
     throw new Error("Contexto no disponible");
    }
  
    const {id,setId} = contex2 ;

  const contex= useContext(ContextTask);
  
    if(contex==null){
     throw new Error("Contexto no disponible");
    }
  
    const {value,setValue} = contex ;

  const updateTaskAssignee = (taskId: string, assignee: string | null) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, assignee } : task)))
  }


  async function updateStatus(id:number,estado:string){
      try {
        const response = await axios.patch(
          "http://localhost:3000/api/task/"+id,
          { "status":estado },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("actualizando estado:", response.data);
        setValue(!value);
        
      } catch (err) {
        console.error("Error al recibir actualizar estado:", err);
      }
    
  }



  useEffect(()=>{
    async function fetchTasks(){
      try {
        const response = await axios.get(
          "http://localhost:3000/api/task/two/?project="+id+"&estado="+variant,

          {
            headers: {
              "Content-Type": "application/json",
              // Puedes agregar más headers como tokens de autenticación:
              // 'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log("task:", response.data);
        setTasks(response.data.data)

        
      } catch (err) {
        console.error("Error al recibir los proyectos:", err);
      }

      
    }

    fetchTasks()
  },[value])


  

  return (
    <div className="space-y-6">
    
        
        <div className="space-y-3 p-1">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onAssigneeChange={(assignee) => updateTaskAssignee(task.id, assignee)}
              onStatusChange={updateStatus}
            />
          ))}
        </div>
     
    </div>
  )
}
