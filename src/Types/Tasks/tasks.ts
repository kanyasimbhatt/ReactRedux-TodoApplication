export type Task = {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
};

export enum TodoStatus {
  TODO = "Todo",
  INPROGRESS = "In Progress",
  DONE = "Done",
}
