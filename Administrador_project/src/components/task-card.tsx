"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, User } from "lucide-react"
import type { Task, Users } from "./task-board"
import { DialogDemo2 } from "@/App/dashboard/DialogDemo2"

type TaskCardProps = {
  user:Users[] | null
  task: Task
  onAssigneeChange: (assignee: string | null) => void
  onStatusChange: (id:number,estado:string) => void
}

const users = [
  { id: "1", name: "ALAN EDENILSON CAMPOS SA...", email: "cs25001@esfe.agape.edu.sv", initials: "A2" },
  { id: "2", name: "Marvin Antonio Barrera trigueros", email: "marvin@example.com", initials: "MB" },
  { id: "3", name: "Jazmin lue", email: "jazmin@example.com", initials: "JL" },
]

export function TaskCard({ user,task, onAssigneeChange, onStatusChange }: TaskCardProps) {
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false)
  const assignedUser = users.find((u) => u.id === task.assignee)


  return (
    <Card className="group relative border border-border bg-card p-3 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 items-start gap-3">
        
          <div className="flex-1 space-y-2">
            <DialogDemo2 variant={task.title} task={task}></DialogDemo2>
            
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Checkbox className="h-3 w-3" checked />
                {'PRAC-'+task.id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Popover open={isAssigneeOpen} onOpenChange={setIsAssigneeOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                {assignedUser ? (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-orange-500 text-xs text-white">
                      {assignedUser.initials}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="border-b border-border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {assignedUser ? assignedUser.name : "Sin asignar"}
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setIsAssigneeOpen(false)}
                  >
                    Sin asignar
                  </Button>
                </div>
              </div>
              <div className="p-2">
                <button
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
                  onClick={() => {
                    onAssigneeChange(null)
                    setIsAssigneeOpen(false)
                  }}
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Automático</span>
                </button>
                {user&&user.map((user) => (
                  <button
                    key={user.id}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
                    onClick={() => {
                      onAssigneeChange(user.id.toString())
                      setIsAssigneeOpen(false)
                    }}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-orange-500 text-xs text-white">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-foreground">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Cambiar estado</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={()=>{onStatusChange(+task.id,'enproceso')}}>En progreso</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>{onStatusChange(+task.id,'completado')}}>Completado</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>Copiar enlace</DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}
