
import { Priority, Status, Task, User, Roles } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    _id: "1",
    username: "John Doe",
    email: "john@example.com",
    password: "password", // In a real app, this would be hashed
    bio: "Project Manager",
    dateJoined: "2023-01-15",
    role: Roles.ADMIN
  },
  {
    _id: "2",
    username: "Jane Smith",
    email: "jane@example.com",
    password: "password", // In a real app, this would be hashed
    bio: "Senior Developer",
    dateJoined: "2023-02-10",
    role: Roles.MANAGER
  },
  {
    _id: "3",
    username: "Mike Johnson",
    email: "mike@example.com",
    password: "password", // In a real app, this would be hashed
    bio: "UI/UX Designer",
    dateJoined: "2023-03-05",
    role: Roles.USER
  }
];

// Helper function to get assignable users (not managers)
export const getAssignableUsers = () => {
  return mockUsers.filter(user => user.role !== Roles.MANAGER);
};

// Mock Tasks
export const mockTasks: Task[] = [
  {
    _id: "1",
    taskName: "Implement User Authentication",
    priority: Priority.HIGH,
    description: "Create a secure authentication system with JWT tokens and implement role-based access control.",
    impPoints: [
      "Use JWT for token generation",
      "Implement refresh token mechanism",
      "Add role-based permissions"
    ],
    dueDate: "2023-06-10",
    status: Status.IN_PROGRESS,
    dateTime: "2023-05-20",
    assignedBy: mockUsers[0],
    assignedTo: mockUsers[1]
  },
  {
    _id: "2",
    taskName: "Design Landing Page",
    priority: Priority.MEDIUM,
    description: "Create a modern and responsive landing page design that highlights our key features.",
    impPoints: [
      "Mobile-first approach",
      "Optimize for performance",
      "Use our brand color scheme"
    ],
    dueDate: "2023-06-15",
    status: Status.TODO,
    dateTime: "2023-05-22",
    assignedBy: mockUsers[0],
    assignedTo: mockUsers[2]
  },
  {
    _id: "3",
    taskName: "Bug Fix: Database Connection",
    priority: Priority.HIGH,
    description: "Fix intermittent database connection issues occurring in production environment.",
    impPoints: [
      "Check connection pool settings",
      "Implement retry mechanism",
      "Add better error logging"
    ],
    dueDate: "2023-06-05",
    status: Status.BLOCKED,
    dateTime: "2023-05-23",
    assignedBy: mockUsers[1],
    assignedTo: mockUsers[1]
  },
  {
    _id: "4",
    taskName: "Implement API Caching",
    priority: Priority.LOW,
    description: "Implement Redis caching for frequently accessed API endpoints to improve performance.",
    impPoints: [
      "Set up Redis instance",
      "Identify high-traffic endpoints",
      "Implement cache invalidation strategy"
    ],
    dueDate: "2023-06-25",
    status: Status.TODO,
    dateTime: "2023-05-25",
    assignedBy: mockUsers[0],
    assignedTo: mockUsers[1]
  },
  {
    _id: "5",
    taskName: "Write Documentation",
    priority: Priority.MEDIUM,
    description: "Create comprehensive API documentation for developer onboarding.",
    impPoints: [
      "Use OpenAPI specification",
      "Include example requests/responses",
      "Document authentication flow"
    ],
    dueDate: "2023-06-20",
    status: Status.IN_PROGRESS,
    dateTime: "2023-05-28",
    assignedBy: mockUsers[1],
    assignedTo: mockUsers[0]
  },
  {
    _id: "6",
    taskName: "Deploy Beta Version",
    priority: Priority.HIGH,
    description: "Deploy the beta version of our application to the staging environment for testing.",
    impPoints: [
      "Configure CI/CD pipeline",
      "Prepare rollback strategy",
      "Set up monitoring tools"
    ],
    dueDate: "2023-06-08",
    status: Status.COMPLETED,
    dateTime: "2023-05-30",
    assignedBy: mockUsers[0],
    assignedTo: mockUsers[1]
  },
  {
    _id: "7",
    taskName: "Optimize Image Loading",
    priority: Priority.LOW,
    description: "Implement lazy loading and optimize images to improve page load time.",
    impPoints: [
      "Use next-gen formats (WebP)",
      "Implement lazy loading",
      "Set up CDN for static assets"
    ],
    dueDate: "2023-06-30",
    status: Status.TODO,
    dateTime: "2023-06-01",
    assignedBy: mockUsers[1],
    assignedTo: mockUsers[2]
  },
  {
    _id: "8",
    taskName: "Code Review: Payment Module",
    priority: Priority.MEDIUM,
    description: "Perform a thorough code review of the newly implemented payment gateway integration.",
    impPoints: [
      "Check security best practices",
      "Review error handling",
      "Verify unit test coverage"
    ],
    dueDate: "2023-06-12",
    status: Status.TODO,
    dateTime: "2023-06-02",
    assignedBy: mockUsers[0],
    assignedTo: mockUsers[1]
  }
];

// Helper function to get task statistics
export const getTaskStats = () => {
  const stats = {
    total: mockTasks.length,
    completed: mockTasks.filter(task => task.status === Status.COMPLETED).length,
    inProgress: mockTasks.filter(task => task.status === Status.IN_PROGRESS).length,
    todo: mockTasks.filter(task => task.status === Status.TODO).length,
    blocked: mockTasks.filter(task => task.status === Status.BLOCKED).length,
    highPriority: mockTasks.filter(task => task.priority === Priority.HIGH).length
  };
  
  return stats;
};

// Helper function to get upcoming tasks
export const getUpcomingTasks = () => {
  return mockTasks
    .filter(task => task.status !== Status.COMPLETED)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);
};

// Helper function to get recent tasks
export const getRecentTasks = () => {
  return [...mockTasks]
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
    .slice(0, 5);
};

// Helper function to get tasks by user role
export const getTasksByUserRole = (userId: string) => {
  const user = mockUsers.find(user => user._id === userId);
  
  if (!user) return [];
  
  if (user.role === Roles.ADMIN) {
    // Admin sees all tasks
    return mockTasks;
  } else if (user.role === Roles.MANAGER) {
    // Managers see tasks they created
    return mockTasks.filter(task => task.assignedBy._id === userId);
  } else {
    // Regular users see tasks assigned to them
    return mockTasks.filter(task => task.assignedTo._id === userId);
  }
};
