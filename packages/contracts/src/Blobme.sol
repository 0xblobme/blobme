// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

interface IErc20Mint {
  function mint(address account, uint256 value) external;
}

contract Blobme is Ownable {
  struct BlobCounter {
    uint256 epoch;
    uint256 lastBlock;
    uint256 blobs;
  }

  uint256 public constant MAX_SUPPLY = 210000000000 * 1e18;
  uint256 public constant HALVING_EPOCHS = 365 * 4; // halving every 4 years

  address public immutable blomToken;

  uint256 public epochReward = 72000000 * 1e18;

  uint256 public startEpoch;
  uint256 public nextHalvingEpoch;

  mapping(uint256 /* epoch */ => uint256 /* blobs */) public epochCounter;
  mapping(address => BlobCounter) public userCounter;

  mapping(bytes32 => bool) public blobHashes;

  constructor(address blomToken_, uint256 startEpoch_) Ownable(_msgSender()) {
    blomToken = blomToken_;
    startEpoch = startEpoch_;
    nextHalvingEpoch = startEpoch + HALVING_EPOCHS;
  }

  /**
   * @dev Returns the current epoch in days.
   */
  function epoch() public view returns (uint256) {
    return block.timestamp / 86400;
  }

  /**
   * @dev Mine a blob with some valid message, to earn reward.
   */
  function mine() external {
    claimReward();
    _checkHalving();
    _mine();
  }

  /**
   * @dev Claim reward.
   */
  function claimReward() public {
    uint256 currentEpoch = epoch();
    uint256 userEpoch = userCounter[_msgSender()].epoch;

    if (userEpoch >= currentEpoch) {
      // Only allow claiming reward of some previous epoch.
      return;
    }

    // Renew the user epoch.
    userCounter[_msgSender()].epoch = currentEpoch;

    if (userEpoch == 0) {
      // Have not mined yet.
      return;
    }

    uint256 userBlobs = userCounter[_msgSender()].blobs;
    if (userBlobs > 0) {
      uint256 _epochReward = epochReward;
      if (userEpoch < nextHalvingEpoch - HALVING_EPOCHS) {
        // If the user has mined in some past epoch before halving,
        // then the reward should be the same as the past epoch.
        _epochReward = epochReward * 2;
      }

      // Reward is proportional to the number of blobs you have mined in the epoch.
      uint256 epochBlobs = epochCounter[userEpoch];
      uint256 reward = (_epochReward * userBlobs) / epochBlobs;
      IErc20Mint(blomToken).mint(_msgSender(), reward);

      // Reset the user counter.
      userCounter[_msgSender()].blobs = 0;
    }
  }

  function _checkHalving() internal {
    if (epoch() >= nextHalvingEpoch) {
      epochReward /= 2;
      nextHalvingEpoch += HALVING_EPOCHS;
    }
  }

  function _mine() internal {
    // Allow mining only once per block.
    require(userCounter[_msgSender()].lastBlock < block.number, "already mined in this block");

    // Check if you have committed a valid blob.
    bytes32 yourHash = blobhash(0);
    require(blobHashes[yourHash], "invalid blob hash");

    // Count the blob for user.
    userCounter[_msgSender()].lastBlock = block.number;
    userCounter[_msgSender()].blobs++;

    // Count the blob for the epoch.
    epochCounter[epoch()]++;
  }

  /**
   * @dev Set the start epoch.
   */
  function setStartEpoch(uint256 startEpoch_) external onlyOwner {
    require(startEpoch > epoch(), "has started");
    require(startEpoch_ > epoch(), "start epoch can only be set in the future");
    startEpoch = startEpoch_;
    nextHalvingEpoch = startEpoch + HALVING_EPOCHS;
  }

  /**
   * @dev Add or remove a blob hash of valid message blob.
   */
  function setBlobHash(bytes32 hash, bool valid) external onlyOwner {
    blobHashes[hash] = valid;
  }
}
