import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import DeployNewWineInsurancePolicy from "../contracts/DeployNewWineInsurancePolicy.sol/DeployNewWineInsurancePolicy.json";
import contractAddress from "../contract-address.json";

import styled from 'styled-components';


const ApplyPage = styled.div`
  height: 800px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  background-color: white;
  border: 1px solid black;
  width: 30%;
  height: 70%;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

`

const FormTitle = styled.h1`
  color: #722F37;
`

const FormField = styled.div`
  margin-bottom: 10px;
`;

const FormLabel = styled.label`
  display: inline-block;
  width: 200px;
`;

const SubmitButton = styled.button`
  background-color: #722F37;
  color: white;
  width: 120px;
`

export function Apply(){

  const navigate = useNavigate();

  const [mainContract, setMainContract] = useState(null);
  const [startMonth, setStartMonth]     = useState("2022-01");
  const [endMonth, setEndMonth]         = useState("2022-07");
  const [amount, setAmount]             = useState("0.01");
  const [latitude, setLatitude]         = useState("28.613939");
  const [longitude, setLongitude]       = useState("77.209021");
  const [client, setClient]             = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  
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

  async function applyForPolicy() {

    const startMonthDate = new Date(startMonth); 
    const endMonthDate = new Date(endMonth);
    const months = monthDifference(startMonthDate, endMonthDate);
    
    const tx = await mainContract.createNewPolicy(
      contractAddress.Link,
      contractAddress.Oracle,
      ethers.utils.parseEther(amount),
      client,
      months,
      latitude,
      longitude,
      {
        value: ethers.utils.parseEther(amount)
      }
    );
    console.log(tx);
    if (tx.hash !== null) {
      navigate("/dashboard");
    }
  }

  function monthDifference(d1, d2) {
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  return (
    <ApplyPage>
      <Form>
      <FormTitle>Register Wine Insurance</FormTitle>
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
          <FormField>
            <FormLabel htmlFor="client">Client (Address):</FormLabel>
            <input 
              id="client" 
              name="client" 
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              />
          </FormField>
      </fieldset>

        <FormField>
          <SubmitButton onClick={async() => await applyForPolicy()}>Apply</SubmitButton>
        </FormField>
      </Form>
    </ApplyPage>
  )
}
