import { useEffect , useState , useRef } from "react";

function TodoEditor(props) {

    const {todos} = props;

    const TodoEditorForm = useRef();

    const nomTodoRef = useRef();
    const descTodoRef = useRef();
    const idTodoRef = useRef();
    const todoFormSelector = useRef();

    const add_todo_submitRef= useRef();
    const modif_todo_submitRef= useRef();
    const supp_todo_submitRef= useRef();
    const del_todo_submitRef= useRef();


    useEffect( ()=> {

    }, [])


    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        const selectedTodo = todos.find((todo) => todo.id == selectedId);
        idTodoRef.current.value = selectedTodo ? selectedTodo.id : "";
        nomTodoRef.current.value = selectedTodo ? selectedTodo.title : "";
        descTodoRef.current.value = selectedTodo ? selectedTodo.description : "";
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (event.target.id === "add_todo_submit") 
        {
            console.log(event.target.id); 
            const title = nomTodoRef.current.value;
            const description = descTodoRef.current.value;
            let body = {
                title,
                description
              };
              const myJSON = JSON.stringify(body);
              console.log("json:", myJSON);
              fetch("http://localhost:1337/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: myJSON,
              })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
        } else
        if (event.target.id === "modif_todo_submit") 
        {
            console.log(event.target.id); 
            const id = idTodoRef.current.value;
            const title = nomTodoRef.current.value;
            const description = descTodoRef.current.value;
            let body = {
                id,
                title,
                description
              };
              const myJSON = JSON.stringify(body);
              console.log("json:", myJSON);
              fetch("http://localhost:1337/todo/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: myJSON,
              })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));            
        } else 
        if (event.target.id === "supp_todo_submit") 
        {
            console.log(event.target.id); 
            const id = idTodoRef.current.value;
            let body = {
                id
              };
              const myJSON = JSON.stringify(body);
              console.log("json:", myJSON);
              fetch("http://localhost:1337/todo/" + id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: myJSON,
              })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));                  
        } else 
        if (event.target.id === "del_todo_submit") 
        {
            console.log(event.target.id); 
            const id = idTodoRef.current.value;
            let body = {
                id
              };
              const myJSON = JSON.stringify(body);
              console.log("json:", myJSON);
              fetch("http://localhost:1337/todo/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: myJSON,
              })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));   
        }
    };


    return (

    <> {console.log(todos)}
        
            <form id="TodoEditorForm" ref={TodoEditorForm}>

                    <div className="container m-5">
                        <div className="mb-5">
                            <u>Ajout/Modification/Suppression de Todo :</u>
                        </div>
                    </div>

                    <div className="input-group mb-3 mt-3">
                        <label className="input-group-text w-50" htmlFor="input-todo-select">Todos disponibles :</label>
                            <select className="form-select" id="input-todo-select" name="todoFormSelect" ref={todoFormSelector} onChange={handleSelectChange}>
                                <option defaultValue>Ajouter...</option>
                                {todos.map((todo) => <option key={todo.id} value={todo.id}>{todo.title} </option>)}
                            </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contenu de la todo ! :</label>
                            <div className="input-group">
                                <span className="input-group-text w-50">Titre de la todo :</span>
                                    <textarea ref={nomTodoRef} id="nomTodo" className="form-control" placeholder="Saisir le nom de la todo."></textarea>
                            </div>
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text w-50">Description :</span>
                            <textarea ref={descTodoRef} id="descTodo" className="form-control"  placeholder="Saisir la description de la todo."></textarea>
                        </div>
                    </div>       

                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text w-25">Id(readonly) :</span>
                            <textarea ref={idTodoRef} id="idTodo" className="form-control text-bg-dark" readOnly placeholder="id here"></textarea>
                        </div>
                    </div> 

                    <hr/>

                    <button type="submit" className="btn btn-success m-1"   onClick={handleSubmit}  id="add_todo_submit" ref={add_todo_submitRef}>Ajouter</button>
                    <button type="submit" className="btn btn-secondary m-1" onClick={handleSubmit}  id="modif_todo_submit" ref={modif_todo_submitRef}>Modifier</button>
                    <button type="submit" className="btn btn-warning m-1"   onClick={handleSubmit}  id="supp_todo_submit" ref={supp_todo_submitRef}>Supprimer</button>
                    <button type="submit" className="btn btn-danger m-1"    onClick={handleSubmit}  id="del_todo_submit" ref={del_todo_submitRef}>Effacer pour toujours !</button>

            </form>
            <hr />
    </>);
}

export default TodoEditor;