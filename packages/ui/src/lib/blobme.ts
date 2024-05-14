import {
    createUseReadContract,
    createUseWriteContract,
    createUseSimulateContract,
    createUseWatchContractEvent,
} from 'wagmi/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Blobme
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const blobmeAbi = [
    {
        stateMutability: 'nonpayable',
        type: 'constructor',
        inputs: [{ name: 'blomToken_', internalType: 'address', type: 'address' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'EPOCH_SECONDS',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'HALVING_EPOCHS',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'INITIAL_EPOCH_REWARD',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'MAX_SUPPLY',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
        name: 'blobHashes',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'blomToken',
        outputs: [{ name: '', internalType: 'contract BlomToken', type: 'address' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'canMine',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [{ name: 'claimer', internalType: 'address', type: 'address' }],
        name: 'claimReward',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: 'claimer', internalType: 'address', type: 'address' }],
        name: 'claimableReward',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'epoch',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: 'epoch_', internalType: 'uint256', type: 'uint256' }],
        name: 'epochReward',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        name: 'epochStats',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'mine', outputs: [] },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'nextHalvingEpoch',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
    },
    { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'pause', outputs: [] },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'paused',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    },
    { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'renounceOwnership', outputs: [] },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
            { name: 'valid', internalType: 'bool', type: 'bool' },
        ],
        name: 'setBlobHash',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
        name: 'setRecipient',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [{ name: 'startEpoch_', internalType: 'uint256', type: 'uint256' }],
        name: 'setStartEpoch',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'startEpoch',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'stats',
        outputs: [
            { name: 'epoch', internalType: 'uint256', type: 'uint256' },
            { name: 'blobs', internalType: 'uint256', type: 'uint256' },
            { name: 'supply', internalType: 'uint256', type: 'uint256' },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
    },
    { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'unpause', outputs: [] },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [{ name: '', internalType: 'address', type: 'address' }],
        name: 'users',
        outputs: [
            { name: 'recipient', internalType: 'address', type: 'address' },
            { name: 'epoch', internalType: 'uint256', type: 'uint256' },
            { name: 'lastBlock', internalType: 'uint256', type: 'uint256' },
            { name: 'blobs', internalType: 'uint256', type: 'uint256' },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'miner', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Claim',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'miner', internalType: 'address', type: 'address', indexed: true },
            { name: 'blobHash', internalType: 'bytes32', type: 'bytes32', indexed: false },
        ],
        name: 'Mine',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
            { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
        ],
        name: 'OwnershipTransferred',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
        name: 'Paused',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [{ name: 'account', internalType: 'address', type: 'address', indexed: false }],
        name: 'Unpaused',
    },
    { type: 'error', inputs: [], name: 'EnforcedPause' },
    { type: 'error', inputs: [], name: 'ExpectedPause' },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'OwnableInvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
        name: 'OwnableUnauthorizedAccount',
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__
 */
export const useReadBlobme = /*#__PURE__*/ createUseReadContract({ abi: blobmeAbi });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"EPOCH_SECONDS"`
 */
export const useReadBlobmeEpochSeconds = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'EPOCH_SECONDS',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"HALVING_EPOCHS"`
 */
export const useReadBlobmeHalvingEpochs = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'HALVING_EPOCHS',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"INITIAL_EPOCH_REWARD"`
 */
export const useReadBlobmeInitialEpochReward = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'INITIAL_EPOCH_REWARD',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 */
export const useReadBlobmeMaxSupply = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'MAX_SUPPLY',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"blobHashes"`
 */
export const useReadBlobmeBlobHashes = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'blobHashes',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"blomToken"`
 */
export const useReadBlobmeBlomToken = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'blomToken',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"canMine"`
 */
export const useReadBlobmeCanMine = /*#__PURE__*/ createUseReadContract({ abi: blobmeAbi, functionName: 'canMine' });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"claimableReward"`
 */
export const useReadBlobmeClaimableReward = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'claimableReward',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"epoch"`
 */
export const useReadBlobmeEpoch = /*#__PURE__*/ createUseReadContract({ abi: blobmeAbi, functionName: 'epoch' });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"epochReward"`
 */
export const useReadBlobmeEpochReward = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'epochReward',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"epochStats"`
 */
