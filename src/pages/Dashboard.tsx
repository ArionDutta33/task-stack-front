
import { CheckCircle, Clock, ListTodo, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskProgress } from "@/components/dashboard/TaskProgress";
import { PriorityChart } from "@/components/dashboard/PriorityChart";
import { TaskList } from "@/components/tasks/TaskList";
import { getTaskStats, getUpcomingTasks, getTasksByUserRole } from "@/services/mockData";
import { Priority } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { currentUser, isAdmin, isManager, isUser } = useAuth();
  
  // Get user-specific tasks based on role
  const userTasks = currentUser ? getTasksByUserRole(currentUser._id) : [];
  
  // Calculate stats based on filtered tasks instead of all tasks
  const totalTasks = userTasks.length;
  const completedTasks = userTasks.filter(task => task.status === "COMPLETED").length;
  const inProgressTasks = userTasks.filter(task => task.status === "IN_PROGRESS").length;
  const blockedTasks = userTasks.filter(task => task.status === "BLOCKED").length;
  const highPriorityTasks = userTasks.filter(task => task.priority === Priority.HIGH).length;
  const mediumPriorityTasks = userTasks.filter(task => task.priority === Priority.MEDIUM).length;
  const lowPriorityTasks = userTasks.filter(task => task.priority === Priority.LOW).length;
  
  // Get upcoming tasks specific to the user
  const upcomingTasks = userTasks
    .filter(task => task.status !== "COMPLETED")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  // Different title based on role
  let roleSpecificTitle = "Your Dashboard";
  if (isAdmin) {
    roleSpecificTitle = "Admin Dashboard";
  } else if (isManager) {
    roleSpecificTitle = "Manager Dashboard";
  } else if (isUser) {
    roleSpecificTitle = "Your Tasks";
  }

  return (
    <Layout title={roleSpecificTitle} subtitle={getRoleSpecificSubtitle(isAdmin, isManager, isUser)}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Tasks" 
            value={totalTasks} 
            icon={<ListTodo size={20} />} 
          />
          <StatCard 
            title="In Progress" 
            value={inProgressTasks}
            icon={<Clock size={20} />} 
            trend="up"
            trendValue={`${inProgressTasks > 0 ? Math.round((inProgressTasks/totalTasks)*100) : 0}% of total`}
          />
          <StatCard 
            title="Completed" 
            value={completedTasks} 
            icon={<CheckCircle size={20} />} 
            trend="up"
            trendValue={`${completedTasks > 0 ? Math.round((completedTasks/totalTasks)*100) : 0}% of total`}
          />
          <StatCard 
            title="Blocked" 
            value={blockedTasks} 
            icon={<AlertCircle size={20} />} 
            trend="down"
            trendValue={`${blockedTasks > 0 ? Math.round((blockedTasks/totalTasks)*100) : 0}% of total`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TaskProgress 
              completed={completedTasks} 
              total={totalTasks} 
            />
          </div>
          <div className="lg:col-span-2">
            <PriorityChart 
              high={highPriorityTasks}
              medium={mediumPriorityTasks}
              low={lowPriorityTasks}
            />
          </div>
        </div>
        
        <div>
          <TaskList 
            tasks={upcomingTasks} 
            title={
              isAdmin ? "All Upcoming Tasks" : 
              isManager ? "Tasks You Created" : 
              "Your Assigned Tasks"
            } 
          />
        </div>
      </div>
    </Layout>
  );
}

// Helper function to get role-specific subtitle
function getRoleSpecificSubtitle(isAdmin: boolean, isManager: boolean, isUser: boolean): string {
  if (isAdmin) {
    return "Overview of all tasks in the system";
  } else if (isManager) {
    return "Overview of tasks you've created";
  } else if (isUser) {
    return "Overview of tasks assigned to you";
  }
  return "Overview of your tasks";
}
