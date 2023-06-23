import "./App.css";
import { Route, Routes } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect } from "react-redux";
import HierarchyContainer from "./components/Hierarchy/HierarchyContainer";
import AllDataContainer from "./components/AllData/AllDataContainer";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <HeaderContainer />

      <main>
        <Routes>
          <Route path="/hierarchy" element={<HierarchyContainer />} />
          <Route path="/alldata" element={<AllDataContainer />}/>
        </Routes>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, {})(App);
