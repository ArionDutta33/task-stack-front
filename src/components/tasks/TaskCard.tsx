
import { format } from "date-fns";
import { Calendar, Clock, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task, Priority, Status } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  // Helper function to get priority styles
  const getPriorityStyles = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return { bgColor: "bg-priority-high/10", textColor: "text-priority-high", borderColor: "border-priority-high/50" };
      case Priority.MEDIUM:
        return { bgColor: "bg-priority-medium/10", textColor: "text-priority-medium", borderColor: "border-priority-medium/50" };
      case Priority.LOW:
        return { bgColor: "bg-priority-low/10", textColor: "text-priority-low", borderColor: "border-priority-low/50" };
      default:
        return { bgColor: "bg-muted", textColor: "text-muted-foreground", borderColor: "border-muted" };
    }
  };

  // Helper function to get status badge style
  const getStatusBadge = (status: Status) => {
    switch (status) {
      case Status.TODO:
        return <Badge variant="outline" className="bg-status-todo/10 text-status-todo border-status-todo/30">To Do</Badge>;
      case Status.IN_PROGRESS:
        return <Badge variant="outline" className="bg-status-inProgress/10 text-status-inProgress border-status-inProgress/30">In Progress</Badge>;
      case Status.COMPLETED:
        return <Badge variant="outline" className="bg-status-completed/10 text-status-completed border-status-completed/30">Completed</Badge>;
      case Status.BLOCKED:
        return <Badge variant="outline" className="bg-status-blocked/10 text-status-blocked border-status-blocked/30">Blocked</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const priorityStyles = getPriorityStyles(task.priority);

  return (
    <div 
      className={cn(
        "bg-card rounded-lg p-4 border task-card-shadow",
        `border-l-4 ${priorityStyles.borderColor}`
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-base">{task.taskName}</h3>
        {getStatusBadge(task.status)}
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{task.description}</p>
      
      {task.impPoints && task.impPoints.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-muted-foreground mb-1">Important Points:</div>
          <ul className="text-xs space-y-1 list-disc list-inside">
            {task.impPoints.slice(0, 2).map((point, index) => (
              <li key={index} className="text-muted-foreground line-clamp-1">{point}</li>
            ))}
            {task.impPoints.length > 2 && (
              <li className="text-muted-foreground flex items-center">
                <Plus className="inline h-3 w-3 mr-1" /> {task.impPoints.length - 2} more points
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Due: {format(new Date(task.dueDate), "MMM d, yyyy")}</span>
        </div>

        <div className="flex items-center">
          <Avatar className="h-6 w-6">
            <AvatarImage src="" />
            <AvatarFallback className="text-xs bg-primary/20 text-primary">
              {task.assignedTo.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
