export const STOCK_ORACLE_ADDRESS = "0xce9Ac93AF13E733cD777F2eCb021D367255f55b5";

export const STOCK_ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "symbol",
        type: "bytes4"
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "volume",
        type: "uint256"
      }
    ],
    name: "setStock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "symbol",
        type: "bytes4"
      }
    ],
    name: "getStockPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "symbol",
        type: "bytes4"
      }
    ],
    name: "getStockVolume",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
