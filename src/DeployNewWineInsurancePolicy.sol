// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./InsureWine.sol";

contract DeployNewWineInsurancePolicy {

    address[] public insurancePolicies;
    mapping(address => address[]) public insurancePolicyOwnerships;

    function createNewPolicy(
        address _link,
        address _oracle,
        uint256 _amount,
        uint256 months,
        string memory _lat,
        string memory _lon
    ) external payable {
        InsureWine insurewine = (new InsureWine){value: _amount}(
            _link,
            _oracle,
            _amount, 
            msg.sender,
            months,
            _lat,
            _lon
        );
        address insurancePolicyAddress = address(insurewine);
        insurancePolicies.push(insurancePolicyAddress);
        insurancePolicyOwnerships[msg.sender].push(insurancePolicyAddress);
    }

    function getInsurancePolicies() public view returns(address[] memory) {
        return insurancePolicies;
    }
}
