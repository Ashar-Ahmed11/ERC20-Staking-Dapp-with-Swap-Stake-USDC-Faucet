import React from "react";
// import { ConnectKitButton } from "connectkit";
import { useReadContract, useWriteContract } from 'wagmi'
import { abi, deployedaddr } from '../contract/info.jsx'
import { formatEther, parseEther } from 'viem'
import { useAccount } from "wagmi";
import { config } from "./config.jsx";

import { useState, useEffect } from "react";
import { useBalance } from 'wagmi'
import { useWaitForTransactionReceipt } from 'wagmi'
// import { useWriteContract } from "wagmi"

// import './App.css';

// const TOKEN_LIST = 'https://tokens.uniswap.org'
function Swap() {



  // console.clear()

  return (
  <div className="bg-dark text-white h-100 d-flex justify-content-around py-4 stake-container">
      <div>
        <div className="py-4"> <h1 className="text-center">Swap VTC</h1></div>
        <div className="">
          <iframe
            className=""
            src="https://app.uniswap.org/#/swap?chain=sepolia&outputCurrency=0x44cfeF853C9Af0C2059A5b6052d3Cc7B746c4201&inputCurrency=0xA989De7FB7b0A187C74FB8f73549d542B5B538F6&testnet=true"
            // height={'80vh'}
            width={"400px"}
            style={{
              border: "0",

              marginBottom: ".5rem",
              display: "block",
              height: "500px",
              borderRadius: "10px",
              maxWidth: "960px",
              minWidth: "300px",
            }}
          />
        </div>
      </div>
    </div >
  );
}

export default Swap;
