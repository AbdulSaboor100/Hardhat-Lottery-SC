const { run } = require("hardhat");

const verify = async (contactAddress, args) => {
  try {
    await run("verify:verify", {
      address: contactAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error?.message?.toLowerCase()?.includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(error);
    }
  }
};

module.exports = {
  verify,
};
