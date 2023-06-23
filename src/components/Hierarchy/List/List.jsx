import React from "react";
import arrow from "../../../assets/img/arrow.svg";
import minus from "../../../assets/img/minus.svg";
import s from "../Hierarchy.module.css";
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';

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

  // drag n drop
  const dragOverHandler = (e, ) => {
    e.preventDefault()
    // console.log(e)
  }
  const dragLeaveHandler = (e, ) => {
    if(e.target.tagName == "LI") {
      e.target.style.boxShadow = "none"
    } else {
      e.target.parentElement.boxShadow = "none"
    }
  }
  const dragStartHandler = (e, worker) => {
    console.log(worker)
  }
  const dragEndHandler = (e, ) => {
    if(e.target.tagName == "LI") {
      e.target.style.boxShadow = "none"
    } else {
      e.target.parentElement.boxShadow = "none"
    }
  }
  const dropHandler = (e, worker) => {
    console.log("DROP", worker)
    e.preventDefault()
  }

  

  return (
    <li
      draggable={true}
      onDragOver={e => dragOverHandler(e)}
      onDragLeave={e => dragLeaveHandler(e)}
      onDragStart={e => dragStartHandler(e, props.worker)}
      onDragEnd={e => dragEndHandler(e)}
      onDrop={e => dropHandler(e, props.worker)}

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
