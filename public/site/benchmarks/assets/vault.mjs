// Physical AI Index vault: the published scores are gzip + AES-GCM, keyed from a password with PBKDF2-SHA256.
// Works in browsers and in Node (tests, scripts/encrypt-benchmarks.mjs).
const ITER = 310000;
const b64 = (bytes) => {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};
const u8 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const pipe = async (bytes, stream) => new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());

export async function deriveKey(envelope, password) {
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: u8(envelope.salt), iterations: envelope.iter }, base, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
}

export async function openWithKey(envelope, key) {
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: u8(envelope.iv) }, key, u8(envelope.ct));
  return JSON.parse(new TextDecoder().decode(await pipe(new Uint8Array(plain), new DecompressionStream("gzip"))));
}

export async function openVault(envelope, password) {
  return openWithKey(envelope, await deriveKey(envelope, password));
}

export async function sealVault(data, password, iter = ITER) {
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  const envelope = { v: 1, kdf: "PBKDF2-SHA256", cipher: "AES-GCM", iter, salt: b64(salt), iv: b64(iv) };
  const key = await deriveKey(envelope, password);
  const packed = await pipe(new TextEncoder().encode(JSON.stringify(data)), new CompressionStream("gzip"));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, packed));
  return { ...envelope, ct: b64(ct) };
}

// The derived key is kept per browser so one unlock covers every benchmark page.
export const exportKey = async (key) => b64(new Uint8Array(await crypto.subtle.exportKey("raw", key)));
export const importKey = (raw) => crypto.subtle.importKey("raw", u8(raw), "AES-GCM", false, ["decrypt"]);
