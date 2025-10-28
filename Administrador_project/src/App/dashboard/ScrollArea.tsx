import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { TaskBoard } from "@/components/task-board"
import axios from "axios"
import { DialogDemo } from "./DialogDemo"


const tags = Array.from({ length: 2 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function ScrollAreaDemo({variante,titulo}: {variante: string, titulo: string}) {
  const [cantidad, setCantidad] = React.useState(0)

  React.useEffect(()=>{
    async function fetchTasks(){
      try {
        const response = await axios.get(
          "http://localhost:3000/api/task/two/?project=1&estado="+variante,

          {
            headers: {
              "Content-Type": "application/json",
              // Puedes agregar más headers como tokens de autenticación:
              // 'Authorization': `Bearer ${token}`
            },
          }
        );

        console.log("task:", response.data);
        setCantidad(response.data.total)

        
      } catch (err) {
        console.error("Error al recibir los proyectos:", err);
      }

      
    }

    fetchTasks()
  },[cantidad])

  return (
    <div className=" flex flex-col gap-2 items-center">
        <div>{titulo}</div>
    

    <ScrollArea className="h-85 w-90  rounded-md border  " >
      <div className="p-1">
        
          <React.Fragment key='one'>
             <TaskBoard variant={variante}/>
            <Separator className="my-2" />
          </React.Fragment>
        
        <DialogDemo variant={variante}></DialogDemo>
      </div>
    </ScrollArea>
    </div>
    
  )
}
