const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';

/** Token URL-safe de 32 caracteres usando CSPRNG del navegador o Node. */
export function generateConfirmationToken() {
  const bytes = new Uint8Array(32);
  const cryptoObj = typeof globalThis !== 'undefined' ? globalThis.crypto : null;
  if (!cryptoObj || !cryptoObj.getRandomValues) {
    throw new Error('crypto.getRandomValues no disponible');
  }
  cryptoObj.getRandomValues(bytes);
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += CHARSET.charAt(bytes[i] % CHARSET.length);
  }
  return token;
}
