import { useEffect, useState } from "react";
import TodoList from "../../components/TodoList/TodoList";
import './TodoListScreen.css';

function TodoListScreen(props) 
{

    const { setScreen } = props;

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
                        const {id, title, description, is_favorite} = todo;
                        return (

                                    <div className="todo-box" key={id}>
                                        {<TodoList id={id} description={description} title={title} is_favorite={is_favorite} setScreen={setScreen} />}
                                    </div>

                                )
                    })
                
                }
            </div>
            
        </div>
    </>);
}

export default TodoListScreen;