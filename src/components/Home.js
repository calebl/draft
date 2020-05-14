import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const Home = ({text, history}) => {
  const viewCompose = ()=>{
    history.push("/compose")
  };

  const viewEdit = ()=>{
    history.push("/edit")
  };

  return (
    <div>
      <button onClick={viewCompose}>Compose</button>
      <button onClick={viewEdit}>Edit</button>
    </div>
  )
};

Home.propTypes = {
  text: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withRouter(Home);