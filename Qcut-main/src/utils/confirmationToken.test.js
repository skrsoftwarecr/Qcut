import { describe, it, expect } from 'vitest';
import { generateConfirmationToken } from './confirmationToken';

const CHARSET = /^[A-Za-z0-9]+$/;

describe('generateConfirmationToken', () => {
  it('genera 32 caracteres del alfabeto esperado', () => {
    const t = generateConfirmationToken();
    expect(t).toHaveLength(32);
    expect(t).toMatch(CHARSET);
  });

  it('dos tokens suelen diferir (aleatoriedad)', () => {
    const a = generateConfirmationToken();
    const b = generateConfirmationToken();
    expect(a).not.toBe(b);
  });
});
