
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams } from "react-router-dom";
import { mockTasks } from "@/services/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Edit, User, Users } from "lucide-react";
import { format } from "date-fns";
import { Priority, Status, Task } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function TaskDetails() {
  const { id } = useParams();
  const task = mockTasks.find(t => t._id === id);
  
  if (!task) {
    return (
      <Layout title="Task Not Found" subtitle="The requested task could not be found">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold mb-2">404</h2>
          <p className="text-muted-foreground mb-6">Task not found</p>
          <Button asChild>
            <a href="/tasks">Back to Tasks</a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Helper function to get priority styles
  const getPriorityStyles = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return { bgColor: "bg-priority-high/10", textColor: "text-priority-high", borderColor: "border-priority-high" };
      case Priority.MEDIUM:
        return { bgColor: "bg-priority-medium/10", textColor: "text-priority-medium", borderColor: "border-priority-medium" };
      case Priority.LOW:
        return { bgColor: "bg-priority-low/10", textColor: "text-priority-low", borderColor: "border-priority-low" };
      default:
        return { bgColor: "bg-muted", textColor: "text-muted-foreground", borderColor: "border-muted" };
    }
  };
  
  // Helper function to get status badge
  const getStatusBadge = (status: Status) => {
    switch (status) {
      case Status.TODO:
        return <Badge className="bg-status-todo text-white">To Do</Badge>;
      case Status.IN_PROGRESS:
        return <Badge className="bg-status-inProgress text-white">In Progress</Badge>;
      case Status.COMPLETED:
        return <Badge className="bg-status-completed text-white">Completed</Badge>;
      case Status.BLOCKED:
        return <Badge className="bg-status-blocked text-white">Blocked</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const priorityStyles = getPriorityStyles(task.priority);

  return (
    <Layout title={task.taskName} subtitle="Task details and progress">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 mb-6">
                  {getStatusBadge(task.status)}
                  <Badge variant="outline" className={cn(priorityStyles.bgColor, priorityStyles.textColor)}>
                    {task.priority} Priority
                  </Badge>
                </div>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              
              <h1 className="text-2xl font-bold mb-4">{task.taskName}</h1>
              <p className="text-muted-foreground mb-6">{task.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="text-muted-foreground mr-1">Due Date:</span>
                    {format(new Date(task.dueDate), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="text-muted-foreground mr-1">Created:</span>
                    {format(new Date(task.dateTime), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              
              {task.impPoints && task.impPoints.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Important Points</h3>
                  <ul className="space-y-2">
                    {task.impPoints.map((point, index) => (
                      <li 
                        key={index}
                        className="flex items-start bg-accent rounded-md p-3"
                      >
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs mr-2">
                          {index + 1}
                        </span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium mb-4">Assigned To</h3>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {task.assignedTo.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{task.assignedTo.username}</p>
                  <p className="text-sm text-muted-foreground">{task.assignedTo.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium mb-4">Assigned By</h3>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {task.assignedBy.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{task.assignedBy.username}</p>
                  <p className="text-sm text-muted-foreground">{task.assignedBy.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium mb-4">Actions</h3>
              <div className="space-y-2">
                <Button className="w-full">Mark as Complete</Button>
                <Button variant="outline" className="w-full">Change Status</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
