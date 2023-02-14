import "./TaskList.css";
import { HiXCircle } from 'react-icons/hi2';
import { FcHighPriority , FcMediumPriority , FcLowPriority } from "react-icons/fc";
import { useState  } from "react";

function TodoList(props) {

    let { id, title, description, deadline_date, is_completed, id_priority, id_Todo , onDeleted=()=>{} } = props;

    const [completed, setCompleted] = useState();



    const handleChange = () => {
        setCompleted(!completed);    
        let body = {
            is_completed: completed ? 0 : 1
        };
        const myJSON = JSON.stringify(body);
        fetch("http://localhost:1337/task/" + id, {
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

      const handleClickRemove = () => {
        let body = {
            id
          };
          const myJSON = JSON.stringify(body);
          fetch("http://localhost:1337/task/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: myJSON,
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                onDeleted(data.data);
            })
            .catch((error) => console.error(error));      
      };
    

  return (
    <>
      <div className="row p-2">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">
                ({id_priority === 1 && <FcHighPriority />}
                {id_priority === 2 && <FcMediumPriority />}
                {id_priority === 3 && <FcLowPriority />}) ({id}){title}
                <span className="d-flex justify-content-end">
                  {is_completed 
                  ? 
                  (
                    <input
                      onChange={handleChange}
                      className="checkboxFinished"
                      type="checkbox"
                      defaultChecked
                    />
                  ) 
                  : 
                  (
                    <input
                      onChange={handleChange}
                      className="checkboxFinished"
                      type="checkbox"
                    />
                  )}
                  <button
                    onClick={handleClickRemove}
                    className="btn btn-danger mx-2"
                  >
                    {" "}
                    <HiXCircle />{" "}
                  </button>
                </span>
              </h5>
            </div>

            <div className="card-body">
              <p className="card-text">{description}</p>
            </div>

            <div className="card-footer d-flex justify-content-between">
              <span>Deadline le : {deadline_date}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
