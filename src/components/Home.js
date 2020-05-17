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
  background: ${props => props.theme.lightgray};
  
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const StyledLink = styled(Link)`
  border: 2px solid ${props => props.theme.purple};
  color: ${props => props.theme.purple};
  font-weight: bold;
  
  border-radius: 5px;
  width: 200px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover, &:active {
    text-decoration: none;
    
    color: ${props => props.theme.lightgray};
    background-color: ${props => props.theme.purple};
  }
`;

const Home = ({text, history}) => {
  return (
    <HomeContainer>
      <StyledLink to="/compose">Start New Session</StyledLink>
    </HomeContainer>
  )
};

Home.propTypes = {
  text: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withRouter(Home);