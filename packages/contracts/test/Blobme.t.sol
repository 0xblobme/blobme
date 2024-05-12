// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";

import "src/Blobme.sol";

contract TestBlobme is Test {
    Blobme blobme;
    BlomToken blomToken;

    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public {
        blobme = new Blobme();
        blomToken = blobme.blomToken();

        vm.deal(alice, 1 ether);
        vm.deal(bob, 1 ether);
    }

    function testEpoch() public {
        assertEq(block.timestamp, 1);
        assertEq(blobme.epoch(), 0);

        vm.warp(blobme.EPOCH_SECONDS());
        assertEq(blobme.epoch(), 1);
    }

    function testSetStartEpoch() public {
        vm.expectRevert();
        blobme.setStartEpoch(0);

        blobme.setStartEpoch(1);
        blobme.setStartEpoch(2);

        vm.warp(blobme.EPOCH_SECONDS());
        assertEq(blobme.epoch(), 1);

        vm.expectRevert();
        blobme.setStartEpoch(1);

        blobme.setStartEpoch(2);

        vm.warp(blobme.EPOCH_SECONDS() * 2);

        vm.expectRevert();
        blobme.setStartEpoch(3);
    }

    function testSetBlobHash() public {
        bytes32[] memory blobHashes = new bytes32[](1);
        blobHashes[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000001);

        blobme.setBlobHash(blobHashes[0], true);
    }

    function testMine() public {
        bytes32[] memory blobHashes = new bytes32[](1);
        blobHashes[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000001);

        blobme.setBlobHash(blobHashes[0], true);

        blobme.setStartEpoch(1);

        vm.warp(blobme.EPOCH_SECONDS());

        vm.blobhashes(blobHashes);
        blobme.mine(address(alice));

        vm.roll(2);
        vm.blobhashes(new bytes32[](0));
        vm.expectRevert("invalid blob hash");
        blobme.mine(address(alice));
    }
}
