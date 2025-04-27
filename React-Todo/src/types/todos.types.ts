export type TodoProps = {
  taskName: string;
  id: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FetchedTodoProps = TodoProps & {
  _id: string;
};
