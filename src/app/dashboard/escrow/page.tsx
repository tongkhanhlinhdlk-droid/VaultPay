"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { parseUnits, parseEventLogs } from "viem";
import { VAULTPAY_ESCROW } from "@/lib/contracts";
const USDC_ADDRESS =
  "0x3600000000000000000000000000000000000000";

const USDC_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
  },
];
function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}


export default function EscrowPage() {
  const [mounted, setMounted] = useState(false);
  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");
  const [dealInfo, setDealInfo] = useState<any>(null);
  const [savedDeals, setSavedDeals] = useState<any[]>([]);
const [dealId, setDealId] = useState("");
const [isCompleting, setIsCompleting] = useState(false);
const [isRefunding, setIsRefunding] = useState(false);
  const { address } = useAccount();
  useEffect(() => {
  setMounted(true);
}, []);
const { data: deal } = useReadContract({
  ...VAULTPAY_ESCROW,
  functionName: "deals",
  args: dealId ? [BigInt(dealId)] : undefined,
  query: {
    enabled: dealId !== "",
  },
});
  const {
  writeContract,
  data: hash,
  isPending,
  error,
} = useWriteContract();
const {
  writeContract: writeApproveUSDC,
  data: approveHash,
  isPending: isApproving,
} = useWriteContract();
const {
  writeContract: writeCompleteDeal,
  data: completeHash,
} = useWriteContract();

const {
  data: completeReceipt,
} = useWaitForTransactionReceipt({
  hash: completeHash,
});
const {
  writeContract: writeRefundDeal,
  data: refundHash,
} = useWriteContract();

const {
  data: refundReceipt,
} = useWaitForTransactionReceipt({
  hash: refundHash,
});
  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  });

function approveUSDC() {
  if (!amount) {
    alert("Please enter amount");
    return;
  }

  writeApproveUSDC({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "approve",
    args: [
      VAULTPAY_ESCROW.address,
      parseUnits(amount, 6),
    ],
  });
}
  function createDeal() {
    console.log("CREATE DEAL CLICKED");

    if (!seller || !amount) {
      alert("Please enter seller address and amount");
      return;
    }

   writeContract({
  ...VAULTPAY_ESCROW,
  functionName: "createDeal",
  args: [
    seller as `0x${string}`,
    parseUnits(amount, 6),
  ],
});
  }
function completeDeal() {
  if (!dealId) {
    alert("Please enter Deal ID");
    return;
  }

  setIsCompleting(true);

  writeCompleteDeal({
    ...VAULTPAY_ESCROW,
    functionName: "completeDeal",
    args: [BigInt(dealId)],
  });
}

function refundDeal() {
  if (!dealId) {
    alert("Please enter Deal ID");
    return;
  }
setIsRefunding(true);
  writeRefundDeal({
    ...VAULTPAY_ESCROW,
    functionName: "refund",
    args: [BigInt(dealId)],
  });
}
  useEffect(() => {
  async function saveDeal() {
    if (!receipt) return;

    console.log("RECEIPT FROM WAGMI:", receipt);

    const logs = parseEventLogs({
      abi: VAULTPAY_ESCROW.abi,
      logs: receipt.logs,
      eventName: "DealCreated",
    });

    if (logs.length === 0) {
      return;
    }

    const deal = logs[0].args;

    console.log("Deal created:", deal);

    setDealInfo({
      dealId: deal.dealId.toString(),
      buyer: deal.buyer,
      seller: deal.seller,
      amount: deal.amount.toString(),
    });

    const response = await fetch("/api/deals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dealId: Number(deal.dealId),
        buyer: deal.buyer,
        seller: deal.seller,
        amount: deal.amount.toString(),
        status: "Created",
        txHash: receipt.transactionHash,
      }),
    });

    const data = await response.json();

    console.log("Saved to database:", data);
  }

  saveDeal();
}, [receipt]);
useEffect(() => {
  async function updateCompletedDeal() {
    if (!completeReceipt) return;

    const response = await fetch("/api/deals", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dealId: Number(dealId),
        status: "Completed",
      }),
    });

    const data = await response.json();

    console.log("Updated deal:", data);

    loadDeals();
  }

  updateCompletedDeal();
}, [completeReceipt]);
useEffect(() => {
  async function updateRefundedDeal() {
    if (!refundReceipt) return;

    const response = await fetch("/api/deals", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dealId: Number(dealId),
        status: "Refunded",
      }),
    });

    const data = await response.json();

    console.log("Refund updated:", data);

    loadDeals();
  }

  updateRefundedDeal();
}, [refundReceipt]);
async function loadDeals() {
  const res = await fetch("/api/deals");
  const data = await res.json();

  setSavedDeals(data);
}

