import SendForm from "@/components/SendForm";
import ReceiveWallet from "@/components/ReceiveWallet";
import { getEthBalance } from "@/lib/blockchain";
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
const transactions = await prisma.transaction.findMany({
  where: {
    userId: dbUser.id,
  },
  orderBy: {
    createdAt: "desc",
  },
});
let balance = "0";

if (wallet) {
  balance = await getEthBalance(
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
  {balance} ETH
</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
  <h3 className="font-semibold mb-4">
    Send ETH
  </h3>

  <SendForm />
</div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold">
              Receive Payment
            </h3>
            <p className="text-gray-500 mt-3">
              Receive funds instantly
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-6">
  <h2 className="text-xl font-semibold mb-4">
    Transaction History
  </h2>

  {transactions.length === 0 ? (
    <p className="text-gray-500">
      No transactions yet.
    </p>
  ) : (
    <div className="space-y-4">
      {transactions.map((tx) => (
  <div
    key={tx.id}
    className="border rounded-lg p-4 space-y-2"
  >
    <div className="flex justify-between">
      <p className="font-semibold">
        Sent {tx.amount} ETH
      </p>

      <span className="text-green-600 text-sm">
        {tx.status}
      </span>
    </div>

    <p className="text-sm">
      To:{" "}
      <span className="font-mono">
        {tx.to.slice(0, 6)}
        ...
        {tx.to.slice(-4)}
      </span>
    </p>

    <p className="text-sm text-gray-500">
      {new Date(tx.createdAt).toLocaleString()}
    </p>

    <a
      href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline text-sm"
    >
      View on Etherscan
    </a>
  </div>
))}
    </div>
  )}
</div>

      </div>
    </main>
  );
}