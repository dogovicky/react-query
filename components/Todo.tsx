import { useCreateTodo, useDeleteTodo, useUpdateTodo } from '@/services/mutations';
import { useTodos, useTodosIds } from '@/services/queries'
import { Todo } from '@/types/todo';
import { useIsFetching } from '@tanstack/react-query';

const Todos = () => {
  const { isPending, isError, data, error, status, fetchStatus} = useTodosIds();
  const todoQueries = useTodos(data);


  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleCreateTodoSubmit = (data: Todo) => {
    createTodoMutation.mutate(data);
  }

  const handleUpdateTodo = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate(data);
    }
  }

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id); // if you want to perform a task after finalizing delete
    console.log('success');
  }

  if(isPending) {
    return <span>Loading...</span>
  };

  if(isError) {
    return <span>{error.message}</span>
  }

  return (
    <>
        <h2>Query fetch status: {fetchStatus}</h2>
        <h2>Query data status: {status}</h2>

        {/* useQuery concept: Fetch a specific part of the data */}
        <div>
            {data.map((id) => (
                <li key={id}>{id}</li>
            ))}
        </div>

        {/* useQueries cocept: Fetching a lot of data in parallel */}
        <ul>
          {todoQueries.map(({ data }) => (
            <li key={data?.id}>
              <div>ID: {data?.id}</div>
              <span>
                <strong>Title: {data?.title}</strong> {" "}
                <strong>{data?.description}</strong>
              </span>
              <div>
                <button onClick={() => handleUpdateTodo(data)} disabled={data?.checked}>
                  {data?.checked ? 'Done' : 'Mark as done'}
                </button>

                { data && data?.id && (
                  <button onClick={() => handleDeleteTodo(data?.id!)}>
                    Delete
                  </button>
                )}
                
              </div>
            </li>
          ))}
        </ul>

        {/* useMutation concept: used for updating data on the backend */}
        {/* <form onSubmit={handleCreateTodoSubmit}>
          <input type="text" placeholder='Title' value={} onChange={} /> <br />
          <input type="text" value={} onChange={} /> <br />
          <input type="text" value={} onChange={} /> <br />
          <input type="submit" />
        </form> */}
    </>
  )
}

export default Todos