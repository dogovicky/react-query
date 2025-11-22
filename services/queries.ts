

import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query"
import { getProjects, getTodo, getTodoIds } from "./api"


export const useTodosIds = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: getTodoIds,
    })
}

// get todos with their Id's ()

export const useTodos = (ids: (number | undefined)[] | undefined) => {
    return useQueries({
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: ['todo', {id}],
                queryFn: () => getTodo(id!)
            }
        })
    })
}


// projects

export const useProjects = (page: number) => {
    return useQuery({
        queryKey: ['projects', { page }],
        queryFn: () => getProjects(page),
        placeholderData: keepPreviousData
    })
}