export const useReadBlobmeEpochStats = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'epochStats',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"nextHalvingEpoch"`
 */
export const useReadBlobmeNextHalvingEpoch = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'nextHalvingEpoch',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"owner"`
 */
export const useReadBlobmeOwner = /*#__PURE__*/ createUseReadContract({ abi: blobmeAbi, functionName: 'owner' });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"paused"`
 */
export const useReadBlobmePaused = /*#__PURE__*/ createUseReadContract({ abi: blobmeAbi, functionName: 'paused' });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"startEpoch"`
 */
export const useReadBlobmeStartEpoch = /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: 'startEpoch',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"stats"`
 */
export const useReadBlobmeStats = /*#__PURE__*/ createUseReadContract({ abi: blobmeAbi, functionName: 'stats' });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"users"`
 */
export const useReadBlobmeUsers = /*#__PURE__*/ createUseReadContract({ abi: blobmeAbi, functionName: 'users' });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__
 */
export const useWriteBlobme = /*#__PURE__*/ createUseWriteContract({ abi: blobmeAbi });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"claimReward"`
 */
export const useWriteBlobmeClaimReward = /*#__PURE__*/ createUseWriteContract({
    abi: blobmeAbi,
    functionName: 'claimReward',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"mine"`
 */
export const useWriteBlobmeMine = /*#__PURE__*/ createUseWriteContract({ abi: blobmeAbi, functionName: 'mine' });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteBlobmePause = /*#__PURE__*/ createUseWriteContract({ abi: blobmeAbi, functionName: 'pause' });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteBlobmeRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
    abi: blobmeAbi,
    functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setBlobHash"`
 */
export const useWriteBlobmeSetBlobHash = /*#__PURE__*/ createUseWriteContract({
    abi: blobmeAbi,
    functionName: 'setBlobHash',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setRecipient"`
 */
export const useWriteBlobmeSetRecipient = /*#__PURE__*/ createUseWriteContract({
    abi: blobmeAbi,
    functionName: 'setRecipient',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setStartEpoch"`
 */
export const useWriteBlobmeSetStartEpoch = /*#__PURE__*/ createUseWriteContract({
    abi: blobmeAbi,
    functionName: 'setStartEpoch',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteBlobmeTransferOwnership = /*#__PURE__*/ createUseWriteContract({
    abi: blobmeAbi,
    functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteBlobmeUnpause = /*#__PURE__*/ createUseWriteContract({ abi: blobmeAbi, functionName: 'unpause' });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__
 */
export const useSimulateBlobme = /*#__PURE__*/ createUseSimulateContract({ abi: blobmeAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"claimReward"`
 */
export const useSimulateBlobmeClaimReward = /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: 'claimReward',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"mine"`
 */
export const useSimulateBlobmeMine = /*#__PURE__*/ createUseSimulateContract({ abi: blobmeAbi, functionName: 'mine' });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateBlobmePause = /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: 'pause',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateBlobmeRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setBlobHash"`
 */
export const useSimulateBlobmeSetBlobHash = /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: 'setBlobHash',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setRecipient"`
 */
export const useSimulateBlobmeSetRecipient = /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: 'setRecipient',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setStartEpoch"`
 */
export const useSimulateBlobmeSetStartEpoch = /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: 'setStartEpoch',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateBlobmeTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: 'transferOwnership',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateBlobmeUnpause = /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: 'unpause',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__
 */
export const useWatchBlobmeEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: blobmeAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchBlobmeClaimEvent = /*#__PURE__*/ createUseWatchContractEvent({
    abi: blobmeAbi,
    eventName: 'Claim',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"Mine"`
 */
export const useWatchBlobmeMineEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: blobmeAbi, eventName: 'Mine' });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchBlobmeOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
    abi: blobmeAbi,
    eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchBlobmePausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
    abi: blobmeAbi,
    eventName: 'Paused',
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchBlobmeUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
    abi: blobmeAbi,
    eventName: 'Unpaused',
});
