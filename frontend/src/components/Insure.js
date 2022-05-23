import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import DeployNewWineInsurancePolicy from "../contracts/DeployNewWineInsurancePolicy.sol/DeployNewWineInsurancePolicy.json";
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
      const insurancePolicies = await contract.getInsurancePolicies();
      console.log(insurancePolicies);
      setInsurancePolicies(insurancePolicies);
    }
    fetchData();
  },[]);

  
  

  return (
    <div>
      Insure
    </div>
    
  )
}
