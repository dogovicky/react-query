'use client'

import Projects from '@/components/Projects'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } }
})


const ProjectsPage = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Projects />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
        
    </>
  )
}

export default ProjectsPage