import "./TaskList.css";
import { HiXCircle } from 'react-icons/hi2';
import { FcHighPriority , FcMediumPriority , FcLowPriority } from "react-icons/fc";
import { useState , useEffect  } from "react";

function TastkList(props) {

    let { id, title, description, deadline_date, is_completed, id_priority, id_Todo , onDeleted=()=>{} , onPriority=()=>{} } = props;

    const [completed, setCompleted] = useState();
    const [priority, setPriority] = useState(id_priority);

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

    const handleClickPriority = (event) => {
        const priority = event.currentTarget.id;
        setPriority(priority);
      
        let body = {
          id_priority: priority
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
            .then((data) => {
                console.log(data);
                onPriority(data.data);
            })
            .catch((error) => console.error(error));      
    };
      
    useEffect(()=>
    {

    }
    , [])

  return (
    <>
      <div className="row p-2">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                {id_priority === 1 && <FcHighPriority />}
                {id_priority === 2 && <FcMediumPriority />}
                {id_priority === 3 && <FcLowPriority />}
                ({id}){title}
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
                   <HiXCircle />
                  </button>
                </span>
              </h3>
            </div>

            <div className="card-body">
              <p className="card-text">{description}</p>
            </div>

            <div className="card-footer d-flex justify-content-between">
              <span>
                <u>Deadline le :</u> &nbsp; 
                {
                new Date(deadline_date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                }
              </span>
              <div className="prioritiesbtn">
                <button onClick={handleClickPriority} className="btn btn-outline-danger"  id="1"> <FcHighPriority /> </button>
                <button onClick={handleClickPriority} className="btn btn-outline-warning" id="2"> <FcMediumPriority /></button>
                <button onClick={handleClickPriority} className="btn btn-outline-success" id="3"> <FcLowPriority /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TastkList;
