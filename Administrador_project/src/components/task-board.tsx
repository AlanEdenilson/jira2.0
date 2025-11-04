"use client"
import { useContext, useEffect, useState } from "react"
import { TaskCard } from "./task-card"
import axios from "axios"
import { ContextProvider, ContextTask } from "@/context/context-Modal"
import { api } from "@/ruta"



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

interface props {
  variant:string
   isDragging: boolean
    handleDragging: (dragging: boolean) => void
}

export function TaskBoard({variant,isDragging,handleDragging}: props) {
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
          api+"/api/task/"+taskId,
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
          api+"/api/task/"+taskId,
      
  
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
          api+"/api/task/"+id,
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
          api+"/api/task/two/?project="+id+"&estado="+variant,

          {
            headers: {
              "Content-Type": "application/json",
              // Puedes agregar más headers como tokens de autenticación:
              // 'Authorization': `Bearer ${token}`
            },
          }
        );

        const response2 = await axios.get(
          api+"/user",

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


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const arrayPorPalabras = e.dataTransfer.getData('text').split(' ');
        console.log(arrayPorPalabras);

        console.log(arrayPorPalabras)

        console.log('soltando el elemento',arrayPorPalabras[0])

        if(arrayPorPalabras[1]!==variant){
            updateStatus(+arrayPorPalabras[0],variant)
        }
        console.log('el estatus es igual asi que no cambiara')

        //
       
        handleDragging(false)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  return (
    <div className={isDragging?'space-y-6 border-2 border-dashed':'space-y-6 border-2'}
      onDrop={handleDrop}
            onDragOver={handleDragOver}>
    
        
        <div className="space-y-3 p-1">
          {tasks.map((task) => (
            <TaskCard
              user={users}
              key={task.id}
              task={task}
              onAssigneeChange={(assignee) => updateTaskAssignee(task.id, assignee)}
              onStatusChange={updateStatus}
              clear={borrar}
              handleDragging={handleDragging}
            />
          ))}
        </div>
     
    </div>
  )
}
