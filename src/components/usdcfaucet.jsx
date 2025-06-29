import React from 'react'
import { useAccount } from 'wagmi'
import { config } from './config'
import { useWriteContract } from 'wagmi'
import { faucetAbi as abi,faucetAddress as address} from '../contract/faucetinfo'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
const UsdcFacuet = () => {
    const account = useAccount({config})
    console.log(account.address);

       const { data, writeContract, error, isSuccess } = useWriteContract()

       const ClaimUSDC =()=>{
        writeContract({
            abi,
            address,
            functionName:"ClaimDailyTokens"
        })
       }

    
       
       useEffect(() => {
        if(error?.shortMessage){
            toast(error.shortMessage)
        }
       }, [error])
       

    
    return (
        <div className='text-center'>
            <h1 className="text-light pt-5 pb-3">USDC Faucet</h1>

            <div className="d-flex justify-content-center">
                <div class="card bg-secondary text-light p-3 bg-opacity-25 shadow-lg rounded-4" style={{ width: "25em" }}>
                    <div className="w-100 d-flex justify-content-center">
                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/usdc-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bitcoin-logo-crypto-coin-cryptocurrency-pack-logos-icons-8263869.png" class="card-img-top w-50" alt="..." />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title display-5" style={{fontWeight:"500"}}>USDC FAUCET</h5>
                        <p class="card-text lead">You can claim 100 USDC every 24 Hours</p>
                        <p class="card-text lead">The claimed USDC can be used to swap VTC token on sepolia net via Uniswap V3 Protocol</p>
                        <button onClick={()=>{ClaimUSDC()}} class="btn btn-outline-light btn-lg">CLAIM</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsdcFacuet