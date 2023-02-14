import { useEffect, useState } from "react";
import TaskList from "../../components/TaskList/TastkList";
import './TaskListScreen.css';

function TaskListScreen()
{
    const [taskList, setTaskList] = useState([]);

    useEffect(()=>
    {
        const fetchData = async () =>
        {
            const resp = await fetch("http://localhost:1337/task");
            const taskListData = await resp.json();
            setTaskList(taskListData.data);
        }
        fetchData();
    }
    , [])




    return ( 
        <>
        {console.log(taskList)}
            <div className="task-container">
            <h1>Bonjour, {localStorage.getItem('userMail')}</h1>
            
            <pre>Voici la liste tasks liées à la todo : </pre>
            <pre>(afficher ici la todo)</pre>
                {                        
                taskList.map(task =>
                    {
                        const {id, title, description, deadline_date, is_completed, id_priority, id_Todo} = task;
                        return (
                          <div className="todo-box" key={id}>
                            {
                              <TaskList
                                id={id}
                                description={description}
                                title={title}
                                deadline_date={deadline_date}
                                is_completed={is_completed}
                                id_priority={id_priority}
                                id_Todo={id_Todo}
                                //TODO créer fonction pour remplacer ici
                                onDeleted ={ (data) => {
                                    const newTaskList = taskList.filter(task=> task.id!==data.id);
                                    newTaskList.push(data);
                                    setTaskList(newTaskList);
                                }}
                                onPriority ={ (data) => {
                                    const newTaskList = taskList.filter(task=> task.id!==data.id);
                                    newTaskList.push(data);
                                    newTaskList.sort((a,b)=> (a.id<b.id)? -1 : 1);
                                    setTaskList(newTaskList);
                                }}
                                onFinished ={ (data) => {
                                    const newTaskList = taskList.filter(task=> task.id!==data.id);
                                    newTaskList.push(data);
                                    newTaskList.sort((a,b)=> (a.id<b.id)? -1 : 1);
                                    setTaskList(newTaskList);
                                }}                                
                              />
                            }
                          </div>
                        );
                    })
                
                }
            </div> 
    </>);
}

export default TaskListScreen;