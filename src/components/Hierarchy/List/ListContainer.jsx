import { connect } from "react-redux";
import List from "./List";
import {
  getGeneralWorkers,
  getNestedWorkers,
  deleteNestedWorkers,
  setDropId,
  setDragId,
  updateWorker
} from "../../../redux/hierarchyReducer";
import React from "react";

class ListContainer extends React.Component {
  componentDidMount() {
    this.props.getGeneralWorkers();
  }

  componentDidUpdate() {
    if((this.props.dragId!==null && this.props.dropId!==null) && this.props.dragId !== this.props.dropId){
      this.props.updateWorker(this.props.dragId, this.props.dropId)
    }
  }

  render() {
    return <List {...this.props} setDropId={this.props.setDropId} setDragId={this.props.setDragId} />;
  }
}



const mapStateToProps = (state) => {
  return {
    workers: state.hierarchy.workers,
    dragId: state.hierarchy.dragId,
    dropId: state.hierarchy.dropId,
  };
};

export default connect(mapStateToProps, {
  getGeneralWorkers,
  getNestedWorkers,
  deleteNestedWorkers,
  setDropId,
  setDragId,
  updateWorker
})(ListContainer);
