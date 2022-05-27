# p2p Insurance Platform

This repo is based on the [Chainlink Foundry Starter Kit](https://github.com/smartcontractkit/foundry-starter-kit)

- [p2p Insurance Platform](#p2p-insurance-platform)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Getting Started / Quickstart](#getting-started--quickstart)
  - [Testing](#testing)
- [Deploying to a network](#deploying-to-a-network)
  - [Local blockchain](#local-blockchain)
- [Running the frontend](#running-the-frontend)
  - [Contract addresses](#contract-addresses)
  - [Start the frontend](#start-the-frontend)
- [Contributing](#contributing)
- [Thank You!](#thank-you)
  - [Resources](#resources)

# How it works
- We are using Accuweather Oracles to get current temperature for a given location. 
The insurer deploys a new policy by inserting the relevant parameters like policy amount, client address, location .
Then the insurer needs to call updateStatus() function every day and store the temperature under a basic set of rules. We only record the temperature if it is between march to september as its crucial season for wine owners. 
- If the total temerature recorded between march to september exceeds 2700 C or it is below 2200 C , we will pay the wine owner ie client the damages by transferring the whole policy amount to the policy holder. 
- If there is no claim and the policy has expired , we check if the insurer made calls to the oracle everyday , and then return his funds to him and the premium to the policholder.

- But if the insurer failed to fulfill his job of calling the oracle everyday, we'll pay the policy holder twice the amount he paid as premium by deducting funds from the insurer's balance. This is like a penalty for negligence on the part of the insurer.

- If the policy holder does not pay the premium on time, Anyone can call the forfeiture function and the entire balance of the contract (including premium ) will be sent to the insurer.(We can certainly add some forfeiture fees which will be given to the forfeiture function caller like what happens in liquidation).  



# Installation

## Requirements

-   [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (version 2.36.1 or above)
-   [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
-   [Foundry / Foundryup](https://github.com/gakonst/foundry)
-   [Nix](https://nix.dev/tutorials/install-nix)
And you probably already have `make` installed... but if not [try looking here.](https://askubuntu.com/questions/161104/how-do-i-install-make)

## Getting Started / Quickstart

```sh
git clone https://github.com/cl-hack-spring-2022-insurance/insurance-p2p-platform.git
cd insurance-p2p-platform
make # This installs the project's dependencies.
make test
```

## Testing

```
make test
```

or

```
forge test
```

# Deploying to a network

## Local blockchain

1. Start a local Hardhat blockchain by running the command:

```
make local-node 
```

2. Run the local deployment script:

```
bash scripts/deploy_local.sh
```

You'll be prompted for the following:

```
Which contract do you want to deploy (eg Greeter)?
Enter constructor arguments separated by spaces (eg 1 2 3). Press Enter if the constructor has no arguments:

compiling...
success.
```

Full Example:

```
bash scripts/deploy_local.sh

Enter Your Rinkeby RPC URL:
https://eth-rinkeby.alchemyapi.io/v2/XXXXXX

Which contract do you want to deploy (eg Greeter)?
PriceFeedConsumer

Enter constructor arguments separated by spaces (eg 1 2 3):
0x8A753747A1Fa494EC906cE90E9f37563A8AF630e

Deployer: 0x643315c9be056cdea171f4e7b2222a4ddab9f88d
Deployed to: 0xec8af3f6c8725cc60e6ecc0009ad9e756e9723e0
```

# Running the frontend

The React frontend code can be located in the `frontend/` folder.

## Contract addresses

*Important*: Before running the frontend it is important to specify the contract addresses in the `frontend/src/contract-address.json`. 
The file is a JSON that has the contract names as key and the addresses as value.

## Start the frontend

You can start the frontend by running the command:

```
make frontend
```

# Contributing

Contributions are always welcome! Open a PR or an issue!

# Thank You!

## Resources

-   [Chainlink Documentation](https://docs.chain.link/)
-   [Foundry Documentation](https://onbjerg.github.io/foundry-book/)
