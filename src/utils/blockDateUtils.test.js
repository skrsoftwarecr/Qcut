import { describe, it, expect } from 'vitest';
import {
  parseDateStringToLocal,
  normalizeDateToLocalNoon,
  timeRangesOverlap,
  isDayFullyBlocked,
  isSlotBlocked
} from './blockDateUtils';
import { isSameDay } from 'date-fns';

// ══════════════════════════════════════════════════════════════
// parseDateStringToLocal
// ══════════════════════════════════════════════════════════════

describe('parseDateStringToLocal', () => {
  it('parses "2026-03-02" as March 2nd in local time, NOT March 1st', () => {
    const result = parseDateStringToLocal('2026-03-02');
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(2); // 0-indexed: March = 2
    expect(result.getDate()).toBe(2);  // THE CRITICAL CHECK — must be 2, not 1
  });

  it('parses "2026-01-01" as January 1st, not December 31st', () => {
    const result = parseDateStringToLocal('2026-01-01');
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });

  it('parses "2026-12-31" correctly at year boundary', () => {
    const result = parseDateStringToLocal('2026-12-31');
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(11);
    expect(result.getDate()).toBe(31);
  });

  it('returns null for null/undefined/empty inputs', () => {
    expect(parseDateStringToLocal(null)).toBeNull();
    expect(parseDateStringToLocal(undefined)).toBeNull();
    expect(parseDateStringToLocal('')).toBeNull();
  });

  it('sets time to noon (12:00) to prevent timezone drift', () => {
    const result = parseDateStringToLocal('2026-06-15');
    expect(result.getHours()).toBe(12);
    expect(result.getMinutes()).toBe(0);
  });
});

// ══════════════════════════════════════════════════════════════
// normalizeDateToLocalNoon
// ══════════════════════════════════════════════════════════════

describe('normalizeDateToLocalNoon', () => {
  it('normalizes a Date object to local noon of the same day', () => {
    const input = new Date(2026, 2, 2, 0, 0, 0); // March 2, midnight local
    const result = normalizeDateToLocalNoon(input);
    expect(result.getDate()).toBe(2);
    expect(result.getHours()).toBe(12);
  });

  it('normalizes a UTC midnight Date to correct local day', () => {
    // Simulating what Firestore Timestamp.toDate() returns for a UTC midnight
    const utcMidnight = new Date('2026-03-02T00:00:00Z');
    const result = normalizeDateToLocalNoon(utcMidnight);
    // After normalization, should be whatever LOCAL day that UTC midnight falls on
    // then set to noon of that day
    expect(result.getHours()).toBe(12);
    expect(result.getMinutes()).toBe(0);
  });

  it('normalizes a yyyy-MM-dd string to correct local date', () => {
    const result = normalizeDateToLocalNoon('2026-03-02');
    expect(result.getDate()).toBe(2);
    expect(result.getMonth()).toBe(2);
    expect(result.getHours()).toBe(12);
  });

  it('normalizes a Firestore-like Timestamp object', () => {
    const fakeTimestamp = {
      toDate: () => new Date('2026-03-02T06:00:00Z')
    };
    const result = normalizeDateToLocalNoon(fakeTimestamp);
    expect(result.getHours()).toBe(12);
  });

  it('returns a valid date for null/undefined input', () => {
    const result = normalizeDateToLocalNoon(null);
    expect(result instanceof Date).toBe(true);
    expect(isNaN(result.getTime())).toBe(false);
  });
});

// ══════════════════════════════════════════════════════════════
// timeRangesOverlap
// ══════════════════════════════════════════════════════════════

