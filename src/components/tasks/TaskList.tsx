
import { useState } from "react";
import { Task, Status, Priority } from "@/types";
import { TaskCard } from "./TaskCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  title?: string;
}

export function TaskList({ tasks, title }: TaskListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (statusFilter !== "all" && task.status !== statusFilter) {
      return false;
    }
    
    // Filter by priority
    if (priorityFilter !== "all" && task.priority !== priorityFilter) {
      return false;
    }
    
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "dueDate":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "priority":
        const priorityOrder = { [Priority.HIGH]: 0, [Priority.MEDIUM]: 1, [Priority.LOW]: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case "name":
        return a.taskName.localeCompare(b.taskName);
      default:
        return 0;
    }
  });

  return (
    <div>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2 text-sm">
          <Button 
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm" 
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === Status.TODO ? "default" : "outline"}
            size="sm" 
            onClick={() => setStatusFilter(Status.TODO)}
          >
            To Do
          </Button>
          <Button 
            variant={statusFilter === Status.IN_PROGRESS ? "default" : "outline"}
            size="sm" 
            onClick={() => setStatusFilter(Status.IN_PROGRESS)}
          >
            In Progress
          </Button>
          <Button 
            variant={statusFilter === Status.COMPLETED ? "default" : "outline"}
            size="sm" 
            onClick={() => setStatusFilter(Status.COMPLETED)}
          >
            Completed
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value={Priority.HIGH}>High</SelectItem>
              <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
              <SelectItem value={Priority.LOW}>Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="name">Task Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-muted/30 rounded-lg border border-dashed">
          <p className="text-lg font-medium text-muted-foreground">No tasks found</p>
          <p className="text-sm text-muted-foreground mt-1">Try changing your filters or add a new task</p>
        </div>
      )}
    </div>
  );
}
