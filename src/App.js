import logo from './logo.svg';
import './App.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { checkUser, createTodo, getAllTodo } from './utils';
import { useState } from 'react';

function App() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState("")
  const [search, setSearch] = useState('')

  // Queries Data List
  const { data, isLoading } = useQuery(
    {
      queryFn: () => getAllTodo(search),
      queryKey: ['todos', search],
    })

  // Mutations All
  const createMutation = useMutation(createTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos')
      alert("Succesfully Created")
    },
  })

  const checkMutation = useMutation(checkUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos')
    },
  })

  // handle add 
  const handleAdd = () => {
    createMutation.mutate({
      id: Date.now(),
      name: title,
    })
    setTitle("")
  }

  // handle check 
  const handleCheck = (item, index) => {
    checkMutation.mutate({
      ...item,
      index: index,
    })
  }

  return (
    <div className="App">
      <input placeholder='Search User' onChange={(e) => setSearch(e?.target?.value)} value={search} type="text" />
      <input placeholder='Add User' onChange={(e) => setTitle(e?.target?.value)} value={title} type="text" />
      <button onClick={handleAdd}>Add</button>
      {isLoading && <h1>Loading</h1>}
      {data?.map((item, index) => {
        return (
          <p> <input onChange={() => handleCheck(item, index)} checked={item?.check} type="checkbox" /> {item?.name}</p>
        )
      })}
    </div>
  );
}

export default App;
