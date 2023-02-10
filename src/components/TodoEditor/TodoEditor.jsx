

function TodoEditor() {
    return (
    <div>

            <div className="container m-5">
                <div className="mb-5">
                    <u>Ajout/Modification/Suppression de Todo :</u>
                </div>
            </div>

            <div className="input-group mb-3 mt-3">
                <label className="input-group-text w-50" htmlFor="input-todo-select">Todos disponibles :</label>
                    <select className="form-select" id="input-todo-select" name="todoFormSelect">
                        <option defaultValue>Ajouter...</option>
                            {/* {todoMap} */}
                    </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Contenu de la todo ! :</label>
                    <div className="input-group">
                        <span className="input-group-text w-50">Titre de la todo :</span>
                            <textarea id="titleTodo" className="form-control" placeholder="Saisir le nom de la todo."></textarea>
                    </div>
            </div>

            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text w-50">Description :</span>
                    <textarea id="descTodo" className="form-control"  placeholder="Saisir la description de la todo."></textarea>
                </div>
            </div>        

    </div>
    );
}

export default TodoEditor;