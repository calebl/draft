import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  position: absolute;
  top: 10px;
  right: 10px;
  left: 10px;
  bottom: 10px;
`;

export const HeaderContainer = styled.div`
  height: 30px;
  width: 100%;
  text-align: left;
  
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

export const Title = styled.h3`
  margin-top: 0;
  color: ${props => props.theme.purple}
`;