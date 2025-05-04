
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  CheckCircle, 
  Home, 
  ListTodo, 
  Settings, 
  User
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: ListTodo,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Completed",
    href: "/completed",
    icon: CheckCircle,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="h-screen w-64 bg-sidebar fixed left-0 top-0 border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="px-4 py-6">
          <h1 className="text-white text-2xl font-bold flex items-center">
            <CheckCircle className="mr-2 text-sidebar-primary" /> 
            TaskStack
          </h1>
        </div>
        
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group transition-all",
                    location.pathname === item.href && "bg-sidebar-accent text-sidebar-primary"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 mr-3 transition-colors",
                    location.pathname === item.href ? "text-sidebar-primary" : "text-sidebar-foreground group-hover:text-sidebar-primary"
                  )} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="ml-3">
              <p className="text-sm text-white font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
