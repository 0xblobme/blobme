// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/Blobme.sol";

contract DeployBlobme is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        BlomToken blomToken = new BlomToken();
        Blobme blobme = new Blobme(address(blomToken));
        blomToken.setMinter(address(blobme));

        vm.stopBroadcast();
    }
}
