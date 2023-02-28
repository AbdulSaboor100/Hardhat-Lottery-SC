const { ethers, network } = require("hardhat");
const fs = require("fs");

const FRONT_END_ADDRESSESS_FILE =
  "../next-lottery-sc/constants/contractAddressess.json";

const FRONT_END_ABI_FILE = "../next-lottery-sc/constants/abi.json";

module.exports = async function () {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Updating front end...");
    updateContractAddressess();
    updateAbi();
  }
};

const updateAbi = async () => {
  const raffle = await ethers.getContract("Raffle");
  fs.writeFileSync(
    FRONT_END_ABI_FILE,
    raffle.interface.format(ethers.utils.FormatTypes.json)
  );
};

const updateContractAddressess = async () => {
  const raffle = await ethers.getContract("Raffle");
  const chainId = network.config.chainId.toString();
  const currentAddressess = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSESS_FILE, "utf8")
  );
  if (chainId in currentAddressess) {
    if (!currentAddressess[chainId].includes(raffle.address)) {
      currentAddressess[chainId].push(raffle.address);
    }
  }
  {
    currentAddressess[chainId] = [raffle.address];
  }
  fs.writeFileSync(
    FRONT_END_ADDRESSESS_FILE,
    JSON.stringify(currentAddressess)
  );
};

module.exports.tags = ["all", "frontend"];
