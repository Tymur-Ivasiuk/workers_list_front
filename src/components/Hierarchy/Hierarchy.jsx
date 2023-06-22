import s from "./Hierarchy.module.css";
import arrow from "../../assets/img/arrow.svg";
import ListContainer from "./List/ListContainer";

const Hierarchy = (props) => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.main_header}>Ієрархія</h1>

      <div className={s.content}>
        <p>Працівники</p>
        <ListContainer />
      </div>
      
    </div>
  );
};

export default Hierarchy;
