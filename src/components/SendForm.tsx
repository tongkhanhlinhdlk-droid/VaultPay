"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { createDeal } from "@/lib/escrow";

export default function SendForm() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [hash, setHash] = useState("");

  async function handleSend() {
    setStatus("Waiting for MetaMask...");
    setHash("");

    try {
      const txHash = await createDeal(
        to as `0x${string}`,
        parseEther(amount)
      );

      setHash(txHash);
      setStatus("Deal created successfully!");

    } catch (error: any) {
      console.error(error);
      setStatus(error.message || "Transaction failed");
    }
  }


  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Seller Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full rounded-lg border p-3"
      />


      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded-lg border p-3"
      />


      <button
        onClick={handleSend}
        className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
      >
        Create Escrow Deal
      </button>


      {status && (
        <div className="rounded-lg border p-3">
          <p>{status}</p>

          {hash && (
            <a
              href={`https://sepolia.etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-blue-600 underline"
            >
              View Transaction on Etherscan
            </a>
          )}

        </div>
      )}

    </div>
  );
}