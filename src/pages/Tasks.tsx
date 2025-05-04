
import { Layout } from "@/components/layout/Layout";
import { TaskList } from "@/components/tasks/TaskList";
import { mockTasks } from "@/services/mockData";

export default function Tasks() {
  return (
    <Layout title="All Tasks" subtitle="Manage and track all your tasks">
      <TaskList tasks={mockTasks} />
    </Layout>
  );
}
