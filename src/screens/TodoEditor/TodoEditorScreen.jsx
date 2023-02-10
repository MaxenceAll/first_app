import { useEffect, useState } from "react";
import TodoEditor from "../../components/TodoEditor/TodoEditor";


function TodoEditorScreen()
{

    const [todoList, setTodoList] = useState([]);

    useEffect(()=>
    {
        const fetchData = async () =>
        {
            const resp = await fetch(`http://localhost:1337/todo`);
            const todoListData = await resp.json();
            setTodoList(todoListData.data);
        }
        fetchData();
    }
    , [])

    return ( 
    <div className="">

            <TodoEditor />
                
    </div> );
}

export default TodoEditorScreen;