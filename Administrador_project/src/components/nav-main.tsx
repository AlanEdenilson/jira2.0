

import { DialogDemo } from "@/App/dashboard/Modal"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



export function NavMain() {



  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
    
          <Collapsible

            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  
                  <DialogDemo></DialogDemo>

                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
               
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
     
      </SidebarMenu>
    </SidebarGroup>
  )
}
