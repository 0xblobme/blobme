// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";

import "src/BlomToken.sol";

contract TestBlomToken is Test {
    BlomToken token;

    function setUp() public {
        token = new BlomToken(address(this));
    }

    function testMint() public {
        token.mint(address(this), 100);
        assertEq(token.balanceOf(address(this)), 100);
    }
}
