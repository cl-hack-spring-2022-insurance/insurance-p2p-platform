import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import DeployNewWineInsurancePolicy from "../contracts/DeployNewWineInsurancePolicy.sol/DeployNewWineInsurancePolicy.json";
import InsureWine from "../contracts/InsureWine.sol/InsureWine.json";
import contractAddress from "../contract-address.json";

const DashBoardFullPage = styled.div`
  height: 800px;
  display:flex;
  justify-content: center;
  align-items: center;
`

const TableSpace = styled.div`
  width: 80%;
  height: 80%;
  border: 1px solid black;

  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding-bottom: 50px;
`

const TableCell = styled.td`
  border: 1px solid black;
`;

const TableHeader = styled.th`
  border: 1px solid black;
`;

export function Dashboard(){

  const navigate = useNavigate();

  const [mainContract, setMainContract] = useState(null);
  const [insurerPolicies, setInsurerPolicies] = useState([]);
  const [clientPolicies, setClientPolicies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress.DeployNewWineInsurancePolicy,
        DeployNewWineInsurancePolicy.abi,
        provider.getSigner(0)
      );
      const insurerPolicyAddresses = await contract.getInsurerPolicies();
      const clientPolicyAddresses = await contract.getClientPolicies();

      const insurerPolicies = await Promise.all(insurerPolicyAddresses.map(async policyAddress => {
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
          premium: utils.formatEther(premium.toString())
         }
      }));

      const clientPolicies =  await Promise.all(clientPolicyAddresses.map(async policyAddress => {
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
          premium: utils.formatEther(premium.toString())
         }
      }));
      setMainContract(contract);
      setInsurerPolicies(insurerPolicies);
      setClientPolicies(clientPolicies);
    }
    fetchData();
  }, []);

  async function handleUpdateState(){
    const tx = await mainContract.updateStateOfAllContracts();
    if (tx.hash !== null) {
      alert("The state of all contracts have been updated");
    }
  }

  return (
    <DashBoardFullPage>
      <TableSpace>

        <h1>Dashboard</h1>
        <button onClick={() => handleUpdateState()}>Update State of all Contracts</button>
        <hr />
        <h2>Insurer Policies</h2>
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
            {insurerPolicies.map((policy, i) => {
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
        <hr />
        <h2>Client Policies</h2>
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
            {clientPolicies.map((policy, i) => {
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
      </TableSpace>
    </DashBoardFullPage>
  )
}
