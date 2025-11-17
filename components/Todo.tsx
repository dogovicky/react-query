import { useTodosIds } from '@/services/queries'
import { useIsFetching } from '@tanstack/react-query';

const Todo = () => {
  const { isPending, isError, data, error, status, fetchStatus} = useTodosIds();
  const isFetching = useIsFetching();

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
        <h2>Global isFetching: {isFetching}</h2>
        <div>
            {data.map((id) => (
                <li key={id}>{id}</li>
            ))}
        </div>
    </>
  )
}

export default Todo