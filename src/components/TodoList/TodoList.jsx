
function TodoList(props) {

    const { id } = props;

  return (
    <>
        <div>
            <p> Je suis la todo avec l'id : {id}</p>            
        </div>    
    </>
  );
}

export default TodoList;
