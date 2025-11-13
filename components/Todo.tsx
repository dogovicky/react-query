import { useTodosIds } from '@/services/queries'

const Todo = () => {
  const { isPending, isError, data, error} = useTodosIds();

  if(isPending) {
    return <span>Loading...</span>
  };

  if(isError) {
    return <span>{error.message}</span>
  }

  return (
    <>
        <div>
            {data.map((id) => (
                <li key={id}>{id}</li>
            ))}
        </div>
    </>
  )
}

export default Todo