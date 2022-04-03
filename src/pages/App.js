import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';

import logo from '../assets/logo.png';
import heading from '../assets/heading.png';

import '../App.css';
import 'react-toastify/dist/ReactToastify.css';


const CONTRACT_ADDRESS = "0xa6aEbD60FBC19fFe76Bd93c7c9f507066cAA02d2";
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "maxBatchSize_",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "collectionSize_",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountForDevs_",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "mintPrice_",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ApprovalCallerNotOwnerNorApproved",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ApprovalQueryForNonexistentToken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ApprovalToCurrentOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ApproveToCaller",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "BalanceQueryForZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "MintToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "MintZeroQuantity",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OwnerQueryForNonexistentToken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferCallerNotOwnerNorApproved",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFromIncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferToNonERC721ReceiverImplementer",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "URIQueryForNonexistentToken",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "amountForDevs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collectionSize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "name": "devMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxBatchSize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "numberMinted",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "baseURI",
        "type": "string"
      }
    ],
    "name": "setBaseURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawMoney",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const NETWORK_ID = 4; //137

var pollDataInterval;
var address;
var provider;
var signer;
var contract;

function App() {
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [connectWalletStatus, setConnectWalletStatus] = useState(false);
  const [numberToMint, setNumberToMint] = useState("");
  const [error, setError] = useState("");
  const [transactionHash, setTransacitonHash] = useState("");

  useEffect(() => {
    if (selectedAddress) {
      startPollingData();
    }
  }, [selectedAddress]);

  const numberToMintOnChange = (value) => {
    setError("")
    setNumberToMint(value.target.value);

    if (isNaN(value.target.value) || (value.target.value).toString().indexOf('.') !== -1) {
      setError("Mint amount must be an integer");
    }

    if (parseInt(value.target.value) > 10) {
      setError("Cannot mint more than 10 max NFTs");
    }
  }

  async function connectWallet() {
    [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (!checkNetwork()) {
      return;
    }

    await initialize(address);

    if (connectWalletStatus === false) {
      setConnectWalletStatus(true);
    }

    window.ethereum.on("accountsChanged", ([newAddress]) => {
      address = newAddress;
      stopPollingData();

      if (address === undefined) {
        return resetState();
      }
      
      initialize(address);
    });
    
    window.ethereum.on("chainChanged", () => {
      stopPollingData();
      resetState();
    });
  }

  async function initialize(userAddress) {
    setSelectedAddress(userAddress);
    initializeEthers();
  }

  async function initializeEthers() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner(0);
    contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
  }

  async function checkNetwork() {
    if (parseInt(window.ethereum.networkVersion) === NETWORK_ID) {
      return true;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xA86A',
                rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }

    connectWallet();

    return false;
  }

  function startPollingData() {
    pollDataInterval = setInterval(() => updateData(), 3000);

    updateData();
  }

  function stopPollingData() {
    clearInterval(pollDataInterval);
    pollDataInterval = undefined;
  }

  function resetState() {
    setSelectedAddress(undefined);
    setConnectWalletStatus(false);
    setNumberToMint("");
    setError("");
    setTransacitonHash("");
  }

  async function mint(numPasses) {
    setTransacitonHash(undefined);
  
    if (!numPasses) {
      toast.error("Invalid mint amount.");
      return;
    }
  
    if (!checkNetwork()) {
      toast.error("Invalid chain.");
      return;
    }
  
      const tx = await contract.mint(numPasses, {value: ethers.utils.parseEther("0.015").mul(numPasses)}).catch((message) => {
      if (message.error.code === -32000) {
        toast.error("Insufficent funds for gas * price. Requires 0.015 ETH per pass.");
      } else if (message.error.code === -32603) {
        console.log(message);
        toast.error("Execution reverted. Only 10 passes can be minted per person.");
      }
    });
  
    setTransacitonHash(tx.hash);
  
    toast.promise(
      tx.wait(),
      {
        pending: `Minting your NFT`,
        success: 'Minted!',
        error: 'Something went wrong. Try again.'
      }
    );
  
      await updateData();
    }

  async function updateData() {
    console.log("HI");
  }

  return (
    <div className='App'>
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        style={{
            width: "25vw",
            textAlign: "left"
        }}
      />
      <header className='flex flex-row justify-between items-center h-[6.5vh] px-[17.5px]'>
        <div className='flex flex-row items-center gap-[8px] pt-[5px] pb-[5px]'>
          <img src={logo} className='h-[30px]' alt="logo" />
          <div className='font-bold	text-xl'>
            Hack Punk Auras
          </div>
        </div>
        <div className='flex flex-row justify-between gap-[30px]'>
          <a target="_blank" rel="noreferrer" href='https://opensea.io/HackPunks'>
            <button>
              OpenSea
            </button>
          </a>
          <a target="_blank" rel="noreferrer" href='https://discord.gg/nVwgwdbavf'>
            <button>
              Discord
            </button>
          </a>
          <a target="_blank" rel="noreferrer" href='https://twitter.com/hackpunks'>
            <button>
              Twitter
            </button>
          </a>
          {selectedAddress ? (
            <button disabled className='bg-black'>
              {selectedAddress.substring(0,5) + "..." + selectedAddress.substring(38)}
            </button>
          ) : (
            <button className='gradient-button' onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </header>
      <div className='h-[70vh] flex'>
        <div className='flex flex-row justify-evenly items-center'>
          <img
            src={heading}
            className='w-[40%] lg:w-[35%]'
            alt='Hack Punk AURAS'
          />
          <div className='w-[40%] lg:w-[35%] pt-[4%] text-center'>
            <div className='font-bold'>
              ✨ The Hack Punk Auras is a collection of 2,000 NFTs representing our  inner auras ✨
            </div>
            <br />
            <div>
              The NFTs serve as <b>support to our community</b> of under-represented founders, engineers, and developers ( aka Hackers 😎 )
            </div>
            <br />
            <div>
              Our mission is to <b>foster a diverse community of young and up-and-coming hackers in all areas of tech</b> ( Hard tech, software, web 3, etc ). Helping them find opportunities at conferences &amp; experiences worldwide 🌎
            </div>
            <br />
            
            {connectWalletStatus ? (
              <div>
                <div className='flex flex-row justify-evenly'>
                  {error ? (
                    <button disabled className='gradient-button cursor-not-allowed'>
                      Mint {numberToMint ? parseInt(numberToMint) : ""} NFTs
                    </button>
                  ) : (
                    <button className='gradient-button' onClick={() => {
                      mint(numberToMint)
                    }}>
                      Mint {numberToMint ? parseInt(numberToMint) : ""} NFTs
                    </button>
                  )}
                  
                  <input placeholder="number" value={numberToMint} onChange={numberToMintOnChange} />
                  
                </div>
                <div className='text-[red] pt-[20px]'>
                  {error}
                </div>
                {!transactionHash ? transactionHash : (
                  <div className='text-sm'>
                    View your transaction on &nbsp;
                    <a className="underline decoration-indigo-500 decoration-4 underline-offset-4" href={"https://rinkeby.etherscan.io/tx/" + transactionHash} target="_blank">
                      Etherscan
                    </a>
                      &nbsp; or check out your NFT on &nbsp;
                    <a className="underline decoration-indigo-500 decoration-4 underline-offset-4" href={"https://opensea.io/HackPunks"} target="_blank">
                       OpenSea
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <button className='gradient-button' onClick={connectWallet}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='footer w-[100%] h-[90vh] overflow-hidden bg-repeat-space	bg-cover'>
        <div className='flex flex-row h-[100%] test-left font-extrabold text-4xl justify-center items-center'>
          <div className='flex flex-col gap-[50px]'>
            <div>
              Join our community of Hackers :) 
            </div>
            <div>
              We'll see you in <a target="_blank" rel="noreferrer" href='https://discord.gg/nVwgwdbavf' className='underline cursor-pointer'>Discord</a>👋
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
