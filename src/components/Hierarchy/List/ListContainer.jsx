import { connect } from "react-redux";
import List from "./List";
import {
  getGeneralWorkers,
  getNestedWorkers,
  deleteNestedWorkers
} from "../../../redux/hierarchyReducer";
import React from "react";

class ListContainer extends React.Component {
  componentDidMount() {
    this.props.getGeneralWorkers();
  }

  render() {
    return <List {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.hierarchy.workers,
  };
};

export default connect(mapStateToProps, {
  getGeneralWorkers,
  getNestedWorkers,
  deleteNestedWorkers
})(ListContainer);
