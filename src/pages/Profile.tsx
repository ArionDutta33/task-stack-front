
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers, mockTasks } from "@/services/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { TaskList } from "@/components/tasks/TaskList";

export default function Profile() {
  // For demo, use the first user
  const user = mockUsers[0];
  
  // Get tasks assigned to this user
  const assignedTasks = mockTasks.filter(task => task.assignedTo._id === user._id);
  const createdTasks = mockTasks.filter(task => task.assignedBy._id === user._id);
  
  return (
    <Layout title="My Profile" subtitle="View and manage your profile">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl font-bold">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.username}</h2>
                <p className="text-sm text-muted-foreground">{user.role}</p>
                <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                <p className="mt-4 text-sm">{user.bio || "No bio provided"}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Member since {format(new Date(user.dateJoined), "MMMM yyyy")}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm font-medium">User Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Assigned Tasks</span>
                  <span className="font-medium">{assignedTasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Created Tasks</span>
                  <span className="font-medium">{createdTasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed Tasks</span>
                  <span className="font-medium">
                    {assignedTasks.filter(task => task.status === "COMPLETED").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="assigned" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="assigned" className="flex-1">Assigned to Me</TabsTrigger>
              <TabsTrigger value="created" className="flex-1">Created by Me</TabsTrigger>
            </TabsList>
            <TabsContent value="assigned">
              <TaskList tasks={assignedTasks} />
            </TabsContent>
            <TabsContent value="created">
              <TaskList tasks={createdTasks} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
