import "./TodoList.css";

function TodoList(props) {

    // const { id } = props;
    // const { title } = props;
    // const { description }  = props;
    const {id , title , description} = props;

  return (
    <>
        <div className="TodoBox container">
          <div>            
            <h2> {id} ► <u>{title}</u> </h2>
            <h5> <i>{description}</i> </h5>   
          </div>

          <div className="d-inline-flex pt-2">
            <div>
              <button type="button" className="btn btn-primary mx-3">Voir</button>
            </div>
            <div>
              <button type="button" className="btn btn-success mx-3">Fini</button>
            </div>
            <div>
              <button type="button" className="btn btn-outline-danger mx-3">Supprimer</button>
            </div>
          </div>

        </div>    
    </>
  );
}

export default TodoList;
