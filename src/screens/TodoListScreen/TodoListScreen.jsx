import { useEffect, useState } from "react";
import TodoList from "../../components/TodoList/TodoList";

function TodoListScreen() {

    const [todoList, setTodoList] = useState([]);

    useEffect(()=>
    {
        const fetchData = async () =>
        {
            const resp = await fetch("http://localhost:1337/todo");
            const todoListData = await resp.json();
            setTodoList(todoListData.data);
        }
        fetchData();
    }
    , [])

    return ( 
    <>
        <div>
            Ici la liste des todos :
            <div>
                {
                todoList.map(todo =>
                    {
                        return <div>{<TodoList />}</div>
                    })
                }
            </div>
        </div>
    </>);
}

export default TodoListScreen;