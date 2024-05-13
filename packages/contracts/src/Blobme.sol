// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";
import "./BlomToken.sol";

/**
 * @dev Implementation of Blobme protocol allowing mining BLOM tokens
 * through sending EIP-4844 blob tx.
 */
contract Blobme is Ownable, Pausable {
    /**
     * @dev Emitted when a blob with hash `blobHash` is mined by `miner`.
     */
    event Mine(address indexed miner, bytes32 blobHash);

    /**
     * @dev Emitted when `value` tokens are claimed to `to` by `miner`.
     */
    event Claim(address indexed miner, address indexed to, uint256 value);

    struct User {
        address recipient;
        uint256 epoch;
        uint256 lastBlock;
        uint256 blobs;
    }

    struct Stats {
        uint256 epoch; // the epoch waiting for stats
        uint256 blobs; // accumulated blobs until epoch `epoch` - 1
        uint256 supply; // accumulated supply until epoch `epoch` - 1
    }

    uint256 public constant MAX_SUPPLY = 210000000000 * 1e18;
    uint256 public constant EPOCH_SECONDS = 10800; // 3 hours
    uint256 public constant HALVING_EPOCHS = 240; // halving every month
    uint256 public constant INITIAL_EPOCH_REWARD = 3456000000 * 1e18;

    BlomToken public immutable blomToken;

    uint256 public startEpoch;

    Stats public stats;
    mapping(uint256 /* epoch */ => uint256 /* blobs */) public epochStats;
    mapping(address => User) public users;

    mapping(bytes32 => bool) public blobHashes;

    constructor() Ownable(_msgSender()) {
        blomToken = new BlomToken();
    }

    /**
     * @dev Returns the current epoch in days.
     */
    function epoch() public view returns (uint256) {
        return block.timestamp / EPOCH_SECONDS;
    }

    /**
     * @dev Set the reward recipient of the miner.
     */
    function setRecipient(address recipient) external {
        users[_msgSender()].recipient = recipient;
    }

    /**
     * @dev Returns true if the contract is not paused, and the max supply is not reached yet.
     */
    function canMine() public view returns (bool) {
        return stats.supply + epochReward(epoch()) <= MAX_SUPPLY && !paused();
    }

    /**
     * @dev Mine a blob with some valid message, to earn reward.
     */
    function mine() external whenNotPaused {
        claimReward(_msgSender());

        _check();
        _mine();
    }

    function _mine() internal {
        // Allow mining only once per block.
        require(users[_msgSender()].lastBlock < block.number, "already mined in this block");

        // Check if you have committed a valid blob.
        bytes32 yourHash = blobhash(0);
        require(blobHashes[yourHash], "invalid blob hash");

        // Count the blob for user.
        users[_msgSender()].lastBlock = block.number;
        users[_msgSender()].blobs++;

        // Count the blob for the epoch.
        epochStats[epoch()]++;

        emit Mine(_msgSender(), yourHash);
    }

    function _check() internal {
        uint256 currentEpoch = epoch();
        require(startEpoch > 0 && currentEpoch >= startEpoch, "mining not started");

        // Stats.
        if (stats.epoch < currentEpoch) {
            if (stats.epoch > 0) {
                stats.blobs += epochStats[stats.epoch];
                stats.supply += epochReward(stats.epoch);
            }
            stats.epoch = currentEpoch;
        }

        // Ensure that the max supply is not approximately reached yet.
        require(stats.supply + epochReward(currentEpoch) <= MAX_SUPPLY, "max supply reached");
    }

    /**
     * @dev Returns the next halving epoch.
     */
    function nextHalvingEpoch() public view returns (uint256) {
        require(startEpoch > 0, "start epoch not set");
        uint256 pastEpochs = epoch() >= startEpoch ? epoch() - startEpoch : 0;
        return ((pastEpochs + HALVING_EPOCHS) / HALVING_EPOCHS) * HALVING_EPOCHS + startEpoch;
    }

    /**
     * @dev Returns the reward of the epoch.
     */
    function epochReward(uint256 epoch_) public view returns (uint256) {
        uint256 cycles = (epoch_ - startEpoch) / HALVING_EPOCHS;
        return INITIAL_EPOCH_REWARD / (2 ** cycles);
    }

    /**
     * @dev Claim reward of previous epoch.
     */
    function claimReward(address claimer) public {
        claimer = claimer == address(0) ? _msgSender() : claimer;

        uint256 currentEpoch = epoch();
        uint256 userEpoch = users[claimer].epoch;

        if (userEpoch >= currentEpoch) {
            // Only allow claiming reward of some previous epoch.
            return;
        }

        uint256 userBlobs = users[claimer].blobs;
        if (userEpoch > 0 && userBlobs > 0) {
            uint256 reward = _claimableReward(userEpoch, userBlobs);
            if (reward > 0) {
                address recipient = users[claimer].recipient;
                address mintTo = recipient == address(0) ? claimer : recipient;
                blomToken.mint(mintTo, reward);

                emit Claim(claimer, mintTo, reward);
            }

            // Reset the user counter.
            users[claimer].blobs = 0;
        }

        // Renew the user epoch.
        users[claimer].epoch = currentEpoch;
    }

    /**
     * @dev Returns the claimable reward of previous epoch.
     */
    function claimableReward(address claimer) public view returns (uint256) {
        claimer = claimer == address(0) ? _msgSender() : claimer;

        uint256 currentEpoch = epoch();
        uint256 userEpoch = users[claimer].epoch;
        uint256 userBlobs = users[claimer].blobs;
        if (userEpoch == 0 || userEpoch >= currentEpoch || userBlobs == 0) {
            return 0;
        }

        return _claimableReward(userEpoch, userBlobs);
    }

    function _claimableReward(uint256 userEpoch, uint256 userBlobs) internal view returns (uint256) {
        // Reward is proportional to the number of blobs you have mined in the epoch.
        uint256 epochBlobs = epochStats[userEpoch];
        assert(epochBlobs > 0);
        return (epochReward(userEpoch) * userBlobs) / epochBlobs;
    }

    /**
     * @dev Set the start epoch.
     */
    function setStartEpoch(uint256 startEpoch_) external onlyOwner {
        require(startEpoch == 0 || startEpoch > epoch(), "mining has started");
        require(startEpoch_ > epoch(), "start epoch can only be set in the future");
        startEpoch = startEpoch_;
    }

    /**
     * @dev Add or remove a blob hash of valid message blob.
     */
    function setBlobHash(bytes32 hash, bool valid) external onlyOwner {
        blobHashes[hash] = valid;
    }

    /**
     * @dev Pause the mining.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause the mining.
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
