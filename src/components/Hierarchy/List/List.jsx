import React from "react";
import arrow from "../../../assets/img/arrow.svg";
import minus from "../../../assets/img/minus.svg";
import s from "../Hierarchy.module.css";
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';

const List = (props) => {
  return (
    <ol className={s.workers_list}>
      {props.workers.map((worker) => {
        return (
          <ListItem
            worker={worker}
            getNestedWorkers={props.getNestedWorkers}
            deleteNestedWorkers={props.deleteNestedWorkers}
            setDropId={props.setDropId} setDragId={props.setDragId}
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
    props.deleteNestedWorkers(props.worker.id);
  };


  // drag n drop
  const dragOverHandler = (e) => {
    e.preventDefault()
    if(e.target.tagName == "SPAN") {
      e.target.parentElement.style.boxShadow = "0px 4px 3px black"
    }
  }
  const dragLeaveHandler = (e, ) => {
    if(e.target.tagName == "SPAN") {
      e.target.parentElement.style.boxShadow = "none"
    }
  }
  const dragStartHandler = (e, workerId) => {
    props.setDragId(workerId)
  }
  const dragEndHandler = (e) => {
    if(e.target.tagName == "SPAN") {
      e.target.parentElement.style.boxShadow = "none"
    }
  }
  const dropHandler = (e, workerId) => {
    e.preventDefault()
    if(e.target.tagName == "SPAN") {
      e.target.parentElement.style.boxShadow = "none"
    }
    props.setDropId(workerId)
  }

  

  return (
    <li
      className={
        props.worker.haveChildren ? s.have_children : s.havent_children
      }
    >
      <p
        draggable={true}
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragStart={(e) => dragStartHandler(e, props.worker.id)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDrop={(e) => dropHandler(e, props.worker.id)}

        className={
          props.worker.children &&
          props.worker.children.length &&
          s.active_worker
        }
        onClick={
          props.worker.haveChildren &&
          !(props.worker.children && props.worker.children.length)
            ? onClickAppendData
            : props.worker.children && props.worker.children.length
            ? onClickDeleteData
            : undefined
        }
      >
        {props.worker.haveChildren ? (
          <img src={arrow} className={s.arrow} />
        ) : (
          <img src={minus} className={s.minus} />
        )}
        <span>
          {props.worker.first_name +
            " " +
            props.worker.last_name +
            " -> " +
            props.worker.profession}
        </span>
      </p>
      {props.worker.children && (
        <List
          workers={props.worker.children}
          getNestedWorkers={props.getNestedWorkers}
          deleteNestedWorkers={props.deleteNestedWorkers}
          setDropId={props.setDropId} setDragId={props.setDragId}
        />
      )}
    </li>
  );
};

export default List;
