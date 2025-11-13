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
