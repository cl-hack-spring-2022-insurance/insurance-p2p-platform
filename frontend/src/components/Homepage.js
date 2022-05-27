import React from "react";
import styled from "styled-components";

const FullHomePage = styled.div`
  height: 800px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const AboutSpace = styled.div`
  height: 70%;
  width: 80%;
`

const AboutTitle = styled.h1`
  color: #722F37;
`
const AboutPar = styled.p`
  font-size: 20px;
`
export function Homepage(){
  return (
    <FullHomePage>
      <AboutSpace>
        <AboutTitle>
          Parametric Wine Insurance
        </AboutTitle>
        <AboutPar>
          <br />
          Parametric insurance (also called index-based insurance) is a non-traditional insurance product that offers pre-specified payouts based upon a trigger event.
          Trigger events depend on the nature of the parametric policy and can include environmental 
          triggers such as wind speed and rainfall measurements, business-related triggers such as foot traffic, and more.
          <br />
          <br />
          This application allows the user (wine planter) to request a parametric insurance.  The user will then input parameters such as duration, 
          policy, amount total, and location (longitude and latitude) to be insured.  This will not require any on-chain process. 
          Then the insurer will see the request and call the DeployWineInsurance contract function to create a new wineinsurance contract and insert the parameters as specified by the wine owner.
        </AboutPar>
      </AboutSpace>
    </FullHomePage>
  )
}
