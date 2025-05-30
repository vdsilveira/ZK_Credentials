/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { AssetManager, AssetManagerInterface } from "../AssetManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "UUID",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "Price",
        type: "uint256",
      },
    ],
    name: "BuyPre_Irec",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "date",
        type: "string",
      },
    ],
    name: "ExpireToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "Date",
        type: "string",
      },
    ],
    name: "ViewExpiredTokens",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "Buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_Nonce",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "changeReceiptIssue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "UUID",
        type: "string",
      },
      {
        internalType: "string",
        name: "enterprise",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "volume",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "generationPeriod",
        type: "string",
      },
      {
        internalType: "enum EnergySource",
        name: "energySource",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "expirationDate",
        type: "string",
      },
    ],
    name: "createPreToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "Buyer",
        type: "address",
      },
    ],
    name: "getNonceIndex",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenId",
        type: "string",
      },
    ],
    name: "getPreToken",
    outputs: [
      {
        components: [
          {
            internalType: "enum Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "supplyCompany",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "volume",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "generationPeriod",
            type: "string",
          },
          {
            internalType: "enum EnergySource",
            name: "energySource",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "expirationDate",
            type: "string",
          },
          {
            internalType: "bool",
            name: "Exist",
            type: "bool",
          },
        ],
        internalType: "struct PreToken",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_Nonce",
        type: "uint256",
      },
    ],
    name: "getReceipt",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "ReceiptOwner",
            type: "address",
          },
          {
            internalType: "string",
            name: "Pre_TokenId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "Irec_issued",
            type: "bool",
          },
          {
            internalType: "bytes32",
            name: "txHash",
            type: "bytes32",
          },
        ],
        internalType: "struct PurchaseReceipt",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalVolume",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum EnergySource",
        name: "energySource",
        type: "uint8",
      },
    ],
    name: "getTotalVolumeBySource",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class AssetManager__factory {
  static readonly abi = _abi;
  static createInterface(): AssetManagerInterface {
    return new Interface(_abi) as AssetManagerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AssetManager {
    return new Contract(address, _abi, runner) as unknown as AssetManager;
  }
}