describe('timeRangesOverlap', () => {
  it('detects full overlap (slot inside block)', () => {
    expect(timeRangesOverlap('10:00', '10:30', '09:00', '12:00')).toBe(true);
  });

  it('detects partial overlap (slot starts before block ends)', () => {
    expect(timeRangesOverlap('11:30', '12:30', '10:00', '12:00')).toBe(true);
  });

  it('detects partial overlap (slot ends after block starts)', () => {
    expect(timeRangesOverlap('09:00', '10:30', '10:00', '12:00')).toBe(true);
  });

  it('returns false when slot is completely before block', () => {
    expect(timeRangesOverlap('08:00', '09:00', '10:00', '12:00')).toBe(false);
  });

  it('returns false when slot is completely after block', () => {
    expect(timeRangesOverlap('13:00', '14:00', '10:00', '12:00')).toBe(false);
  });

  it('returns false when slot ends exactly at block start (adjacent, no overlap)', () => {
    expect(timeRangesOverlap('09:00', '10:00', '10:00', '12:00')).toBe(false);
  });

  it('returns false when slot starts exactly at block end (adjacent, no overlap)', () => {
    expect(timeRangesOverlap('12:00', '13:00', '10:00', '12:00')).toBe(false);
  });

  it('returns false for null/missing inputs', () => {
    expect(timeRangesOverlap(null, '10:00', '09:00', '12:00')).toBe(false);
    expect(timeRangesOverlap('10:00', null, '09:00', '12:00')).toBe(false);
  });

  it('handles single-minute overlap', () => {
    // Block 10:00-11:00, slot 10:59-11:29 — overlaps by 1 minute
    expect(timeRangesOverlap('10:59', '11:29', '10:00', '11:00')).toBe(true);
  });
});

// ══════════════════════════════════════════════════════════════
// isDayFullyBlocked
// ══════════════════════════════════════════════════════════════

describe('isDayFullyBlocked', () => {
  const march2 = new Date(2026, 2, 2, 12, 0, 0);
  const march3 = new Date(2026, 2, 3, 12, 0, 0);

  const blocks = [
    {
      barberId: 'barber-1',
      tipo: 'dia_completo',
      fecha: new Date(2026, 2, 2, 12, 0, 0)
    },
    {
      barberId: 'barber-2',
      tipo: 'dia_completo',
      fecha: new Date(2026, 2, 3, 12, 0, 0)
    },
    {
      barberId: 'barber-1',
      tipo: 'horas_especificas',
      fecha: new Date(2026, 2, 3, 12, 0, 0),
      horaInicio: '10:00',
      horaFin: '12:00'
    }
  ];

  it('returns true when barber has a dia_completo block on that day', () => {
    expect(isDayFullyBlocked(blocks, 'barber-1', march2, isSameDay)).toBe(true);
  });

  it('returns false when barber does NOT have a block on that day', () => {
    expect(isDayFullyBlocked(blocks, 'barber-1', march3, isSameDay)).toBe(false);
  });

  it('returns false for a different barber on a blocked day', () => {
    expect(isDayFullyBlocked(blocks, 'barber-2', march2, isSameDay)).toBe(false);
  });

  it('returns false for horas_especificas blocks (not full-day)', () => {
    // barber-1 has an horas_especificas block on March 3, not dia_completo
    expect(isDayFullyBlocked(blocks, 'barber-1', march3, isSameDay)).toBe(false);
  });

  it('returns false for empty blocks array', () => {
    expect(isDayFullyBlocked([], 'barber-1', march2, isSameDay)).toBe(false);
  });

  it('returns false for null blocks', () => {
    expect(isDayFullyBlocked(null, 'barber-1', march2, isSameDay)).toBe(false);
  });
});

// ══════════════════════════════════════════════════════════════
// isSlotBlocked
// ══════════════════════════════════════════════════════════════

