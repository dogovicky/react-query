import React from 'react'

type TodoID = {
    params: Promise<{id: number}>
}

const Todo = ({ params }: TodoID) => {
  return (
    <div>Todo</div>
  )
}

export default Todo