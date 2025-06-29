import React from 'react'
import { ConnectKitButton } from 'connectkit'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useRef } from 'react'
const Navbar = () => {
    const ref = useRef()
    return (
        <>
            <nav data-bs-theme="dark" className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">

                    <div className='d-flex'>
                    <Link  class="navbar-brand" to="/">
                        <img src="https://vertexchain.world/static/media/logo.58c3ed5fd518a879d1d4.png" width="60" class="d-inline-block align-top" alt="" />

                    </Link>
                 
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <i ref={ref} class="fa fa-bars fa-lg opacity-75" style={{color:"white"}} aria-hidden="true"></i>
                    </button>
                    </div>
                    <div className="d-block d-md-none">
                        <ConnectKitButton showBalance={true} />
                    </div>

                    <div className="collapse navbar-collapse p-2 p-md-0" id="navbarTogglerDemo03">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className=" nav-item">
                                <Link onClick={()=>{window.innerWidth<768&&ref.current.click()}}  style={{fontSize:"20px"}}  className="nav-link text-light fs-xl " aria-current="page" to="/">Swap</Link>
                            </li>
                            <li className=" nav-item">
                                <Link onClick={()=>{window.innerWidth<768&&ref.current.click()}}  style={{fontSize:"20px"}}  className="nav-link text-light fs-xl" to="/stake">Stake</Link>
                            </li>
                            <li className=" nav-item">
                                <Link onClick={()=>{window.innerWidth<768&&ref.current.click()}}  style={{fontSize:"20px"}}  className="nav-link text-light fs-xl" to="/usdc-faucet">USDC Faucet</Link>
                            </li>


                        </ul>
                        <div className="d-md-block d-none">
                            <div className="d-flex">
                                <ConnectKitButton showBalance={true} />

                            </div>
                        </div>

                    </div>


                </div>
            </nav>
        </> 
    )
}

export default Navbar