import { formatEther, formatUnits } from "viem";
import { publicClient } from "./viem";

export async function getEthBalance(address: `0x${string}`) {
  const balanceWei = await publicClient.getBalance({
    address,
  });

  return formatEther(balanceWei);
}
const USDC_ADDRESS =
  "0x3600000000000000000000000000000000000000";

const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
  },
] as const;

export async function getUSDCBalance(
  address: `0x${string}`
) {
  const balance = await publicClient.readContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
  });

  return formatUnits(balance, 6);
}