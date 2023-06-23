import { connect } from "react-redux";
import Hierarchy from "./Hierarchy";
import React from "react";
import {setDropId} from "../../redux/hierarchyReducer";

class HierarchyContainer extends React.Component {
  render() {
    return <Hierarchy {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.hierarchy.workers,
  };
};

export default connect(mapStateToProps, {
  setDropId
})(HierarchyContainer);
