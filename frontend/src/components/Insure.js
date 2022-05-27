import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import { useNavigate } from "react-router-dom";

import styled from 'styled-components';

import DeployNewWineInsurancePolicy from "../contracts/DeployNewWineInsurancePolicy.sol/DeployNewWineInsurancePolicy.json";
import InsureWine from "../contracts/InsureWine.sol/InsureWine.json";
import contractAddress from "../contract-address.json";


const InsurePage = styled.div`
  height: 800px;

  display:flex;
  justify-content: center;
  align-items: center;
`

const InsureSpace = styled.div`
  height: 50%;
  width: 80%;
  border: 1px solid black;

  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding-top: 50px;
`

const TableCell = styled.td`
  border: 1px solid black;
`;

const TableHeader = styled.th`
  border: 1px solid black;
`;

export function Insure(){

  const navigate = useNavigate();

  const [insurancePolicies, setInsurancePolicies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress.DeployNewWineInsurancePolicy,
        DeployNewWineInsurancePolicy.abi,
        provider.getSigner(0)
      );
      const insurancePolicyAddresses = await contract.getInsurancePolicies();
      const insurancePolicies = await Promise.all(insurancePolicyAddresses.map(async policyAddress => {
        const insuranceContract = new ethers.Contract(
          policyAddress,
          InsureWine.abi,
          provider.getSigner(0)
        );
        const latitude = await insuranceContract.lat();
        const longitude = await insuranceContract.lon();
        const active = await insuranceContract.active();
        const amount = await insuranceContract.amount();
        const duration = await insuranceContract.duration();
        const premium = await insuranceContract.premium();
        return  {
          address: policyAddress,
          location: latitude + "," + longitude,
          active,
          amount: utils.formatEther(amount.toString()),
          duration: duration.toString(),
          premium : utils.formatEther(premium.toString())
         }
      })); 

      console.log(insurancePolicies);
      setInsurancePolicies(insurancePolicies);
    }
    fetchData();
  },[]);


  return (
    <InsurePage>
      <InsureSpace>
        <h1>Insurance Policies</h1>
        <table border="1">
          <thead>
            <tr>
              <TableHeader>Address</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Amount to cover</TableHeader>
              <TableHeader>Duration</TableHeader>
              <TableHeader>Grape Type</TableHeader>
              <TableHeader>Premium</TableHeader>
              <TableHeader>Active</TableHeader>
            </tr>
          </thead>
          <tbody>
            {insurancePolicies.map((policy, i) => {
              return (
                <tr key={i}>
                  <TableCell><a href="#" onClick={() => navigate("/insure/" + policy.address)}>{policy.address}</a></TableCell>
                  <TableCell><a href={ "https://www.google.com/maps/search/?api=1&query=" + policy.location} target="_blank">{policy.location}</a></TableCell>
                  <TableCell>{policy.amount} ETH</TableCell>
                  <TableCell>{policy.duration} seconds</TableCell>
                  <TableCell>Cabernet Sauvignon</TableCell>
                  <TableCell>{policy.premium} ETH</TableCell>
                  <TableCell>{policy.active ? "Yes" : "No"}</TableCell>
                </tr>
              )
            }) }
          </tbody>
        </table>
      </InsureSpace>
    </InsurePage>
    
  )
}
