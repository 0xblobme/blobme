// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract BlomToken is ERC20, ERC20Permit {
    using SafeERC20 for IERC20;

    address public minter;

    constructor() ERC20("Blom", "BLOM") ERC20Permit("Blom") {
        minter = _msgSender();
    }

    function mint(address account, uint256 value) external {
        require(_msgSender() == minter, "only minter can mint");

        _mint(account, value);
    }
}
