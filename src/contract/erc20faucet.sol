// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Faucet {
    mapping  (address => uint256 ) public userStatus ;

    address admin;
    address faucetTokenAddress;


    ERC20 usdcToken = ERC20(faucetTokenAddress);

    constructor(address _faucetTokenAddress) {
        admin = msg.sender;
        usdcToken = ERC20(_faucetTokenAddress);
    }

   

    function ClaimDailyTokens() public {
        
        require(userStatus[msg.sender]==0 || (block.timestamp-userStatus[msg.sender])>=86400, "user has already claimed his day reward, try again later after 24 Hours");
       
        usdcToken.transferFrom(admin,msg.sender,100 ether);
        userStatus[msg.sender] = block.timestamp;
    }
 

    function getBlock() public view returns(uint256) {
        return block.timestamp;
    }
}