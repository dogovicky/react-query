'use client'

import { useProjects } from '@/services/queries';
import { Span } from 'next/dist/trace';
import React, { useState } from 'react'

const Projects = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isSuccess, isError, error, isPlaceholderData, isFetching} = useProjects(page);
  return (
    <>
      { isPending ? <h2>Loading...</h2> : isError ? <div>Error: {error.message}</div> : (
        <div>
            {data.map((project) => (
              <p key={project.id}>
                {project.name}
              </p>
            ))}
        </div>
      )}
      <span>Current Page: {page}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
        Previous Page
      </button> {" "}
      <button onClick={() => {
        if (!isPlaceholderData) {
            setPage((old) => old + 1);
        }
      }} disabled={isPlaceholderData}>
        Next Page
      </button>

      {isFetching ? <span>Loading...</span> : null} {" "}
    </>
  )
}

export default Projects