describe('isSlotBlocked', () => {
  const march2 = new Date(2026, 2, 2, 12, 0, 0);
  const march3 = new Date(2026, 2, 3, 12, 0, 0);

  const blocks = [
    {
      barberId: 'barber-1',
      tipo: 'dia_completo',
      fecha: new Date(2026, 2, 2, 12, 0, 0)
    },
    {
      barberId: 'barber-1',
      tipo: 'horas_especificas',
      fecha: new Date(2026, 2, 3, 12, 0, 0),
      horaInicio: '10:00',
      horaFin: '12:00'
    },
    {
      barberId: 'barber-2',
      tipo: 'horas_especificas',
      fecha: new Date(2026, 2, 3, 12, 0, 0),
      horaInicio: '14:00',
      horaFin: '16:00'
    }
  ];

  it('blocks ALL slots on a dia_completo day', () => {
    expect(isSlotBlocked(blocks, 'barber-1', march2, '09:00', '09:30', isSameDay)).toBe(true);
    expect(isSlotBlocked(blocks, 'barber-1', march2, '12:00', '12:30', isSameDay)).toBe(true);
    expect(isSlotBlocked(blocks, 'barber-1', march2, '17:00', '17:30', isSameDay)).toBe(true);
  });

  it('blocks slots within the horas_especificas range', () => {
    expect(isSlotBlocked(blocks, 'barber-1', march3, '10:00', '10:30', isSameDay)).toBe(true);
    expect(isSlotBlocked(blocks, 'barber-1', march3, '11:00', '11:30', isSameDay)).toBe(true);
    expect(isSlotBlocked(blocks, 'barber-1', march3, '11:30', '12:00', isSameDay)).toBe(true);
  });

  it('does NOT block slots outside the horas_especificas range', () => {
    expect(isSlotBlocked(blocks, 'barber-1', march3, '09:00', '09:30', isSameDay)).toBe(false);
    expect(isSlotBlocked(blocks, 'barber-1', march3, '12:00', '12:30', isSameDay)).toBe(false);
    expect(isSlotBlocked(blocks, 'barber-1', march3, '14:00', '14:30', isSameDay)).toBe(false);
  });

  it('does NOT block slots for a different barber', () => {
    expect(isSlotBlocked(blocks, 'barber-2', march2, '10:00', '10:30', isSameDay)).toBe(false);
    expect(isSlotBlocked(blocks, 'barber-2', march3, '10:00', '10:30', isSameDay)).toBe(false);
  });

  it('correctly blocks barber-2 in their own hour range', () => {
    expect(isSlotBlocked(blocks, 'barber-2', march3, '14:00', '14:30', isSameDay)).toBe(true);
    expect(isSlotBlocked(blocks, 'barber-2', march3, '15:30', '16:00', isSameDay)).toBe(true);
  });

  it('handles empty blocks gracefully', () => {
    expect(isSlotBlocked([], 'barber-1', march2, '10:00', '10:30', isSameDay)).toBe(false);
  });

  it('handles null blocks gracefully', () => {
    expect(isSlotBlocked(null, 'barber-1', march2, '10:00', '10:30', isSameDay)).toBe(false);
  });
});

// ══════════════════════════════════════════════════════════════
// Integration: The full scenario that was buggy
// ══════════════════════════════════════════════════════════════

describe('Timezone regression: blocking March 2 must NOT show as March 1', () => {
  it('parseDateStringToLocal("2026-03-02") isSameDay with March 2 local', () => {
    const parsed = parseDateStringToLocal('2026-03-02');
    const march2Local = new Date(2026, 2, 2, 15, 0, 0); // March 2 at 3pm local
    expect(isSameDay(parsed, march2Local)).toBe(true);
  });

  it('parseDateStringToLocal("2026-03-02") is NOT same day as March 1', () => {
    const parsed = parseDateStringToLocal('2026-03-02');
    const march1Local = new Date(2026, 2, 1, 15, 0, 0); // March 1
    expect(isSameDay(parsed, march1Local)).toBe(false);
  });

  it('full flow: block created for March 2 blocks March 2 slots, not March 1', () => {
    // Simulate what happens in the app:
    // 1. User selects March 2 in the date picker → "2026-03-02"
    // 2. parseDateStringToLocal converts it
    // 3. Block is stored with that date
    // 4. getBarberBlocks normalizes it
    // 5. BookingPage checks with isSameDay

    const datePickerValue = '2026-03-02';
    const storedDate = parseDateStringToLocal(datePickerValue);
    const normalizedDate = normalizeDateToLocalNoon(storedDate);

    const blocks = [{
      barberId: 'barber-1',
      tipo: 'dia_completo',
      fecha: normalizedDate
    }];

    const march1 = new Date(2026, 2, 1, 12, 0, 0);
    const march2 = new Date(2026, 2, 2, 12, 0, 0);
    const march3 = new Date(2026, 2, 3, 12, 0, 0);

    // March 2 MUST be blocked
    expect(isDayFullyBlocked(blocks, 'barber-1', march2, isSameDay)).toBe(true);
    // March 1 MUST NOT be blocked
    expect(isDayFullyBlocked(blocks, 'barber-1', march1, isSameDay)).toBe(false);
    // March 3 MUST NOT be blocked
    expect(isDayFullyBlocked(blocks, 'barber-1', march3, isSameDay)).toBe(false);
  });
});
