
import { useState } from "react";
import { Priority, Status, User } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export function CreateTaskForm() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>();
  const [impPoint, setImpPoint] = useState("");
  const [impPoints, setImpPoints] = useState<string[]>([]);
  
  // Mock users for demo
  const users: User[] = [
    { _id: "1", username: "John Doe", email: "john@example.com", dateJoined: new Date().toISOString(), role: "ADMIN" as any },
    { _id: "2", username: "Jane Smith", email: "jane@example.com", dateJoined: new Date().toISOString(), role: "USER" as any },
  ];

  const addImpPoint = () => {
    if (impPoint.trim() !== "") {
      setImpPoints([...impPoints, impPoint.trim()]);
      setImpPoint("");
    }
  };

  const removeImpPoint = (index: number) => {
    setImpPoints(impPoints.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the data to your API
    toast({
      title: "Task created successfully",
      description: "Your task has been created and assigned.",
    });
    // Reset form or close dialog
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="taskName" className="text-sm font-medium">Task Name</Label>
          <Input id="taskName" placeholder="Enter task name" className="mt-1" required />
        </div>
        
        <div>
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Describe the task..."
            className="mt-1 resize-none h-[100px]"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Priority.HIGH}>High</SelectItem>
                <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
                <SelectItem value={Priority.LOW}>Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="status" className="text-sm font-medium">Status</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Status.TODO}>To Do</SelectItem>
                <SelectItem value={Status.IN_PROGRESS}>In Progress</SelectItem>
                <SelectItem value={Status.COMPLETED}>Completed</SelectItem>
                <SelectItem value={Status.BLOCKED}>Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="assignedTo" className="text-sm font-medium">Assign To</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user._id} value={user._id}>{user.username}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="dueDate" className="text-sm font-medium">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium">Important Points</Label>
          <div className="flex mt-1">
            <Input 
              value={impPoint}
              onChange={(e) => setImpPoint(e.target.value)}
              placeholder="Add important point"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addImpPoint();
                }
              }}
            />
            <Button 
              type="button"
              variant="secondary"
              className="ml-2"
              onClick={addImpPoint}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {impPoints.length > 0 && (
            <ul className="mt-3 space-y-2">
              {impPoints.map((point, index) => (
                <li 
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-secondary text-secondary-foreground rounded-md text-sm"
                >
                  <span>{point}</span>
                  <button
                    type="button"
                    onClick={() => removeImpPoint(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
