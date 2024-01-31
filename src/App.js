import logo from './logo.svg';
import './App.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
// import { checkUser, createTodo, getAllTodo } from './utils';
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState("")
  const [search, setSearch] = useState('')
  const queryClint = useQueryClient()
  // Queries for getting data
  const { data } = useQuery(
    {
      queryKey: ['advertisement'], //just like useEffect Dependency
      // queryFn: async () => { await GetAllAdvertisement({ type: "All" }) },
    })

  // Mutations for creating data
  const { mutateAsync: handleMe } = useMutation({
    // mutationFn: async (body) => await CreateAdvertisement(body),
    onSuccess: (data) => {
      console.log("api data", data)
      // Invalidate and refetch
      queryClint.invalidateQueries('advertisement')
      alert("Succesfully Created")
    },
  })

  // create advertisement
  const handleCreateAd = async (value) => {
    const body = {
      kioskId: ""
    }
    await handleMe(body)
    // try {
    //     if (type === "0" && !img) return
    //     if (type === "1" && !video) return
    //     setLoader(true)
    //     await CreateAdvertisement(body)
    //     toast.success("Advertisement successfully created")
    //     setLoader(false)
    // } catch (err) {
    //     toast.error("Some error occured")
    //     setLoader(false)

    // }
  }


  return (
    <div className="App">
      <input placeholder='Search User' onChange={(e) => setSearch(e?.target?.value)} value={search} type="text" />
      <input placeholder='Add User' onChange={(e) => setTitle(e?.target?.value)} value={title} type="text" />
      {/* <button onClick={handleAdd}>Add</button> */}
      {/* {isLoading && <h1>Loading</h1>} */}
      {/* {data?.map((item, index) => {
        return (
          <p> <input onChange={() => handleCheck(item, index)} checked={item?.check} type="checkbox" /> {item?.name}</p>
        )
      })} */}
    </div>
  );
}

export default App;
