"use client"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar"
import { LayoutDashboard, Dumbbell, PlusCircle, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Workouts", url: "/dashboard/workouts", icon: Dumbbell },
  { title: "New Workout", url: "/dashboard/workouts/new", icon: PlusCircle },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b h-16 justify-center px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Home className="size-4" />
                <span className="font-bold">Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = (() => {
                  if (item.url === "/dashboard") {
                    return pathname === "/dashboard"
                  }

                  if (item.url === "/dashboard/workouts/new") {
                    return pathname === "/dashboard/workouts/new"
                  }

                  if (item.url === "/dashboard/workouts") {
                    return (
                      pathname.startsWith("/dashboard/workouts") &&
                      pathname !== "/dashboard/workouts/new"
                    )
                  }

                  return false
                })()


                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.url}>
                        <item.icon className={isActive ? "text-primary" : ""} />
                        <span className={isActive ? "text-primary" : ""} >{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
