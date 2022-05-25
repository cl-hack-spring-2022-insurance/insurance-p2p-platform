import React from "react";
import { useState, useContext } from "react";
import styled from 'styled-components';
import { ContractContext } from '../context/ContractContext';
import { shortenAddress } from "./utils/shortenAddress";
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
  width: 60%;
  
  display:flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Routers = styled.div`
  padding: 0 4px;  
  font-size: 20px;
  color: black;
  
`;


const LoginSpace = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginButton = styled.button`
  background-color: #white;
  border-radius: 10px;
`



export function Navbar(){
  const { connectWallet, currentAccount } = useContext(ContractContext);
  return (
    <NavContainer>
      <ProjectName>
        <Link to='/' style={{textDecoration: 'none', color: '#FFF'}}>
          Parametric Wine Insurance
        </Link>
      </ProjectName>
      <ProjectUtil>
        <RouterSpace>
          <Routers>
            <Link to='/dashboard' style={{color: '#FFF'}}>
              Dashboard
            </Link>
          </Routers>
          <Routers>
            <Link to='/apply' style={{color: '#FFF'}}>
              Apply
            </Link>
          </Routers>
          <Routers>
            <Link to='/insure' style={{color: '#FFF'}}>
              Insure
            </Link>
          </Routers>
        </RouterSpace>
        <LoginSpace>
          {!currentAccount && // if there is a metamask acc connected dont render button
            <LoginButton
              onClick={connectWallet}
            >
              Connect
            </LoginButton>
          }
          {currentAccount && // if there is a metamask acc display address 
            <LoginButton>
              {shortenAddress(currentAccount)}
            </LoginButton>
          }
        </LoginSpace>
      </ProjectUtil>
    </NavContainer>
  )
}
