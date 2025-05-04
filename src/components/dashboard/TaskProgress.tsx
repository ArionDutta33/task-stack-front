
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskProgressProps {
  completed: number;
  total: number;
}

export function TaskProgress({ completed, total }: TaskProgressProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Task Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">{percentage}%</span>
          <span className="text-sm text-muted-foreground">
            {completed}/{total} tasks completed
          </span>
        </div>
        <Progress value={percentage} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-3 bg-accent rounded-md">
            <span className="block text-sm font-medium text-muted-foreground">In Progress</span>
            <span className="block text-xl font-bold mt-1">{total - completed}</span>
          </div>
          <div className="text-center p-3 bg-accent rounded-md">
            <span className="block text-sm font-medium text-muted-foreground">Completed</span>
            <span className="block text-xl font-bold mt-1">{completed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
