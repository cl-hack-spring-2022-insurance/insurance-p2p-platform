import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import styled from 'styled-components';

import DeployNewWineInsurancePolicy from "../contracts/DeployNewWineInsurancePolicy.sol/DeployNewWineInsurancePolicy.json";
import InsureWine from "../contracts/InsureWine.sol/InsureWine.json";
import contractAddress from "../contract-address.json";

const TableCell = styled.td`
  border: 1px solid black;
`;

const TableHeader = styled.th`
  border: 1px solid black;
`;

export function Dashboard(){
  
  const [mainContract, setMainContract] = useState(null);
  const [insurancePolicies, setInsurancePolicies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress.DeployNewWineInsurancePolicy,
        DeployNewWineInsurancePolicy.abi,
        provider.getSigner(0)
      );
      const insurancePolicyAddresses = await contract.getUserInsurancePolicies();
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
        return  {
          address: policyAddress,
          location: latitude + "," + longitude,
          active,
          amount: utils.formatEther(amount.toString()),
          duration: duration.toString()
         }
      }));
      setMainContract(contract);
      setInsurancePolicies(insurancePolicies);
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
    <>
      <h1>Dashboard</h1>
      <button onClick={() => handleUpdateState()}>Update State of all Contracts</button>
      <hr />
      <h2>My Insurance Policies</h2>
      <table border="1">
        <thead>
          <tr>
            <TableHeader>Address</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Amount to cover</TableHeader>
            <TableHeader>Duration</TableHeader>
            <TableHeader>Grape Type</TableHeader>
            <TableHeader>Active</TableHeader>
          </tr>
        </thead>
        <tbody>
          {insurancePolicies.map((policy, i) => {
            return (
              <tr key={i}>
                <TableCell>{policy.address}</TableCell>
                <TableCell><a href={ "https://www.google.com/maps/search/?api=1&query=" + policy.location} target="_blank">{policy.location}</a></TableCell>
                <TableCell>{policy.amount} ETH</TableCell>
                <TableCell>{policy.duration} seconds</TableCell>
                <TableCell>Cabernet Sauvignon</TableCell>
                <TableCell>{policy.active ? "Yes" : "No"}</TableCell>
              </tr>
            )
          }) }
        </tbody>
      </table>
    </>
  )
}
