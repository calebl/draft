import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: gray;
  
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Home = ({text, history}) => {
  return (
    <HomeContainer>
      <Link to="/compose">Write</Link>
      <Link to="/edit">Edit</Link>
    </HomeContainer>
  )
};

Home.propTypes = {
  text: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withRouter(Home);