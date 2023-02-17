import React from 'react'
import { useQueryClient, useMutation, QueryClient } from 'react-query'
import updateTodoRequest from '../api/updateTodoRequest';
import deleteTodoRequest from '../api/deleteTodoRequest';
import { debounce } from 'lodash';
import { TokenContext } from '../App';


const TodoItem = ({todo}) => {

    const [text, setText] = React.useState(todo.text)
    const [token] = React.useContext(TokenContext);

    const queryClient = useQueryClient();

    const {mutate: updateTodo} = useMutation((updatedTodo) => {
        return updateTodoRequest(updatedTodo, token);
    }, 
    {
        onSettled: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    const debouncedUpdateTodo = React.useCallback(debounce(updateTodo, 1000), [updateTodo]);

    const {mutate: deleteTodo} = useMutation((updatedTodo) => {
        return deleteTodoRequest(updatedTodo, token);
    }, 
    {
        onSettled: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    React.useEffect(() => {
        if(text !== todo.text) {
            debouncedUpdateTodo({
                ...todo,
                text,
            })
        }
    }, [text])

  return (
    <div>
        <input 
            checked={todo.completed} 
            type="checkbox" 
            onChange={() => updateTodo({
                ...todo, 
                completed: !todo.completed,
            })} 
        />

        <input 
            type='text' 
            value={text}
            onChange={(e) => setText(e.target.value)} 
        />

        <button onClick={() => deleteTodo(todo)} >delete</button>
    </div>
  )
}

export default TodoItem