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
            {
            todoList.map(todo =>
                {
                    return <div className="" key={todo.id}>{<TodoList id={todo.id} description={todo.description} title={todo.title} is_favorite={todo.is_favorite} />}</div>
                })
            }
        </div>
    </>);
}

export default TodoListScreen;