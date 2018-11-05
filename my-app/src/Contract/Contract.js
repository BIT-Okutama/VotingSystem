var contract = {
  address: "0x35e63afd1e16fe41c05e941159ed1edda3b5145b",
  ABI: [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        },
        {
          "name": "_option",
          "type": "uint256"
        }
      ],
      "name": "getNameOfCandidate",
      "outputs": [
        {
          "name": "option",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getPositions",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        }
      ],
      "name": "getElectionStatus",
      "outputs": [
        {
          "name": "_isOpen",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        },
        {
          "name": "_candidate",
          "type": "uint256"
        }
      ],
      "name": "voteCandidateOnPosition",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        },
        {
          "name": "_option",
          "type": "uint256"
        }
      ],
      "name": "getWeightedVoteCountsOf",
      "outputs": [
        {
          "name": "option",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        }
      ],
      "name": "getNumberOfCandidatesOfPosition",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        },
        {
          "name": "_status",
          "type": "bool"
        }
      ],
      "name": "setElectionStatus",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "addAdmin",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        },
        {
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "addPosition",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        },
        {
          "name": "_option",
          "type": "address"
        }
      ],
      "name": "getBallotOf",
      "outputs": [
        {
          "name": "option",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        },
        {
          "name": "_candidate",
          "type": "string"
        }
      ],
      "name": "addCandidateToPosition",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        }
      ],
      "name": "getTotalVotesOfPosition",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        }
      ],
      "name": "getWinningOptions",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getNumberOfPositions",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_position",
          "type": "string"
        }
      ],
      "name": "getPositionDescription",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ]
}

export default contract;

