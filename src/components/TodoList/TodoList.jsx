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
            <h2> <u>{title} ({id})</u> </h2>
            <h5> <i>{description}</i> </h5>   
          </div>
          <div>
            <button type="button" class="btn btn-info">Info</button>
          </div>     
        </div>    
    </>
  );
}

export default TodoList;
