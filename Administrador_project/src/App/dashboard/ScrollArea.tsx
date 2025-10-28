import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { TaskBoard } from "@/components/task-board"

import { DialogDemo } from "./DialogDemo"


export function ScrollAreaDemo({variante,titulo}: {variante: string, titulo: string}) {
  

  

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
