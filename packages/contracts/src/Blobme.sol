// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

interface IErc20Mint {
    function mint(address account, uint256 value) external;
}

/**
 * @dev Implementation of Blobme protocol allowing mining BLOM tokens
 * through sending EIP-4844 blob tx.
 */
contract Blobme is Ownable, Pausable {
    event Mine(address indexed miner, bytes32 blobHash);
    event Claim(address indexed miner, address indexed to, uint256 value);

    struct UserCounter {
        uint256 epoch;
        uint256 lastBlock;
        uint256 blobs;
    }

    struct Stats {
        uint256 epoch;
        uint256 blobs;
        uint256 supply;
    }

    uint256 public constant MAX_SUPPLY = 210000000000 * 1e18;
    uint256 public constant EPOCH_SECONDS = 10800; // 3 hours
    uint256 public constant HALVING_EPOCHS = 240; // halving every month

    address public immutable blomToken;

    uint256 public epochReward = 3456000000 * 1e18;

    uint256 public startEpoch;
    uint256 public nextHalvingEpoch;

    Stats public stats;
    mapping(uint256 /* epoch */ => uint256 /* blobs */) public epochCounter;
    mapping(address => UserCounter) public userCounter;

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
        return block.timestamp / EPOCH_SECONDS;
    }

    /**
     * @dev Mine a blob with some valid message, to earn reward.
     */
    function mine(address to) external whenNotPaused {
        claimReward(to);
        _check();
        _mine();
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

        emit Mine(_msgSender(), yourHash);
    }

    function _check() internal {
        uint256 currentEpoch = epoch();
        // Stats.
        if (stats.epoch < currentEpoch) {
            if (stats.epoch > 0) {
                stats.blobs += epochCounter[stats.epoch];
                stats.supply += epochReward;
            }
            stats.epoch = currentEpoch;
        }

        // Check halving.
        if (currentEpoch >= nextHalvingEpoch) {
            epochReward /= 2;
            nextHalvingEpoch += HALVING_EPOCHS;
        }

        // Ensure that the max supply is approximately reached.
        require(stats.supply + epochReward <= MAX_SUPPLY, "max supply reached");
    }

    /**
     * @dev Claim reward of previous epoch.
     */
    function claimReward(address to) public {
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
            uint256 reward = _claimableReward(userEpoch, userBlobs);
            address mintTo = to == address(0) ? _msgSender() : to;
            IErc20Mint(blomToken).mint(mintTo, reward);

            emit Claim(_msgSender(), mintTo, reward);

            // Reset the user counter.
            userCounter[_msgSender()].blobs = 0;
        }
    }

    /**
     * @dev Returns the claimable reward of previous epoch.
     */
    function claimableReward() public view returns (uint256) {
        uint256 currentEpoch = epoch();
        uint256 userEpoch = userCounter[_msgSender()].epoch;
        uint256 userBlobs = userCounter[_msgSender()].blobs;
        if (userEpoch == 0 || userEpoch >= currentEpoch || userBlobs == 0) {
            return 0;
        }

        return _claimableReward(userEpoch, userBlobs);
    }

    function _claimableReward(uint256 userEpoch, uint256 userBlobs) internal view returns (uint256) {
        uint256 _epochReward = epochReward;
        if (userEpoch < nextHalvingEpoch - HALVING_EPOCHS) {
            // If the user has mined in some past epoch before halving,
            // then the reward should be the same as the past epoch.
            _epochReward = epochReward * 2;
        }

        // Reward is proportional to the number of blobs you have mined in the epoch.
        uint256 epochBlobs = epochCounter[userEpoch];
        return (_epochReward * userBlobs) / epochBlobs;
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
