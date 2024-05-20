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
        blomToken = new BlomToken();
        blobme = new Blobme(address(blomToken));
        blomToken.setMinter(address(blobme));

        vm.deal(alice, 1 ether);
        vm.deal(bob, 1 ether);
    }

    function testEpoch() public {
        assertEq(block.number, 1);
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

        blobme.setRecipient(alice);

        advanceEpochs(1);

        vm.blobhashes(blobHashes);
        blobme.mine();

        advanceBlocks(1);

        vm.blobhashes(new bytes32[](0));
        vm.expectRevert("invalid blob hash");
        blobme.mine();

        assertEq(blobme.claimableReward(address(this)), 0);

        advanceEpochs(1);

        assertEq(blobme.claimableReward(address(this)), blobme.INITIAL_EPOCH_REWARD());

        blobme.claimReward(address(this));
        assertEq(blomToken.balanceOf(alice), blobme.INITIAL_EPOCH_REWARD());
        assertEq(blobme.claimableReward(address(this)), 0);

        vm.prank(bob);
        vm.blobhashes(blobHashes);
        blobme.mine();

        advanceBlocks(1);

        vm.prank(bob);
        vm.blobhashes(blobHashes);
        blobme.mine();

        vm.prank(alice);
        vm.blobhashes(blobHashes);
        blobme.mine();

        assertEq(blobme.claimableReward(alice), 0);
        assertEq(blobme.claimableReward(bob), 0);

        advanceEpochs(1);

        assertEq(blobme.claimableReward(alice), blobme.INITIAL_EPOCH_REWARD() / 3);
        assertEq(blobme.claimableReward(bob), (blobme.INITIAL_EPOCH_REWARD() / 3) * 2);
        assertEq(blobme.claimableReward(alice) + blobme.claimableReward(bob), blobme.INITIAL_EPOCH_REWARD());

        vm.prank(alice);
        blobme.claimReward(alice);
        vm.prank(bob);
        blobme.claimReward(bob);

        blobme.pause();
        vm.expectRevert();
        blobme.mine();

        blobme.unpause();
        blobme.mine();
    }

    function testHalvingEpochs() public {
        blobme.setStartEpoch(1);

        assertEq(blobme.nextHalvingEpoch(), 1 + blobme.HALVING_EPOCHS());

        advanceEpochs(blobme.HALVING_EPOCHS());
        assertEq(blobme.nextHalvingEpoch(), 1 + blobme.HALVING_EPOCHS());
        assertEq(blobme.epochReward(1), blobme.INITIAL_EPOCH_REWARD());

        advanceEpochs(1);
        assertEq(blobme.nextHalvingEpoch(), 1 + blobme.HALVING_EPOCHS() * 2);

        assertEq(blobme.epochReward(blobme.HALVING_EPOCHS()), blobme.INITIAL_EPOCH_REWARD());
        assertEq(blobme.epochReward(1 + blobme.HALVING_EPOCHS()), blobme.INITIAL_EPOCH_REWARD() / 2);
        assertEq(blobme.epochReward(blobme.HALVING_EPOCHS() * 2), blobme.INITIAL_EPOCH_REWARD() / 2);
        assertEq(blobme.epochReward(1 + blobme.HALVING_EPOCHS() * 2), blobme.INITIAL_EPOCH_REWARD() / 4);
        assertEq(blobme.epochReward(blobme.HALVING_EPOCHS() * 3), blobme.INITIAL_EPOCH_REWARD() / 4);
        assertEq(blobme.epochReward(blobme.HALVING_EPOCHS() * 4), blobme.INITIAL_EPOCH_REWARD() / 8);
    }

    function advanceBlocks(uint n) internal {
        uint blockInterval = 12;
        vm.roll(block.number + n);
        vm.warp(block.timestamp + blockInterval * n);
        console.log("block %s, time: %s, epoch: %s", block.number, block.timestamp, blobme.epoch());
    }

    function advanceEpochs(uint n) internal {
        uint blockInterval = 12;
        vm.roll(block.number + (n * blobme.EPOCH_SECONDS()) / blockInterval);
        vm.warp(block.timestamp + blobme.EPOCH_SECONDS() * n);
        console.log("block %s, time: %s, epoch: %s", block.number, block.timestamp, blobme.epoch());
    }
}
