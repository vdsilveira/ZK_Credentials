// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CredentialsData} from "../src/CredentialsData.sol";

contract CredentialsDataS_cript is Script {
    CredentialsData public credentialsData;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        credentialsData = new CredentialsData();

        vm.stopBroadcast();
    }
}
