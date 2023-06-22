import React from "react";
import arrow from "../../../assets/img/arrow.svg";
import minus from "../../../assets/img/minus.svg";
import s from "../Hierarchy.module.css";

const List = (props) => {
  // debugger;
  return (
    <ol className={s.workers_list}>
      {props.workers.map((worker) => {
        return (
          <ListItem
            worker={worker}
            getNestedWorkers={props.getNestedWorkers}
            deleteNestedWorkers={props.deleteNestedWorkers}
          />
        );
      })}
    </ol>
  );
};

const ListItem = (props) => {
  const onClickAppendData = (e) => {
    props.getNestedWorkers(props.worker.id);
  };

  const onClickDeleteData = (e) => {
    console.log("delete");
    props.deleteNestedWorkers(props.worker.id);
  };

  // debugger;

  return (
    <li
      className={
        props.worker.haveChildren ? s.have_children : s.havent_children
      }
    >
      <p
        className={
          props.worker.children &&
          props.worker.children.length &&
          s.active_worker
        }
        onClick={(props.worker.haveChildren && !(props.worker.children && props.worker.children.length)) ? onClickAppendData : ((props.worker.children && props.worker.children.length) ? onClickDeleteData : undefined)
        }
      >
        {props.worker.haveChildren ? (
          <img src={arrow} className={s.arrow} />
        ) : (
          <img src={minus} className={s.minus} />
        )}
        <span>{props.worker.first_name + " " + props.worker.last_name + ' -> ' + props.worker.profession}</span>
      </p>
      {props.worker.children && (
        <List
          workers={props.worker.children}
          getNestedWorkers={props.getNestedWorkers}
          deleteNestedWorkers={props.deleteNestedWorkers}
        />
      )}
    </li>
  );
};

export default List;
