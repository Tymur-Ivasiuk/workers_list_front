import s from "./Hierarchy.module.css";
import arrow from "../../assets/img/arrow.svg";
import ListContainer from "./List/ListContainer";

const Hierarchy = (props) => {

  const dropHandler = (e) => {
    e.preventDefault()
    console.log("DROP")
    props.setDropId(0)
  }

  const dragOverHandler = (e) => {
    e.preventDefault()
    if(e.target.tagName == "SPAN") {
      e.target.parentElement.style.boxShadow = "0px 4px 3px black"
    }
    console.log(e.target.tagName, e.target.tagName == "P")
  }

  return (
    <div className={s.wrapper} 
    // onDrop={(e) => dropHandler(e)}
    // onDragOver={(e) => dragOverHandler(e)}
    >
      <h1 className={s.main_header}>Ієрархія</h1>

      <div className={s.content}>
        <p>Працівники</p>
        <ListContainer />
      </div>
      
    </div>
  );
};

export default Hierarchy;
