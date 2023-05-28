const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  //provider
  let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  //wallet
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  //获取abi，binary交互合约
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  //创建contractFactory
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("部署着呢");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  console.log(`合约地址：${contract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
