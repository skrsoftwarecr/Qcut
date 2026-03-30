import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockUpdateDoc, mockGetDocs, mockTimestampNow } = vi.hoisted(() => ({
  mockUpdateDoc: vi.fn(),
  mockGetDocs: vi.fn(),
  mockTimestampNow: vi.fn(() => ({ seconds: 1000 }))
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn((_db, ...segments) => ({ _path: segments.join('/') })),
  doc: vi.fn((_db, ...segments) => ({ _path: segments.join('/') })),
  getDoc: vi.fn(),
  updateDoc: mockUpdateDoc,
  collectionGroup: vi.fn(),
  query: vi.fn((...args) => args),
  where: vi.fn((...args) => args),
  limit: vi.fn((n) => n),
  getDocs: mockGetDocs,
  Timestamp: { now: mockTimestampNow }
}));

vi.mock('./config', () => ({ db: {} }));
vi.mock('../utils/confirmationToken', () => ({
  generateConfirmationToken: vi.fn(() => 'new-token-abc')
}));

import {
  getAppointmentByConfirmationToken,
  confirmAppointmentByToken,
  cancelAppointmentByToken
} from './appointmentConfirmation';

const futureExpiry = { toDate: () => new Date(Date.now() + 86400000) };

const makeSnap = (data) => ({
  empty: false,
  docs: [{
    id: 'appt1',
    ref: { parent: { parent: { id: 'biz1' } } },
    data: () => data
  }]
});

describe('flujo público de confirmación (Firestore directo)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateDoc.mockResolvedValue(undefined);
  });

  it('getAppointmentByConfirmationToken retorna canConfirm=true cuando barbero confirmó', async () => {
    mockGetDocs.mockResolvedValue(makeSnap({
      status: 'confirmed',
      confirmationStatus: 'not_requested',
      confirmationToken: 'tok1',
      confirmationTokenExpiry: futureExpiry,
      clientName: 'Luis',
      barberName: 'Ana',
      date: { toDate: () => new Date('2026-04-01T14:00:00') },
      time: '2:00 PM'
    }));
    const r = await getAppointmentByConfirmationToken('tok1', 'biz1');
    expect(r.success).toBe(true);
    expect(r.data.canConfirm).toBe(true);
    expect(r.data.canCancel).toBe(true);
  });

  it('getAppointmentByConfirmationToken retorna canConfirm=false si barbero no ha confirmado', async () => {
    mockGetDocs.mockResolvedValue(makeSnap({
      status: 'pending',
      confirmationStatus: 'not_requested',
      confirmationToken: 'tok2',
      confirmationTokenExpiry: futureExpiry,
      clientName: 'Luis',
      barberName: 'Ana',
      date: { toDate: () => new Date('2026-04-01T14:00:00') },
      time: '2:00 PM'
    }));
    const r = await getAppointmentByConfirmationToken('tok2', 'biz1');
    expect(r.success).toBe(true);
    expect(r.data.canConfirm).toBe(false);
  });

  it('confirmAppointmentByToken actualiza confirmationStatus a confirmed', async () => {
    mockGetDocs.mockResolvedValue(makeSnap({
      status: 'confirmed',
      confirmationStatus: 'not_requested',
      confirmationToken: 'tok3',
      confirmationTokenExpiry: futureExpiry
    }));
    const r = await confirmAppointmentByToken('tok3', 'biz1');
    expect(r.success).toBe(true);
    expect(mockUpdateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ confirmationStatus: 'confirmed' })
    );
  });

  it('confirmAppointmentByToken falla si barbero no ha confirmado', async () => {
    mockGetDocs.mockResolvedValue(makeSnap({
      status: 'pending',
      confirmationStatus: 'not_requested',
      confirmationToken: 'tok4',
      confirmationTokenExpiry: futureExpiry
    }));
    const r = await confirmAppointmentByToken('tok4', 'biz1');
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/barbero/i);
    expect(mockUpdateDoc).not.toHaveBeenCalled();
  });

  it('cancelAppointmentByToken actualiza status a cancelled', async () => {
    mockGetDocs.mockResolvedValue(makeSnap({
      status: 'confirmed',
      confirmationStatus: 'not_requested',
      confirmationToken: 'tok5',
      confirmationTokenExpiry: futureExpiry
    }));
    const r = await cancelAppointmentByToken('tok5', 'biz1');
    expect(r.success).toBe(true);
    expect(mockUpdateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ status: 'cancelled', cancelledBy: 'client' })
    );
  });
});

