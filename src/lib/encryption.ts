import crypto from "crypto";

const algorithm = "aes-256-cbc";

const key = crypto
  .createHash("sha256")
  .update(process.env.WALLET_ENCRYPTION_KEY!)
  .digest();

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    algorithm,
    key,
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(text),
    cipher.final(),
  ]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}
export function decrypt(encryptedText: string) {
  const [ivHex, encryptedHex] = encryptedText.split(":");

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
}