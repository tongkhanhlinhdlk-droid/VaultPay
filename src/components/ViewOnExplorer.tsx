type Props = {
  address: string;
};

export default function ViewOnExplorer({ address }: Props) {
  const explorerUrl = `https://testnet.arcscan.app/address/${address}`;

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      🔗 View on ArcScan
    </a>
  );
}