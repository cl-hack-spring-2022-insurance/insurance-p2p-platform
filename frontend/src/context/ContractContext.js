import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const ContractContext = React.createContext();

const { ethereum } = window;

export const ContractProvider = function({ children }){
    const [currentAccount, setCurrentAccount] = useState("");
    const checkIfWalletIsConnected = async function(){
        // this function automatically tells user to connect wallet
        try {
            if(!ethereum) return alert ("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length){
                setCurrentAccount(accounts[0])
            } else {
                console.log('No accounts found')
            }
        } catch (error) {
            throw new Error('No ethereum object.')
        }
    }

    const connectWallet = async function(){
        // this function connect metamask wallet with this app
        console.log('here')
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected(); // auto call function once on starting
    },[])


    return(
        <ContractContext.Provider value={{
            connectWallet,
            currentAccount
        }}>
            {children}
        </ContractContext.Provider>
    );
}