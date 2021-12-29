const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;


const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// provider: like Alchemy (node provider: gives you read access to the blockchain)
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// signer: someone wanting to transact etc. on the blockchain (you)
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    // sanity check: current message
    const message = await helloWorldContract.message();
    console.log("The message is " + message);

    console.log("Now we are updating the message...");

    // contract.update()
    const tx = await helloWorldContract.update("new message hehe");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The new message is " + newMessage);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });