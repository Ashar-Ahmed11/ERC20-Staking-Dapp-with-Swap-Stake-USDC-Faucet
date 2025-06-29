import React from "react";
// import { ConnectKitButton } from "connectkit";
import { useReadContract, useWriteContract } from 'wagmi'

import { formatEther, parseEther } from 'viem'
import { useAccount } from "wagmi";
import { config } from "./components/config.jsx";
import Navbar from "./components/navbar.jsx";
import { useState, useEffect } from "react";
import { useBalance } from 'wagmi'
import { useWaitForTransactionReceipt } from 'wagmi'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Swap from "./components/swap.jsx";
import Stake from "./components/stake.jsx";
import { deployedaddr,abi } from "./contract/stakeinfo.jsx";
import UsdcFacuet from "./components/usdcfaucet.jsx";
// import { useWriteContract } from "wagmi"

// import './App.css';
import { ToastContainer } from "react-toastify";

function App() {
 
  console.clear()
  return (
    <Router>
      <ToastContainer/>
      <div >
      <Navbar/>
       

        <Switch>
          <Route exact path="/">
            <Swap />
          </Route>
          <Route exact path="/stake">
            {/* <Nft /> */}
            <Stake/>
          </Route>
          <Route exact path="/usdc-faucet">
            {/* <Nft /> */}
            <UsdcFacuet/>
          </Route>
         

        </Switch>
      </div>

    </Router >
  );
}

export default App;
