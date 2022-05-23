import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import DeployNewWineInsurancePolicy from "../contracts/DeployNewWineInsurancePolicy.sol/DeployNewWineInsurancePolicy.json";
import contractAddress from "../contract-address.json";

import styled from 'styled-components';

const FormField = styled.div`
  margin-bottom: 10px;
`;

const FormLabel = styled.label`
  display: inline-block;
  width: 200px;
`;


export function Apply(){

  //28.613939,77.209021
  const [mainContract, setMainContract] = useState(null);
  const [startMonth, setStartMonth]     = useState("2022-01");
  const [endMonth, setEndMonth]         = useState("2022-07");
  const [amount, setAmount]             = useState("0.01");
  const [latitude, setLatitude]         = useState("28.613939");
  const [longitude, setLongitude]       = useState("77.209021");
  
  useEffect(() => {
    async function fetchContract() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress.DeployNewWineInsurancePolicy,
        DeployNewWineInsurancePolicy.abi,
        provider.getSigner(0)
      );
      setMainContract(contract);
    }
    fetchContract();
  }, []);

  function applyForPolicy() {

    const startMonthDate = new Date(startMonth); 
    const endMonthDate = new Date(endMonth);
    const months = monthDifference(startMonthDate, endMonthDate);

    mainContract.createNewPolicy(
      contractAddress.Link,
      contractAddress.Oracle,
      ethers.utils.parseEther(amount),
      months,
      latitude,
      longitude,
      {
        value: ethers.utils.parseEther(amount)
      }
    );
  }

  function monthDifference(d1, d2) {
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  return (
    <>
      <fieldset>
        <legend>Policy Data</legend>
        <p>Submit the data of the grape insurance you'd like to apply for</p>

        <FormField>
          <FormLabel htmlFor="start_month">Start month: </FormLabel>
          <input 
            id="start_month" 
            name="start_month" 
            type="month" 
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)} 
            />
        </FormField>

        <FormField>
          <FormLabel htmlFor="end_month">End month: </FormLabel>
          <input 
            id="end_month" 
            name="end_month" 
            type="month" 
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)} />
        </FormField>

        <FormField>
          <FormLabel htmlFor="amount">Amount to cover: </FormLabel>
          <input 
            id="amount" 
            name="amount" 
            type="number" 
            placeholder="ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
        </FormField>

        <FormField>
          <FormLabel htmlFor="amount">Grape type:</FormLabel>
          <select disabled>
              <option>Cabernet Sauvignon</option>
          </select>
        </FormField>

        <FormField>
          <FormLabel htmlFor="latitude">Location (latitude):</FormLabel>
          <input 
            id="latitude" 
            name="latitude" 
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            />
        </FormField>

        <FormField>
          <FormLabel htmlFor="longitude">Location (longitude):</FormLabel>
          <input 
            id="longitude" 
            name="longitude" 
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            />
        </FormField>
      </fieldset>

      <FormField>
        <button onClick={() => applyForPolicy()}>Apply</button>
      </FormField>
    </>
  )
}
