
export enum Priority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW"
}

export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  BLOCKED = "BLOCKED"
}

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
  MANAGER = "MANAGER"
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password?: string; // Not used in frontend display
  bio?: string;
  dateJoined: string; // ISO date string
  role: Roles;
}

export interface Task {
  _id: string;
  taskName: string;
  priority: Priority;
  description: string;
  impPoints: string[];
  dueDate: string; // ISO date string
  status: Status;
  dateTime: string; // ISO date string for creation
  assignedBy: User;
  assignedTo: User;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  blocked: number;
  highPriority: number;
}
