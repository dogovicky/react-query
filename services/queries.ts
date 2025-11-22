

import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProduct, getProducts, getProjects, getTodo, getTodoIds } from "./api"
import { Product } from "@/types/product"


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


// products

export const useProducts = () => {
    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined;
            }

            return lastPageParam + 1;
        },
        getPreviousPageParam: (_, __, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined;
            }

            return firstPageParam - 1;
        }
    })
}


export const useProduct = (id: string | null) => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["products", {id}],
        queryFn: () => getProduct(id!),
        enabled: !!id,
        placeholderData: () => {
            const cachedProducts = (queryClient.getQueryData(["products"]) as { pages: Product[] | undefined})?.pages?.flat(2);

            if (cachedProducts) {
                return cachedProducts.find((item) => item.id === id);
            }
        }
    })
}