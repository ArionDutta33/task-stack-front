
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Plus, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateTaskForm } from "../tasks/CreateTaskForm";
import { useAuth } from "@/contexts/AuthContext";
import { mockTasks } from "@/services/mockData";
import { Task } from "@/types";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Task[]>([]);
  const { currentUser, isManager, logout } = useAuth();
  const navigate = useNavigate();

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = mockTasks.filter(task => 
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchClick = (taskId: string) => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchActive(false);
    navigate(`/tasks/${taskId}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="py-4 px-6 flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            {isSearchActive ? (
              <div className="relative animate-fade-in">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 rounded-md bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary w-64"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (searchQuery.trim().length === 0) {
                      setIsSearchActive(false);
                    }
                  }}
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
                    {searchResults.map(task => (
                      <div 
                        key={task._id} 
                        className="px-4 py-2 hover:bg-accent cursor-pointer"
                        onClick={() => handleSearchClick(task._id)}
                      >
                        <div className="font-medium">{task.taskName}</div>
                        <div className="text-xs text-muted-foreground truncate">{task.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchActive(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
          </Button>

          {isManager && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <CreateTaskForm />
              </DialogContent>
            </Dialog>
          )}

          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
