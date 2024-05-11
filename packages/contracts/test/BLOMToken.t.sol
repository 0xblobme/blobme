// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";

import "src/BLOMToken.sol";

contract TestToken is Test {
  BLOMToken token;

  function setUp() public {
    token = new BLOMToken(address(1));
  }

  function testMint() public {
    vm.prank(address(1));
    token.mint(address(1), 100);
    assertEq(token.balanceOf(address(1)), 100);
  }
}
