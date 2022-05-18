import React from "react";
import styled from 'styled-components';

import { Link } from "react-router-dom";

const NavContainer = styled.div`
  background-color: #722F37;
  border-bottom: 2px solid black;

  height: 100px;
  
  display: flex;
`;

const ProjectName = styled.div`
  width: 50%;

  display:flex;
  align-items: center;
  padding-left: 40px;

  color: white;
  font-size: 25px;
  text-shadow: 0 0 3px black, 0 0 5px black;
`

const ProjectUtil = styled.div`
  width: 50%;
  display:flex;
`;

const RouterSpace = styled.div`
  width: 50%;
  
  display:flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Routers = styled.div`
  padding: 0 4px;
  background-color:grey;
  
  font-size: 20px;
  color: white;
`;


const LoginSpace = styled.div`
  width: 50%;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginButton = styled.button`
  background-color: grey;
`



export function Navbar(){
  return (
    <NavContainer>
      <ProjectName>
        Parametric Wine Insurance
      </ProjectName>
      <ProjectUtil>
        <RouterSpace>
          <Routers>
            <Link to='/dashboard'>
              Dashboard
            </Link>
          </Routers>
          <Routers>
            <Link to='/apply'>
              Apply
            </Link>
          </Routers>
          <Routers>
            <Link to='/insure'>
              Insure
            </Link>
          </Routers>
        </RouterSpace>
        <LoginSpace>
          <LoginButton>
            login
          </LoginButton>
        </LoginSpace>
      </ProjectUtil>
    </NavContainer>
  )
}
