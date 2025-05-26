export type Task = {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
};

export type FilterElement = {
  searchByTitle: string;
  searchByDescription: string;
  searchByBoth: string;
  filterStatus: string;
};

export enum TodoStatus {
  TODO = "Todo",
  INPROGRESS = "In Progress",
  DONE = "Done",
}
