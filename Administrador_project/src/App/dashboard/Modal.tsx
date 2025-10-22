import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function DialogDemo() {

  const [open, setOpen] = useState(false)



  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <form>
        
          <span   onClick={()=>{setOpen(!open)}}>Open Dialog</span>
        

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crer proyecto</DialogTitle>
            <DialogDescription>
              Por favor describe los detalles del nuevo proyecto que deseas
              crear.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name"  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username"  />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
