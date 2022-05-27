import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import { useNavigate, useParams } from "react-router-dom";

import styled from 'styled-components';

import InsureWine from "../contracts/InsureWine.sol/InsureWine.json";

const InsurePolicyPage = styled.div`
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
  width: 60%;
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

export function InsurePolicy(){

  const { address } = useParams();
  
  const navigate = useNavigate();

  const [insurancePolicy, setInsurancePolicy] = useState([]);
  const [duration, setDuration]         = useState(0);
  const [amount, setAmount]             = useState("");
  const [latitude, setLatitude]         = useState("");
  const [longitude, setLongitude]       = useState("");
  const [premium, setPremium]           = useState("");
  const [active, setActive]             = useState(false);


  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const insuranceContract = new ethers.Contract(
        address,
        InsureWine.abi,
        provider.getSigner(0)
      );
      
      const latitude = await insuranceContract.lat();
      const longitude = await insuranceContract.lon();
      const active = await insuranceContract.active();
      const amount = await insuranceContract.amount();
      const duration = await insuranceContract.duration();
      const premium = await insuranceContract.premium();

      setInsurancePolicy(insuranceContract);
      setDuration(duration.toString());
      setAmount(utils.formatEther(amount.toString()));
      setLatitude(latitude);
      setLongitude(longitude);
      setActive(active);
      setPremium(utils.formatEther(premium.toString()));

    }
    fetchData();
  },[]);

  async function handlePayPremium(){
      const tx = await insurancePolicy.payPremium(
        {
          value: ethers.utils.parseEther(premium)
        }
      );
      console.log(tx);
      if (tx.hash !== null) {
        alert("Premium paid");
        navigate("/dashboard");
      }
  }


  return (
    <>
      <InsurePolicyPage>
        <Form>
          <fieldset>
            <legend>Policy Data for {address}</legend>
              <FormField>
                <FormLabel>Coordinates:</FormLabel>
                {longitude}, {latitude}
              </FormField>
              <FormField>
                <FormLabel>Amount:</FormLabel>
                {amount} ETH
              </FormField>
              <FormField>
                <FormLabel>Premium:</FormLabel>
                {premium} ETH
              </FormField>
              <FormField>
                <FormLabel>Duration:</FormLabel>
                {duration} seconds
              </FormField>
              <FormField>
                <FormLabel>Active:</FormLabel>
                {active ? "Yes" : "No"}
              </FormField>
          </fieldset>
        <FormField>
          <SubmitButton onClick={async() => await handlePayPremium()}>Pay Premium</SubmitButton>
        </FormField>
        </Form>
      </InsurePolicyPage>
    </>
    
  )
}
