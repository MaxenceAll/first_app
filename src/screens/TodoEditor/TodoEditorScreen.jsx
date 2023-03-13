import { useEffect, useState } from "react";
import TodoEditor from "../../components/TodoEditor/TodoEditor";


function TodoEditorScreen()
{

    const [todoList, setTodoList] = useState([]);
    const [userList, setuserList] = useState([]);

    useEffect(()=>
    {
        const fetchDataTodo = async () =>
        {
            const resp = await fetch(`http://localhost:5000/todo`);
            const todoListData = await resp.json();
            setTodoList(todoListData.data);
        }
        fetchDataTodo();

        const fetchDataUsers = async () =>
        {
            const resp = await fetch(`http://localhost:5000/customer`);
            const userListData = await resp.json();
            setuserList(userListData.data);
        }
        fetchDataUsers();

    }
    , [])

    return ( 
    <div className="">

            <TodoEditor todos={todoList} users={userList} />
                
    </div> );
}

export default TodoEditorScreen;