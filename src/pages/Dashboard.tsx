
import { CheckCircle, Clock, ListTodo, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskProgress } from "@/components/dashboard/TaskProgress";
import { PriorityChart } from "@/components/dashboard/PriorityChart";
import { TaskList } from "@/components/tasks/TaskList";
import { getTaskStats, getUpcomingTasks } from "@/services/mockData";

export default function Dashboard() {
  const stats = getTaskStats();
  const upcomingTasks = getUpcomingTasks();

  return (
    <Layout title="Dashboard" subtitle="Overview of your tasks">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Tasks" 
            value={stats.total} 
            icon={<ListTodo size={20} />} 
          />
          <StatCard 
            title="In Progress" 
            value={stats.inProgress}
            icon={<Clock size={20} />} 
            trend="up"
            trendValue="+2 since last week"
          />
          <StatCard 
            title="Completed" 
            value={stats.completed} 
            icon={<CheckCircle size={20} />} 
            trend="up"
            trendValue="+3 since last week"
          />
          <StatCard 
            title="Blocked" 
            value={stats.blocked} 
            icon={<AlertCircle size={20} />} 
            trend="down"
            trendValue="-1 since last week"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TaskProgress 
              completed={stats.completed} 
              total={stats.total} 
            />
          </div>
          <div className="lg:col-span-2">
            <PriorityChart 
              high={stats.highPriority}
              medium={mockTasks.filter(task => task.priority === "MEDIUM").length}
              low={mockTasks.filter(task => task.priority === "LOW").length}
            />
          </div>
        </div>
        
        <div>
          <TaskList tasks={upcomingTasks} title="Upcoming Tasks" />
        </div>
      </div>
    </Layout>
  );
}
