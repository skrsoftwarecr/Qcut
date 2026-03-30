/**
 * Utility functions for block date handling.
 * Extracted for testability and single-source-of-truth date logic.
 */

/**
 * Parse a date string (yyyy-MM-dd) to a local noon Date.
 * This prevents timezone drift: new Date("2026-03-02") is UTC midnight
 * which becomes March 1 in UTC-6. Using T12:00:00 keeps it March 2.
 */
export function parseDateStringToLocal(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  return new Date(dateStr + 'T12:00:00');
}

/**
 * Normalize any date value (Date, Firestore Timestamp, string)
 * to local noon of that day. This ensures isSameDay comparisons
 * work regardless of timezone.
 */
export function normalizeDateToLocalNoon(dateValue) {
  let d;
  if (!dateValue) return new Date();
  if (dateValue?.toDate) {
    d = dateValue.toDate(); // Firestore Timestamp
  } else if (typeof dateValue === 'string') {
    // If it looks like yyyy-MM-dd, parse as local
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      return parseDateStringToLocal(dateValue);
    }
    d = new Date(dateValue);
  } else if (dateValue instanceof Date) {
    d = dateValue;
  } else {
    d = new Date(dateValue);
  }
  // Normalize to local noon
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
}

/**
 * Check if a time slot overlaps with a block's time range.
 * Used for 'horas_especificas' blocks.
 * 
 * @param {string} slotStart - HH:mm format (e.g., "10:00")
 * @param {string} slotEnd - HH:mm format (e.g., "10:30")
 * @param {string} blockStart - HH:mm format (e.g., "09:00")
 * @param {string} blockEnd - HH:mm format (e.g., "11:00")
 * @returns {boolean} true if there's any overlap
 */
export function timeRangesOverlap(slotStart, slotEnd, blockStart, blockEnd) {
  if (!slotStart || !slotEnd || !blockStart || !blockEnd) return false;
  return slotStart < blockEnd && slotEnd > blockStart;
}

/**
 * Check if a given day is fully blocked for a specific barber.
 * @param {Array} blocks - Array of block objects from getBarberBlocks
 * @param {string} barberId - The barber's ID
 * @param {Date} date - The date to check
 * @param {Function} isSameDayFn - date-fns isSameDay function
 * @returns {boolean}
 */
export function isDayFullyBlocked(blocks, barberId, date, isSameDayFn) {
  if (!blocks || !blocks.length) return false;
  return blocks.some(block =>
    block.barberId === barberId &&
    block.tipo === 'dia_completo' &&
    isSameDayFn(block.fecha, date)
  );
}

/**
 * Check if a specific time slot is blocked for a barber on a given date.
 * @param {Array} blocks - Array of block objects from getBarberBlocks
 * @param {string} barberId - The barber's ID
 * @param {Date} date - The date to check
 * @param {string} slotStart - HH:mm format
 * @param {string} slotEnd - HH:mm format
 * @param {Function} isSameDayFn - date-fns isSameDay function
 * @returns {boolean}
 */
export function isSlotBlocked(blocks, barberId, date, slotStart, slotEnd, isSameDayFn) {
  if (!blocks || !blocks.length) return false;
  return blocks.some(block => {
    if (block.barberId !== barberId) return false;
    if (!isSameDayFn(block.fecha, date)) return false;
    if (block.tipo === 'dia_completo') return true;
    return timeRangesOverlap(slotStart, slotEnd, block.horaInicio, block.horaFin);
  });
}
