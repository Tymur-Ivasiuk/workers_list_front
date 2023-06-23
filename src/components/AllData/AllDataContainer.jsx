import React from "react"
import { connect } from "react-redux"
import s from './AllData.module.css';
import AllData from "./AllData";
import {getAllWorkers} from '../../redux/allDataReducer';


class AllDatacontainer extends React.Component {
  componentDidMount() {
    this.props.getAllWorkers(this.props.currentPage)
  }

  onButtonClicked = () => {
    this.props.getAllWorkers(this.props.currentPage)
  }

  render() {
    return (
      <AllData {...this.props} onButtonClicked={this.onButtonClicked}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.allData.workers,
    currentPage: state.allData.currentPage,
    isFetching: state.allData.isFetching
  }
}

export default connect(mapStateToProps, {
  getAllWorkers
})(AllDatacontainer)