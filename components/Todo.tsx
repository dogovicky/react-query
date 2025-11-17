import { useCreateTodo } from '@/services/mutations';
import { useTodos, useTodosIds } from '@/services/queries'
import { Todo } from '@/types/todo';
import { useIsFetching } from '@tanstack/react-query';

const Todos = () => {
  const { isPending, isError, data, error, status, fetchStatus} = useTodosIds();
  const todoQueries = useTodos(data);


  const createTodoMutation = useCreateTodo();

  const handleCreateTodoSubmit = (data: Todo) => {
    createTodoMutation.mutate(data);
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
            </li>
          ))}
        </ul>

        {/* useMutation concept: used for updating data on the backend */}
        <form onSubmit={handleCreateTodoSubmit}>
          <input type="text" placeholder='Title' value={} onChange={} /> <br />
          <input type="text" value={} onChange={} /> <br />
          <input type="text" value={} onChange={} /> <br />
          <input type="submit" />
        </form>
    </>
  )
}

export default Todos