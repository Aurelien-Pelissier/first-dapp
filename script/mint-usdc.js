const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const usdc = {
  address: "0x3D249B8E3eA85F1094Be7701d0D703bA10805A7E",
  abi: [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function gimmeSome() external",
    "function balanceOf(address _owner) public view returns (uint256 balance)",
    "function transfer(address _to, uint256 _value) public returns (bool success)",
  ],
};

async function mintUsdc() {
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();
  const usdcContract = new ethers.Contract(usdc.address, usdc.abi, signer);

  const tx = await usdcContract.gimmeSome({ gasPrice: 20e9 });
  console.log(`Transaction hash: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
  console.log(`Gas used: ${receipt.gasUsed.toString()}`);
}
