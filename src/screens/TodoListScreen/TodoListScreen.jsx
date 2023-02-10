import { useEffect, useState } from "react";
import TodoList from "../../components/TodoList/TodoList";
import './TodoListScreen.css';

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
        <div className="">
            <h1>Bonjour {localStorage.getItem('userMail')}</h1>
            Voici la liste des choses à faire !

            <div className="todos-container">
                {
                todoList.map(todo =>
                    {
                        return (

                                    <div className="todo-box" key={todo.id}>
                                        {<TodoList id={todo.id} description={todo.description} title={todo.title} is_favorite={todo.is_favorite} />}
                                    </div>

                                )
                    })
                
                }            
            </div>
            
        </div>
    </>);
}

export default TodoListScreen;