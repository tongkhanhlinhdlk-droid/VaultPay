export default function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
      <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm text-blue-300">
        Web3 Payments Made Simple
      </span>

      <h1 className="mt-8 text-5xl font-bold tracking-tight text-white md:text-6xl">
        Secure Crypto Payments
        <br />
        for Everyone
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-slate-400">
        VaultPay helps you send, receive and manage crypto payments securely
        with email login, Google authentication and wallet connectivity.
      </p>
    </section>
  );
}