pragma solidity ^0.8.9;
import "./wineinsurance.sol";

contract DeployNewWineInsurancePolicy {
    mapping(address => InsureWine) public Contracts;

    InsureWine public insurewine;

    function CreateNewPolicy(
        address _link,
        address _oracle,
        uint256 _amount,
        address _client,
        uint256 months,
        string memory _lat,
        string memory _lon
    ) external payable {
        insurewine = (new InsureWine){value: _amount}(
            _link,
            _oracle,
            _amount,
            _client,
            months,
            _lat,
            _lon
        );
        Contracts[address(insurewine)] = insurewine;
    }
}
