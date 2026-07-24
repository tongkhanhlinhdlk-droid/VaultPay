import { formatEther } from "viem";
import { publicClient } from "./viem";

export async function getEthBalance(address: `0x${string}`) {
  const balanceWei = await publicClient.getBalance({
    address,
  });

  return formatEther(balanceWei);
}