'use client'
import Products from "@/components/Products";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } }
})

const page = () => {
  return (
    <>
       <QueryClientProvider client={queryClient}>
          <Products />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </>
  )
}

export default page