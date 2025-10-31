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
  user:Users | null
}



export interface Users{
  
      id: number,
      name: string,
      image: string,
      isActive: boolean,
      createdAt: string,
      updaeAt: string
      initials?: string;
      email?:string
   
}

const initialTasks: Task[] = [
  { id: "1", title: "gggg", taskId: "PRAC-4", assignee: null, status: "completado",user:null },
  
]

export function TaskBoard({variant}: {variant: string}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [users,setUsers]= useState<Users[]| null>(null)


  

  const contex2= useContext(ContextProvider);
  
    if(contex2==null){
     throw new Error("Contexto no disponible");
    }
  
    const {id,} = contex2 ;

  const contex= useContext(ContextTask);
  
    if(contex==null){
     throw new Error("Contexto no disponible");
    }
  
    const {value,setValue} = contex ;

  async function updateTaskAssignee (taskId: string, assignee: string | null){
    try {
        const response = await axios.patch(
          "https://adtask.onrender.com/api/task/"+taskId,
          { "userId":assignee&&+assignee },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("actualizando usuario:", response.data);
        setValue(!value);
        
      } catch (err) {
        console.error("Error al recibir actualizar estado:", err);
      }
  }

  async function borrar(taskId: string){
    try {
        const response = await axios.delete(
          "https://adtask.onrender.com/api/task/"+taskId,
      
  
        );
        console.log("borrado exitosamente:", response.data);
        setValue(!value);
        
      } catch (err) {
        console.error("Error al recibir actualizar estado:", err);
      }
  }



  async function updateStatus(id:number,estado:string){
      try {
        const response = await axios.patch(
          "https://adtask.onrender.com/api/task/"+id,
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
          "https://adtask.onrender.com/api/task/two/?project="+id+"&estado="+variant,

          {
            headers: {
              "Content-Type": "application/json",
              // Puedes agregar más headers como tokens de autenticación:
              // 'Authorization': `Bearer ${token}`
            },
          }
        );

        const response2 = await axios.get(
          "https://adtask.onrender.com/user",

          {
            headers: {
              "Content-Type": "application/json",
              // Puedes agregar más headers como tokens de autenticación:
              // 'Authorization': `Bearer ${token}`
            },
          }
        );

        
        const person = response2.data.data.map((persona: Users) => ({
          ...persona,
          initials: persona.name[0] + persona.name[persona.name.length - 1],
          email: `${persona.name}@gamil.com`,
        }));

        console.log("task:", response.data);
        console.log('usarios',response2.data)
        setTasks(response.data.data)
        setUsers(person)

        
      } catch (err) {
        console.error("Error al recibir los proyectos:", err);
      }
    }

    fetchTasks()
  },[value,id])


  

  return (
    <div className="space-y-6">
    
        
        <div className="space-y-3 p-1">
          {tasks.map((task) => (
            <TaskCard
              user={users}
              key={task.id}
              task={task}
              onAssigneeChange={(assignee) => updateTaskAssignee(task.id, assignee)}
              onStatusChange={updateStatus}
              clear={borrar}
            />
          ))}
        </div>
     
    </div>
  )
}
