import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import DeployNewWineInsurancePolicy from "../contracts/DeployNewWineInsurancePolicy.sol/DeployNewWineInsurancePolicy.json";
import InsureWine from "../contracts/InsureWine.sol/InsureWine.json";
import contractAddress from "../contract-address.json";

export function Insure(){

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
        return  {
          address: policyAddress,
          location: latitude + "," + longitude,
          active
         }
      })); 

      console.log(insurancePolicies);
      setInsurancePolicies(insurancePolicies);
    }
    fetchData();
  },[]);

  
  

  return (
    <>
      <h1>Insurance Policies</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Address</th>
            <th>Location</th>
            <th>Amount to cover</th>
            <th>Duration</th>
            <th>Grape Type</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {insurancePolicies.map((policy, i) => {
            return (
              <tr key={i}>
                <td>{policy.address}</td>
                <td>{policy.location}</td>
                <td>Amount to cover</td>
                <td>Duration</td>
                <td>Cabernet Sauvignon</td>
                <td>{policy.active ? "Yes" : "No"}</td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    </>
    
  )
}
