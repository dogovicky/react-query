import { Todo } from "@/types/todo";
import axios from "axios";


const BASE_URL = "http://localhost:5173";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodoIds = async () => {
    return (
        await axiosInstance.get<Todo[]>("/todos")
    ).data.map((todo) => todo.id);
}

// Return a todo 
export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
}



//Mutations

export const createTodo = async (data: Todo) => {
  await axiosInstance.post('todos', data);
}

export const updateTodo = async (data: Todo) => {
  return (await axiosInstance.put<Todo>(`todos.${data.id}`, data));
}

export const deleteTodo = async (id: number) => {
  await axiosInstance.delete<Todo>(`todos/${id}`);
}
