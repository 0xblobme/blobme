import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Blobme
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const blobmeAbi = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "blomToken_", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "EPOCH_SECONDS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "HALVING_EPOCHS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "INITIAL_EPOCH_REWARD",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_SUPPLY",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    name: "blobHashes",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "blomToken",
    outputs: [
      { name: "", internalType: "contract BlomToken", type: "address" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "canMine",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "claimer", internalType: "address", type: "address" }],
    name: "claimReward",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "claimer", internalType: "address", type: "address" }],
    name: "claimableReward",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "epoch",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "epoch_", internalType: "uint256", type: "uint256" }],
    name: "epochReward",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "epochStats",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "mine",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "nextHalvingEpoch",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "pause",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "paused",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "hashes", internalType: "bytes32[]", type: "bytes32[]" },
      { name: "valid", internalType: "bool", type: "bool" },
    ],
    name: "setBlobHashes",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "recipient", internalType: "address", type: "address" }],
    name: "setRecipient",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "startEpoch_", internalType: "uint256", type: "uint256" }],
    name: "setStartEpoch",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "startEpoch",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "started",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "stats",
    outputs: [
      { name: "epoch", internalType: "uint256", type: "uint256" },
      { name: "blobs", internalType: "uint256", type: "uint256" },
      { name: "supply", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "unpause",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "users",
    outputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "epoch", internalType: "uint256", type: "uint256" },
      { name: "lastBlock", internalType: "uint256", type: "uint256" },
      { name: "blobs", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "miner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Claim",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "miner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "blobHash",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
    ],
    name: "Mine",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Paused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Unpaused",
  },
  { type: "error", inputs: [], name: "EnforcedPause" },
  { type: "error", inputs: [], name: "ExpectedPause" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BlomToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const blomTokenAbi = [
  { stateMutability: "nonpayable", type: "constructor", inputs: [] },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", internalType: "bytes1", type: "bytes1" },
      { name: "name", internalType: "string", type: "string" },
      { name: "version", internalType: "string", type: "string" },
      { name: "chainId", internalType: "uint256", type: "uint256" },
      { name: "verifyingContract", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
      { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "minter",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newMinter", internalType: "address", type: "address" }],
    name: "setMinter",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  { type: "event", anonymous: false, inputs: [], name: "EIP712DomainChanged" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  { type: "error", inputs: [], name: "ECDSAInvalidSignature" },
  {
    type: "error",
    inputs: [{ name: "length", internalType: "uint256", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
  },
  {
    type: "error",
    inputs: [{ name: "s", internalType: "bytes32", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
  },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "error",
    inputs: [{ name: "deadline", internalType: "uint256", type: "uint256" }],
    name: "ERC2612ExpiredSignature",
  },
  {
    type: "error",
    inputs: [
      { name: "signer", internalType: "address", type: "address" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC2612InvalidSigner",
  },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "currentNonce", internalType: "uint256", type: "uint256" },
    ],
    name: "InvalidAccountNonce",
  },
  { type: "error", inputs: [], name: "InvalidShortString" },
  {
    type: "error",
    inputs: [{ name: "str", internalType: "string", type: "string" }],
    name: "StringTooLong",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__
 */
export const useReadBlobme = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"EPOCH_SECONDS"`
 */
export const useReadBlobmeEpochSeconds = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "EPOCH_SECONDS",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"HALVING_EPOCHS"`
 */
export const useReadBlobmeHalvingEpochs = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "HALVING_EPOCHS",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"INITIAL_EPOCH_REWARD"`
 */
export const useReadBlobmeInitialEpochReward =
  /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: "INITIAL_EPOCH_REWARD",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 */
export const useReadBlobmeMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "MAX_SUPPLY",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"blobHashes"`
 */
export const useReadBlobmeBlobHashes = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "blobHashes",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"blomToken"`
 */
export const useReadBlobmeBlomToken = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "blomToken",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"canMine"`
 */
export const useReadBlobmeCanMine = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "canMine",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"claimableReward"`
 */
export const useReadBlobmeClaimableReward = /*#__PURE__*/ createUseReadContract(
  {
    abi: blobmeAbi,
    functionName: "claimableReward",
  },
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"epoch"`
 */
export const useReadBlobmeEpoch = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "epoch",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"epochReward"`
 */
export const useReadBlobmeEpochReward = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "epochReward",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"epochStats"`
 */
export const useReadBlobmeEpochStats = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "epochStats",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"nextHalvingEpoch"`
 */
export const useReadBlobmeNextHalvingEpoch =
  /*#__PURE__*/ createUseReadContract({
    abi: blobmeAbi,
    functionName: "nextHalvingEpoch",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"owner"`
 */
export const useReadBlobmeOwner = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"paused"`
 */
export const useReadBlobmePaused = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "paused",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"startEpoch"`
 */
export const useReadBlobmeStartEpoch = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "startEpoch",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"started"`
 */
export const useReadBlobmeStarted = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "started",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"stats"`
 */
export const useReadBlobmeStats = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "stats",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"users"`
 */
export const useReadBlobmeUsers = /*#__PURE__*/ createUseReadContract({
  abi: blobmeAbi,
  functionName: "users",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__
 */
export const useWriteBlobme = /*#__PURE__*/ createUseWriteContract({
  abi: blobmeAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"claimReward"`
 */
export const useWriteBlobmeClaimReward = /*#__PURE__*/ createUseWriteContract({
  abi: blobmeAbi,
  functionName: "claimReward",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"mine"`
 */
export const useWriteBlobmeMine = /*#__PURE__*/ createUseWriteContract({
  abi: blobmeAbi,
  functionName: "mine",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteBlobmePause = /*#__PURE__*/ createUseWriteContract({
  abi: blobmeAbi,
  functionName: "pause",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteBlobmeRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: blobmeAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setBlobHashes"`
 */
export const useWriteBlobmeSetBlobHashes = /*#__PURE__*/ createUseWriteContract(
  {
    abi: blobmeAbi,
    functionName: "setBlobHashes",
  },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setRecipient"`
 */
export const useWriteBlobmeSetRecipient = /*#__PURE__*/ createUseWriteContract({
  abi: blobmeAbi,
  functionName: "setRecipient",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setStartEpoch"`
 */
export const useWriteBlobmeSetStartEpoch = /*#__PURE__*/ createUseWriteContract(
  {
    abi: blobmeAbi,
    functionName: "setStartEpoch",
  },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteBlobmeTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: blobmeAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteBlobmeUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: blobmeAbi,
  functionName: "unpause",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__
 */
export const useSimulateBlobme = /*#__PURE__*/ createUseSimulateContract({
  abi: blobmeAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"claimReward"`
 */
export const useSimulateBlobmeClaimReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: "claimReward",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"mine"`
 */
export const useSimulateBlobmeMine = /*#__PURE__*/ createUseSimulateContract({
  abi: blobmeAbi,
  functionName: "mine",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateBlobmePause = /*#__PURE__*/ createUseSimulateContract({
  abi: blobmeAbi,
  functionName: "pause",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateBlobmeRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setBlobHashes"`
 */
export const useSimulateBlobmeSetBlobHashes =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: "setBlobHashes",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setRecipient"`
 */
export const useSimulateBlobmeSetRecipient =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: "setRecipient",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"setStartEpoch"`
 */
export const useSimulateBlobmeSetStartEpoch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: "setStartEpoch",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateBlobmeTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blobmeAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blobmeAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateBlobmeUnpause = /*#__PURE__*/ createUseSimulateContract(
  {
    abi: blobmeAbi,
    functionName: "unpause",
  },
);

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__
 */
export const useWatchBlobmeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: blobmeAbi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"Claim"`
 */
export const useWatchBlobmeClaimEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: blobmeAbi,
    eventName: "Claim",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"Mine"`
 */
export const useWatchBlobmeMineEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: blobmeAbi,
    eventName: "Mine",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchBlobmeOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: blobmeAbi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchBlobmePausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: blobmeAbi,
    eventName: "Paused",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blobmeAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchBlobmeUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: blobmeAbi,
    eventName: "Unpaused",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__
 */
export const useReadBlomToken = /*#__PURE__*/ createUseReadContract({
  abi: blomTokenAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadBlomTokenDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: blomTokenAbi,
    functionName: "DOMAIN_SEPARATOR",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadBlomTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: blomTokenAbi,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadBlomTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: blomTokenAbi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadBlomTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: blomTokenAbi,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadBlomTokenEip712Domain = /*#__PURE__*/ createUseReadContract(
  {
    abi: blomTokenAbi,
    functionName: "eip712Domain",
  },
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"minter"`
 */
export const useReadBlomTokenMinter = /*#__PURE__*/ createUseReadContract({
  abi: blomTokenAbi,
  functionName: "minter",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadBlomTokenName = /*#__PURE__*/ createUseReadContract({
  abi: blomTokenAbi,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadBlomTokenNonces = /*#__PURE__*/ createUseReadContract({
  abi: blomTokenAbi,
  functionName: "nonces",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadBlomTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: blomTokenAbi,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadBlomTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: blomTokenAbi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blomTokenAbi}__
 */
export const useWriteBlomToken = /*#__PURE__*/ createUseWriteContract({
  abi: blomTokenAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteBlomTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: blomTokenAbi,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteBlomTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: blomTokenAbi,
  functionName: "mint",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteBlomTokenPermit = /*#__PURE__*/ createUseWriteContract({
  abi: blomTokenAbi,
  functionName: "permit",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"setMinter"`
 */
export const useWriteBlomTokenSetMinter = /*#__PURE__*/ createUseWriteContract({
  abi: blomTokenAbi,
  functionName: "setMinter",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteBlomTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: blomTokenAbi,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteBlomTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: blomTokenAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blomTokenAbi}__
 */
export const useSimulateBlomToken = /*#__PURE__*/ createUseSimulateContract({
  abi: blomTokenAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateBlomTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blomTokenAbi,
    functionName: "approve",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateBlomTokenMint = /*#__PURE__*/ createUseSimulateContract(
  {
    abi: blomTokenAbi,
    functionName: "mint",
  },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateBlomTokenPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blomTokenAbi,
    functionName: "permit",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"setMinter"`
 */
export const useSimulateBlomTokenSetMinter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blomTokenAbi,
    functionName: "setMinter",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateBlomTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blomTokenAbi,
    functionName: "transfer",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link blomTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateBlomTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: blomTokenAbi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blomTokenAbi}__
 */
export const useWatchBlomTokenEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: blomTokenAbi },
);

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blomTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchBlomTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: blomTokenAbi,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blomTokenAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchBlomTokenEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: blomTokenAbi,
    eventName: "EIP712DomainChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link blomTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchBlomTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: blomTokenAbi,
    eventName: "Transfer",
  });
