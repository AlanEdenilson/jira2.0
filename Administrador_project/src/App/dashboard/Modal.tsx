import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Bot, CheckCircle2Icon } from "lucide-react"
import { useState } from "react"


import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DialogDemo() {

  const [open, setOpen] = useState(false)


  // 1. Define validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Too short!" }).max(30, { message: "Too long!" }),
  description: z.string().min(2, { message: "Too short!" }).max(100, { message: "Too long!" }),
  color: z.string().min(7, { message: "Invalid color!" }).max(7, { message: "Invalid color!" })

})

// 2. Create form with useForm hook
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: { name: "" , description: "", color: "#62a0ea"}
})



  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }




  



  return (
    <>
    <Bot onClick={()=>{setOpen(!open)}}></Bot>
    <Dialog open={open} onOpenChange={setOpen} >
          <span   onClick={()=>{setOpen(!open)}}>Open Dialog</span>
        

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crer proyecto</DialogTitle>
            <DialogDescription>
              Por favor describe los detalles del nuevo proyecto que deseas
              crear.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                  
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                  
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>color</FormLabel>
                    <FormControl>
                      <Input className="w-24" type="color" placeholder="" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />

              </div>
              
              <Alert className="bg-sky-100 mb-3" >
              <CheckCircle2Icon  />
              <AlertTitle>Success! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
            
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          </form>
          </Form>
           
        </DialogContent>
     
    </Dialog>
    </>
    
  )
}
