import ReceiveWallet from "@/components/ReceiveWallet";
import { getUSDCBalance } from "@/lib/blockchain";
import { prisma } from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs/server";
import CreateWalletButton from "@/components/CreateWalletButton";
import ViewOnExplorer from "@/components/ViewOnExplorer";
export default async function DashboardPage() {
  const user = await currentUser();
if (!user) {
  return null;
}
let dbUser = await prisma.user.findUnique({
  where: {
    clerkId: user.id,
  },
});

if (!dbUser) {
  dbUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      fullName: user.fullName,
    },
  });


} else {

}
let wallet = await prisma.wallet.findUnique({
  where: {
    userId: dbUser.id,
  },
});

const createdDeals = await prisma.deal.count({
  where: {
    status: "Created",
  },
});

const completedDeals = await prisma.deal.count({
  where: {
    status: "Completed",
  },
});

const refundedDeals = await prisma.deal.count({
  where: {
    status: "Refunded",
  },
});
const recentDeals = await prisma.deal.findMany({
  orderBy: {
    createdAt: "desc",
  },
  take: 5,
});
let balance = "0";

if (wallet) {
  balance = await getUSDCBalance(
    wallet.address as `0x${string}`
  );
}

if (wallet) {

}
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
  <h1 className="text-3xl font-bold">
    Welcome to VaultPay 👋
  </h1>
  <p className="text-gray-600 mt-2">
    Your Web3 payment dashboard
  </p>
</div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Account
          </h2>

          <p>
            Name: {user?.firstName} {user?.lastName}
          </p>

          <p>
            Email: {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
<div className="bg-white rounded-xl shadow p-6 mb-6">
  <h2 className="text-xl font-semibold mb-3">
    Wallet
  </h2>

  {wallet ? (
  <div className="space-y-4">
    <p className="break-all text-sm">
      {wallet.address}
    </p>

    <ReceiveWallet address={wallet.address} />
    <ViewOnExplorer address={wallet.address} />
  </div>
) : (
  <CreateWalletButton />
)}
</div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold">
              Wallet Balance
            </h3>
<p className="text-3xl font-bold mt-3">
  {balance} USDC
</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
  <h3 className="font-semibold mb-4">
    Escrow
  </h3>

  <p className="text-gray-600 mb-4">
    Create and manage secure USDC escrow deals.
  </p>

  <a
    href="/dashboard/escrow"
    className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  >
    Open Escrow
  </a>
</div>

          <div className="bg-white rounded-xl shadow p-6">
  <h3 className="font-semibold">
    Network
  </h3>

  <p className="text-gray-500 mt-3">
    Arc Testnet
  </p>

  <p className="text-gray-500">
    USDC Payments
  </p>
</div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-6">
  <h2 className="text-xl font-semibold mb-4">
    Escrow Overview
  </h2>

  <div className="space-y-3 mb-6">
    <div className="flex justify-between">
      <span>🟡 Created</span>
      <span className="font-semibold">{createdDeals}</span>
    </div>

    <div className="flex justify-between">
      <span>🟢 Completed</span>
      <span className="font-semibold">{completedDeals}</span>
    </div>

    <div className="flex justify-between">
      <span>🔴 Refunded</span>
      <span className="font-semibold">{refundedDeals}</span>
    </div>
  </div>

  <a
    href="/dashboard/escrow"
    className="inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
  >
    Open Escrow Dashboard
  </a>
</div>
<div className="bg-white rounded-xl shadow p-6 mt-6">
  <h2 className="text-xl font-semibold mb-4">
    Recent Escrow Deals
  </h2>

  {recentDeals.length === 0 ? (
    <p className="text-gray-500">
      No escrow deals yet.
    </p>
  ) : (
    <div className="space-y-3">
      {recentDeals.map((deal) => (
        <div
          key={deal.id}
          className="flex items-center justify-between border-b pb-2"
        >
          <div>
            <p className="font-semibold">
              Deal #{deal.dealId}
            </p>

            <p className="text-sm text-gray-500">
              {Number(deal.amount) / 1e6} USDC
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm ${
              deal.status === "Created"
                ? "bg-yellow-100 text-yellow-700"
                : deal.status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {deal.status}
          </span>
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </main>
  );
}