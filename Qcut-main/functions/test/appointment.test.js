const { describe, it, expect } = require('vitest');
const { sanitizeString, sanitizePhone, assertBusinessId, docToPlain } = require('../appointmentPublic');

// ══════════════════════════════════════════════════════════════
// Input Sanitization
// ══════════════════════════════════════════════════════════════

describe('sanitizeString', () => {
  it('removes HTML tags', () => {
    expect(sanitizeString('<script>alert("xss")</script>Hello')).toBe('scriptalert(xss)/scriptHello');
  });

  it('removes dangerous characters', () => {
    expect(sanitizeString('Hello <world> "test" `code`')).toBe('Hello world test code');
  });

  it('trims whitespace', () => {
    expect(sanitizeString('  hello  ')).toBe('hello');
  });

  it('enforces max length', () => {
    const long = 'a'.repeat(300);
    expect(sanitizeString(long, 100).length).toBe(100);
  });

  it('handles non-string input', () => {
    expect(sanitizeString(null)).toBe('');
    expect(sanitizeString(undefined)).toBe('');
    expect(sanitizeString(123)).toBe('');
  });

  it('preserves safe text with accents', () => {
    expect(sanitizeString('José García')).toBe('José García');
  });
});

describe('sanitizePhone', () => {
  it('allows valid phone numbers', () => {
    expect(sanitizePhone('+1 234 567 8901')).toBe('+1 234 567 8901');
    expect(sanitizePhone('(506) 8888-9999')).toBe('(506) 8888-9999');
  });

  it('removes invalid characters from phone', () => {
    expect(sanitizePhone('123abc456')).toBe('123456');
  });

  it('handles non-string input', () => {
    expect(sanitizePhone(null)).toBe('');
    expect(sanitizePhone(12345)).toBe('');
  });

  it('limits phone length', () => {
    const long = '1'.repeat(50);
    expect(sanitizePhone(long).length).toBeLessThanOrEqual(32);
  });
});

// ══════════════════════════════════════════════════════════════
// Business ID Validation
// ══════════════════════════════════════════════════════════════

describe('assertBusinessId', () => {
  it('accepts valid business IDs', () => {
    expect(() => assertBusinessId('abc123')).not.toThrow();
    expect(() => assertBusinessId('user_id-test')).not.toThrow();
  });

  it('rejects empty or null business IDs', () => {
    expect(() => assertBusinessId('')).toThrow();
    expect(() => assertBusinessId(null)).toThrow();
    expect(() => assertBusinessId(undefined)).toThrow();
  });

  it('rejects business IDs with special characters (NoSQL injection prevention)', () => {
    expect(() => assertBusinessId('../../admin')).toThrow();
    expect(() => assertBusinessId('test/../../etc')).toThrow();
    expect(() => assertBusinessId('id with spaces')).toThrow();
  });

  it('rejects overly long IDs', () => {
    expect(() => assertBusinessId('a'.repeat(200))).toThrow();
  });
});

// ══════════════════════════════════════════════════════════════
// docToPlain
// ══════════════════════════════════════════════════════════════

describe('docToPlain', () => {
  it('converts Firestore Timestamp fields to ISO strings', () => {
    const mockDate = new Date('2026-03-15T10:00:00Z');
    const mockDoc = {
      id: 'test-123',
      data: () => ({
        name: 'Juan',
        date: { toDate: () => mockDate },
        status: 'pending'
      })
    };
    const result = docToPlain(mockDoc);
    expect(result.id).toBe('test-123');
    expect(result.name).toBe('Juan');
    expect(result.date).toBe(mockDate.toISOString());
    expect(result.status).toBe('pending');
  });

  it('preserves non-timestamp values as-is', () => {
    const mockDoc = {
      id: 'abc',
      data: () => ({
        count: 42,
        active: true,
        tags: ['a', 'b']
      })
    };
    const result = docToPlain(mockDoc);
    expect(result.count).toBe(42);
    expect(result.active).toBe(true);
    expect(result.tags).toEqual(['a', 'b']);
  });

  it('handles null values correctly', () => {
    const mockDoc = {
      id: 'test',
      data: () => ({
        note: null,
        name: 'Test'
      })
    };
    const result = docToPlain(mockDoc);
    expect(result.note).toBeNull();
    expect(result.name).toBe('Test');
  });
});
