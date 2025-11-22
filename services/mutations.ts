import { Todo } from "@/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, updateTodo } from "./api";

// Creating todo
export function useCreateTodo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Todo) => createTodo(data),

        onMutate: () => {
            console.log("mutate")
        },

        onError: () => {
            console.log("error")
        },

        onSuccess: () => {
            console.log("Success");
        },

        onSettled: async (_, error) => {
            console.log("settled");
            if (error) {
              console.log(error);
            } else {
              await queryClient.invalidateQueries({ queryKey: ['todos']}) // updates / refetches the list everytime a new todo is added or one is deleted
            }
        }
    })
}

// Updating todo
export function useUpdateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Todo) => updateTodo(data),

        onSettled: async(_, error, variables) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ['todos'] });
                await queryClient.invalidateQueries({ queryKey: ['todo', { id: variables.id }] })
            }
        }
    });
}


// Delete todo

export function useDeleteTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteTodo(id),

        onSuccess: () => {
            console.log("Successfully deleted todo item");
        },

        onSettled: async (_, error) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ['todos'] })
            }
        }
    })
}