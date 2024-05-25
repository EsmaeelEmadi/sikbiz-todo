export enum TaskStatus {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface ITask {
  title: string;
  description: string;
  id: number;
  status: keyof typeof TaskStatus;
}
