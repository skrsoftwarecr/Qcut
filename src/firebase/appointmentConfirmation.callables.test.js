import { describe, it, expect, vi, beforeEach } from 'vitest';

const { callHttps } = vi.hoisted(() => ({
  callHttps: vi.fn()
}));

vi.mock('./functionsClient', () => ({
  callHttps
}));

import {
  getAppointmentByConfirmationToken,
  confirmAppointmentByToken,
  cancelAppointmentByToken
} from './appointmentConfirmation';

describe('flujo público de confirmación (callables)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAppointmentByConfirmationToken delega en appointmentGetByToken', async () => {
    callHttps.mockResolvedValue({
      success: true,
      data: {
        id: 'ap1',
        businessId: 'biz1',
        date: '2026-03-01T10:00:00.000Z',
        time: '10:00',
        barberName: 'Ana',
        clientName: 'Luis'
      }
    });
    const r = await getAppointmentByConfirmationToken('tok1');
    expect(callHttps).toHaveBeenCalledWith('appointmentGetByToken', { token: 'tok1' });
    expect(r.success).toBe(true);
    expect(r.data.date).toBeInstanceOf(Date);
    expect(r.data.barberName).toBe('Ana');
  });

  it('confirmAppointmentByToken usa appointmentConfirmByToken', async () => {
    callHttps.mockResolvedValue({ success: true, appointmentId: 'a', businessId: 'b' });
    const r = await confirmAppointmentByToken('tok2');
    expect(callHttps).toHaveBeenCalledWith('appointmentConfirmByToken', { token: 'tok2' });
    expect(r.success).toBe(true);
    expect(r.appointmentId).toBe('a');
  });

  it('cancelAppointmentByToken usa appointmentCancelByToken', async () => {
    callHttps.mockResolvedValue({ success: true, appointmentId: 'a', businessId: 'b' });
    const r = await cancelAppointmentByToken('tok3');
    expect(callHttps).toHaveBeenCalledWith('appointmentCancelByToken', { token: 'tok3' });
    expect(r.success).toBe(true);
  });
});
