import React from 'react'
import { useQueryClient, useMutation } from 'react-query'
import createTodoRequest from '../api/createTodoRequest';
import { TokenContext } from '../App';

const CreateTodoForm = () => {

    const [text, setText] = React.useState('');
    const [token] = React.useContext(TokenContext);

    const queryClient = useQueryClient();

    const {mutate: createTodo} = useMutation(
        (newTodo) => {
        return createTodoRequest(newTodo, token);
    }, 
    {
        onSettled: () => {
            queryClient.invalidateQueries('todos');
        },
    });

  return (
    <form 
        onSubmit={(e) => {
            e.preventDefault();
            if(!text) return;
            createTodo({
                text,
            });
            setText('');
        }}
    >
        <input 
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text" 
        />
        <button>Create</button>
    </form>
  )
}

export default CreateTodoForm