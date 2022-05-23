#!/usr/bin/env bash
if [ ! -f ../.env ]
then
  export $(cat .env | xargs)
fi

# Read the contract name
echo Which contract do you want to deploy \(eg Greeter\)?
read contract

# Read the constructor arguments
echo Enter constructor arguments separated by spaces \(eg 1 2 3\). Press Enter if the constructor has no arguments:
read -ra args

if [ -z "$args" ]
then
    forge create ./src/${contract}.sol:${contract} -i --private-key ${ETH_FROM_PK} --rpc-url "http://localhost:8545" --out ./frontend/src/contracts
else 
    forge create ./src/${contract}.sol:${contract} -i --private-key ${ETH_FROM_PK} --rpc-url "http://localhost:8545" --constructor-args ${args} --out ./frontend/src/contracts
fi