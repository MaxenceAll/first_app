import { useEffect , useState , useRef } from "react";

import { RiAddCircleFill, RiExchangeFill , RiDeleteBin6Fill , RiDeleteBack2Fill} from 'react-icons/ri';


function TodoEditor(props) {

    const {todos , users} = props;

    const TodoEditorForm = useRef();

    const nomTodoRef = useRef();
    const descTodoRef = useRef();
    const customerDispoSelector = useRef();
    const idTodoRef = useRef();
    const todoDispoSelector = useRef();

    const add_todo_submitRef= useRef();
    const modif_todo_submitRef= useRef();
    const supp_todo_submitRef= useRef();
    const del_todo_submitRef= useRef();


    useEffect( ()=> {

        console.log("Users: "+users);
        console.log(todos);

    }, [])


    const handleSelectChangeTodoDispo = (event) => {

        const selectedId = event.target.value;
        const selectedTodo = todos.find((todo) => todo.id == selectedId);
        idTodoRef.current.value = selectedTodo ? selectedTodo.id : "";
        nomTodoRef.current.value = selectedTodo ? selectedTodo.title : "";
        descTodoRef.current.value = selectedTodo ? selectedTodo.description : "";

        if (selectedTodo && typeof selectedTodo === "object" && selectedTodo.hasOwnProperty('id_customer')) {
            for ( let user of users ) {
              if ( user.id == selectedTodo.id_customer) {
                customerDispoSelector.current.options[user.id].selected = true;
              }    
            }
          }
          
        
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
    <>         
            <form id="TodoEditorForm" ref={TodoEditorForm}>

                    <div className="container m-5">
                        <div className="mb-5">
                            <u>Ajout/Modification/Suppression de Todo :</u>
                        </div>
                    </div>

                    <div className="input-group mb-3 mt-3">
                        <label className="input-group-text w-50" htmlFor="tododispo-select">Todos disponibles :</label>
                            <select className="form-select" id="tododispo-select" name="todoDispoSelector" ref={todoDispoSelector} onChange={handleSelectChangeTodoDispo}>
                                <option defaultValue>Ajouter...</option>
                                {todos.map((todo) => <option key={todo.id} value={todo.id}> {todo.title} </option>)}
                            </select>
                    </div>

                    <hr />

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

                    <div className="input-group mb-3 mt-3">
                        <label className="input-group-text w-50" htmlFor="customerdispo-select">Propriétaires dispos :</label>
                            <select className="form-select" id="customerdispo-select" name="customerDispoSelector" ref={customerDispoSelector}>
                                <option defaultValue>Choisir...</option>
                                {users.map((users) => <option key={'customer:'+users.id} value={users.email}> ({users.id}){users.email} </option>)}
                            </select>
                    </div>            

                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text w-25">Id(readonly) :</span>
                            <textarea ref={idTodoRef} id="idTodo" className="form-control text-bg-secondary" readOnly placeholder="id here"></textarea>
                        </div>
                    </div> 

                    <hr/>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success m-1"   onClick={handleSubmit}  id="add_todo_submit" ref={add_todo_submitRef}>  &nbsp; <RiAddCircleFill /> &nbsp;</button>
                        <button type="submit" className="btn btn-secondary m-1" onClick={handleSubmit}  id="modif_todo_submit" ref={modif_todo_submitRef}> &nbsp;  <RiExchangeFill/> &nbsp;</button>
                        <button type="submit" className="btn btn-warning m-1"   onClick={handleSubmit}  id="supp_todo_submit" ref={supp_todo_submitRef}>  &nbsp; <RiDeleteBin6Fill/> &nbsp;</button>
                        <button type="submit" className="btn btn-danger m-1"    onClick={handleSubmit}  id="del_todo_submit" ref={del_todo_submitRef}>  &nbsp; <RiDeleteBack2Fill/> &nbsp;</button>
                    </div>
            </form>
        <hr/>
    </>
    );
}

export default TodoEditor;