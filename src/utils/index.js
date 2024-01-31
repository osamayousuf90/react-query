const getTodo = [
    {
        name: "Osama",
        id: 1,
        check: false,
    },
    {
        name: "John",
        id: 2,
        check: false,
    },
    {
        name: "Steve",
        id: 3,
        check: false,
    },
    {
        name: "Chris",
        id: 4,
        check: false,
    },
]

export const getAllTodo = async (search) => {
    await new Promise((resovle) => setTimeout(resovle, 500))
    const temp = getTodo.filter((user) =>
        user?.name?.toLowerCase().includes(search?.toLowerCase()))
    return [...temp]
}

export const createTodo = (body) => {
    getTodo.push(body)
    getAllTodo()
}

export const checkUser = (body) => {
    getTodo[body?.index].check = !body?.check
    getAllTodo()
}