useEffect(() => {
  loadDeals();
}, []);
if (!mounted) {
  return null;
}
  return (
    <div className="mx-auto mt-10 max-w-xl rounded-xl border p-6 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Create Escrow Deal
      </h1>


      {!address && (
        <p className="mb-4 text-yellow-600">
  Connect wallet to authorize blockchain transactions.
</p>
      )}


      <div className="space-y-4">

        <input
          type="text"
          placeholder="Seller Address"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
          className="w-full rounded-lg border p-3"
        />


        <input
          type="number"
          placeholder="Amount (USDC)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
<input
  type="number"
  placeholder="Deal ID"
  value={dealId}
  onChange={(e) => setDealId(e.target.value)}
  className="w-full rounded-lg border p-3"
/>
<button
  onClick={approveUSDC}
  disabled={isApproving}
  className="w-full rounded-lg bg-purple-600 p-3 text-white disabled:opacity-50"
>
  {isApproving
    ? "Approving..."
    : "Approve USDC"}
</button>
        <button
          onClick={createDeal}
          disabled={isPending || isConfirming}
          className="w-full rounded-lg bg-blue-600 p-3 text-white disabled:opacity-50"
        >
          {isPending
            ? "Confirm in wallet..."
            : isConfirming
            ? "Processing..."
            : "Create Deal"}
        </button>


        {hash && (
          <p className="break-all text-sm">
            Transaction:
            <br />
            {hash}
          </p>
        )}


        {isSuccess && (
          <p className="text-green-600">
            Deal created successfully!
          </p>
        )}

{deal && (
  <div className="mt-4 rounded-lg border p-4">

    <h2 className="mb-2 font-bold">
      Deal From Blockchain
    </h2>

    <p className="break-all">
      Buyer: {deal[0]}
    </p>

    <p className="break-all">
      Seller: {deal[1]}
    </p>

    <p>
      Amount: {Number(deal[2]) / 1e6} USDC
    </p>

    <p>
      Status: {Number(deal[3])}
    </p>
{Number(deal[3]) === 0 && (
  <>
    <button
      onClick={completeDeal}
      disabled={isPending || isConfirming}
      className="mt-4 w-full rounded-lg bg-green-600 p-3 text-white disabled:opacity-50"
    >
      {isCompleting
  ? "Waiting for confirmation..."
  : isPending
  ? "Confirm in wallet..."
  : isConfirming
  ? "Processing..."
  : "Complete Deal"}
    </button>

    <button
      onClick={refundDeal}
      disabled={isPending || isConfirming}
      className="mt-2 w-full rounded-lg bg-red-600 p-3 text-white disabled:opacity-50"
    >
      {isRefunding
  ? "Waiting for confirmation..."
  : isPending
  ? "Confirm in wallet..."
  : isConfirming
  ? "Processing..."
  : "Refund Deal"}
    </button>
  </>
)}

{Number(deal[3]) === 1 && (
  <p className="mt-4 text-green-600 font-bold">
    Status: Completed ✅
  </p>
)}

{Number(deal[3]) === 2 && (
  <p className="mt-4 text-red-600 font-bold">
    Status: Refunded ↩️
  </p>
)}
  </div>
)}
        {dealInfo && (
          <div className="mt-4 rounded-lg border p-4">

            <p>
              Deal ID: {dealInfo.dealId}
            </p>

            <p className="break-all">
              Buyer: {dealInfo.buyer}
            </p>

            <p className="break-all">
              Seller: {dealInfo.seller}
            </p>

            <p>
              Amount: {dealInfo.amount}
            </p>

          </div>
        )}


        {error && (
          <p className="text-red-600">
            {error.message}
          </p>
        )}
<div className="mt-8 rounded-lg border p-4">
  <h2 className="mb-4 text-xl font-bold">
    Saved Deals (Database)
  </h2>

  {savedDeals.length === 0 ? (
    <p>No deals found.</p>
  ) : (
    savedDeals.map((deal) => (
      <div
        key={deal.id}
        className="mb-4 rounded border p-3"
      >
        <h3 className="font-bold">
  Deal #{deal.dealId}
</h3>

<p>
  Buyer:
  <br />
  {deal.buyer.slice(0, 6)}...{deal.buyer.slice(-4)}
</p>

<p>
  Seller:
  <br />
  {deal.seller.slice(0, 6)}...{deal.seller.slice(-4)}
</p>

<p>
  Amount: {Number(deal.amount) / 1e6} USDC
</p>

<div className="mt-2">
  {deal.status === "Created" && (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
      🟡 Created
    </span>
  )}

  {deal.status === "Completed" && (
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
      🟢 Completed
    </span>
  )}

  {deal.status === "Refunded" && (
    <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
      🔴 Refunded
    </span>
  )}
</div>
    <a
      href={`https://testnet.arcscan.app/tx/${deal.txHash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 block text-sm text-blue-600 underline"
    >
      View Transaction ↗
    </a>
      </div>
    ))
  )}
</div>
      </div>
    </div>
  );
}