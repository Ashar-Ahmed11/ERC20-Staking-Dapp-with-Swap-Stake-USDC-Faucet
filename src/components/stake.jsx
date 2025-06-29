import React from 'react'

import { useAccount, useWatchBlockNumber } from 'wagmi';
import { config } from './config.jsx';
import { deployedaddr, abi } from '../contract/stakeinfo.jsx';
import { deployedaddr as vertexTokenAddr, abi as vertexTokenAbi } from '../contract/info.jsx';
import { useReadContract, useWriteContract } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { useBlockNumber } from 'wagmi';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';
import { decodeErrorResult } from 'viem';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const Stake = () => {
    const account = useAccount(config)
    const { data: blockNumber } = useBlockNumber({ watch: true })
    
    const { data, writeContract, error, isSuccess } = useWriteContract(

    )



    // const transaction = useWaitForTransactionReceipt({})
    const { isError, isLoading } = useWaitForTransactionReceipt({
        hash: data,
        confirmations: 1,
        config
    })

    const { data: userStaked,refetch:refetchuserStakedTVL } = useReadContract({
        abi,
        address: deployedaddr,
        functionName: 'userStaked',
        account: account.address,
        query: {
            enabled: !!blockNumber,
            queryKey: ['userStaked', blockNumber]
        }
    })

    const { data: stakedTVL,refetch:refetchuserTVL } = useReadContract({
        abi,
        address: deployedaddr,
        functionName: 'stakedTVL',
        account: account.address,
          query: {
            enabled: !!blockNumber,
            queryKey: ['stakedTVL', blockNumber]
        }
    })
    const { data: totalGeneratedRewards, refetch } = useReadContract({
        abi,
        address: deployedaddr,
        functionName: 'totalGeneratedRewards',
        query: {
            enabled: !!blockNumber,
            queryKey: ['totalGeneratedRewards', blockNumber]
        }
    })

    useWatchBlockNumber({
        onBlockNumber(blockNumber) {
            refetch()
            refetchUserReward()
            refetchuserTVL()
            refetchuserStakedTVL()
        }
    })
    const { data: userPendingReward, refetch: refetchUserReward } = useReadContract({
        abi,
        address: deployedaddr,
        functionName: 'getPendingReward',
        args: [account.address],
        query: {
            enabled: !!blockNumber,
            queryKey: ['getPendingReward', blockNumber]
        }
    })
    const { data: totalUsers } = useReadContract({
        abi,
        address: deployedaddr,
        functionName: 'totalUsers',
        account: account.address
    })

    console.log(formatEther(totalUsers ?? 0) * 1e18);
    console.log(formatEther(stakedTVL ?? 0));
    console.log(formatEther(totalGeneratedRewards ?? 0));
    console.log(formatEther(userStaked ?? 0));
    console.log(formatEther(userPendingReward ?? 0));


    function compoundRewards() {
        // if (currentSwap == "ASH"){
        writeContract({
            abi,
            address: deployedaddr,
            functionName: 'compoundEarnings',

            // value: parseEther(`${input1 / 10000}`)

        })
    }
    const [compound, setCompound] = useState(false)
    console.log(compound);


    console.log();
    

    const [stakeAmount, setStakeAmount] = useState('0')



    function claimReward() {
        // if (currentSwap == "ASH"){
        writeContract({
            abi,
            address: deployedaddr,
            functionName: 'claimReward',

            // value: parseEther(`${input1 / 10000}`)

        })
    }
    function approveVTC() {
        writeContract({
            abi: vertexTokenAbi,
            address: vertexTokenAddr,
            functionName: 'approve',
            args: [deployedaddr, parseEther(stakeAmount)]
            // value: parseEther(`${input1 / 10000}`)

        })
    }
    function stake() {
        // if (currentSwap == "ASH"){
        writeContract({
            abi,
            address: deployedaddr,
            functionName: 'stake',
            args: [parseEther(stakeAmount), compound]

            // value: parseEther(`${input1 / 10000}`)

        })
    }


    console.log(error)

    // const thetransaction = transaction({hash:writeContract})
    // console.log(thetransaction);

    // }

      useEffect(() => {
            if(error?.shortMessage){
                toast(error.shortMessage)
            }
           }, [error])



    return (
        <div className="bg-dark text-white py-5 px-3 stake-container">
            <div className="pb-5"> <h1 className="text-center">Stake VTC</h1></div>
            <div className="container">

                {/* Header */}


                {/* Title */}


                {/* Stats */}
                <div className="row text-center">
                    {[
                        { label: "TVL", value: Number(formatEther(stakedTVL ?? 0)).toFixed(2) },
                        { label: "Users", value: formatEther(totalUsers ?? 0) * 1e18 },
                        { label: "Total Generated Reward", value: Number(formatEther(totalGeneratedRewards ?? 0)).toFixed(4) },
                        { label: "Daily Reward", value: "1%" },
                    ].map((stat, i) => (
                        <div key={i} className="col-6 col-md-3 mb-3">
                            <div className="bg-secondary bg-opacity-25 p-3 w-100 rounded-4 shadow-lg h-100">
                                <small style={{fontSize:"20px"}}>{stat.label}</small>
                                <div className="display-6" style={{fontWeight:"500"}}>{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Earnings Section */}
                <div className="row text-center">
                    <div className="col-md-6 d-flex align-items-stretch mb-3">
                        <div className="bg-secondary bg-opacity-25 p-3 w-100 rounded-4 shadow-lg">
                            <div style={{fontSize:"20px"}}>Total Staked Value</div>
                            <h5 className='display-5' style={{fontWeight:500}}>{Number(formatEther(userStaked ?? 0)).toFixed(2)} VTC</h5>
                            <div className="mx-2">
                                <input onChange={(e) => setStakeAmount(e.target.value)} value={stakeAmount} type="number" className="form-control p-2 bg-secondary bg-opacity-25 rounded-4 text-light" />
                            </div>
                            <div className="d-flex">
                                {/* <button onClick={()=>stake()} className="btn btn-outline-light p-2 btn-lg mt-2 w-100 mx-2 rounded-4">Stake</button> */}
                                <button onClick={() => approveVTC()} className="btn btn-outline-light p-2 btn-lg mt-2 w-100 mx-2 rounded-4">Approve VTC</button>
                            </div>
                            <div class="form-check form-switch d-flex m-2">
                                <input onChange={(e) => { setCompound(e.target.checked) }} class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" />
                                <label class="form-check-label mx-2" for="switchCheckChecked">Compound Earnings</label>
                            </div>
                            <div className="d-flex">
                                <button onClick={() => stake()} className="btn btn-outline-light p-2 btn-lg mt-2 w-100 mx-2 rounded-4">Stake</button>
                                <button className="btn btn-outline-light p-2 btn-lg mt-2 w-100 mx-2 rounded-4">Unstake All</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 d-flex align-items-stretch mb-3 ">
                        <div className="bg-secondary bg-opacity-25 p-3 w-100 rounded-4 shadow-lg">
                            <div style={{fontSize:"20px"}}>Total Earnings</div>
                            <h5 className='display-5' style={{fontWeight:500}}>{Number(formatEther(userPendingReward ?? 0)).toFixed(4)} VTC</h5>
                            <div className="d-flex mt-2">
                                <button onClick={() => compoundRewards()} className="mx-2 btn btn-outline-light p-2 btn-lg w-100 rounded-4">Compound</button>
                                <button onClick={() => claimReward()} className="mx-2 btn btn-outline-light p-2 btn-lg w-100 rounded-4">Collect</button>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Referral Link */}

            </div>
        </div>
    )
}

export default Stake