'use client'

import Projects from "@/components/Projects";
import OldFetch from "./(query)/page";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } }
})

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main>
        <QueryClientProvider client={queryClient}>
          <OldFetch />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </main>
    </div>
  );
}
