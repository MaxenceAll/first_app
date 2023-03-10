import "./TodoList.css";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { HiMagnifyingGlassPlus, HiArrowTopRightOnSquare , HiXCircle } from 'react-icons/hi2';
import { useState } from 'react';

function TodoList(props) {
  let { id, title, description, is_favorite , setScreen} = props;

  const [favorite, setFavorite] = useState(is_favorite);

  const handleClick = (event) => {
    console.log("mon id = " + id);
    setFavorite(!favorite);

    let body = {
      is_favorite: favorite ? 0 : 1
    };
    const myJSON = JSON.stringify(body);
    console.log("json:", myJSON);
    fetch("http://localhost:5000/todo/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: myJSON,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const toto = (e) => {
    console.log(e.currentTarget.id);
};

  return (
    <>
      <div className="TodoBox container">

        <div>
          <h2>
            {id} ► <u>{title}</u>
              <span className="text-danger px-4" onClick={handleClick}> {favorite ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}</span>
            <div className="btn-container">
              <span onClick={toto} id="TaskListScreen" className="text-primary px-1"> <HiMagnifyingGlassPlus/> </span>
              <span onClick={toto} id="TodoEditorScreen" className="text-secondary px-1"> <HiArrowTopRightOnSquare/></span>
              <span onClick={toto} id="" className="text-danger px-1"> <HiXCircle/> </span>
            </div>
          </h2>
          <h5><i>{description}</i></h5>
        </div>


      </div>
    </>
  );
}

export default TodoList;
