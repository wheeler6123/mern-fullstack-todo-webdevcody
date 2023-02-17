import React from 'react'
import {useQuery} from 'react-query'
import ClipLoader from 'react-spinners/ClipLoader'
import readTodosRequest from '../api/readTodosRequest'
import '../App.css'
import TodoItem from '../components/TodoItem'
import CreateTodoForm from '../components/CreateTodoForm'
import { TokenContext } from '../App'

const TodoPage = () => {

    const [token] = React.useContext(TokenContext);

    const {isLoading, data: todos} = useQuery('todos', () => readTodosRequest(token))


  return (
    <div>
        <h1>MERN TODO APP</h1>
      {isLoading ? (
        <ClipLoader size={150}/>
      ) : (      
        todos.map(todo => (
          <TodoItem todo={todo} key={todo._id}/>
        ))
      )}
      <CreateTodoForm />
    </div>
  )
}

export default TodoPage