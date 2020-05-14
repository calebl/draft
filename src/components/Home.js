import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";

const HomeContainer = styled.div`
`;

const Home = ({text, history}) => {
  return (
    <HomeContainer>
      <Link to="/compose">Start Writing</Link>
      <Link to="/edit">Edit</Link>
    </HomeContainer>
  )
};

Home.propTypes = {
  text: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withRouter(Home);