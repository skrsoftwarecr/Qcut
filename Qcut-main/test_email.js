// Simular ejecución de Google Apps Script para Bug 2 y 3

function formatTimeToString(appointmentDate) {
  const dateObj = new Date(appointmentDate);
  if (isNaN(dateObj.getTime())) return '';
  const offsetMs = 6 * 60 * 60 * 1000; // Ajuste manual de zona horaria de Costa Rica (o donde corresponda en el script original)
  const crDate = new Date(dateObj.getTime() + offsetMs);
  const hour = crDate.getUTCHours();
  const mins = ('0' + crDate.getUTCMinutes()).slice(-2);
  const timeString = ('0' + hour).slice(-2) + ':' + mins;
  
  // LOGICA APLICADA
  const [hours, minutes] = timeString.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${minutes} ${ampm}`
}

console.log("=== TEST FORMATO DE HORA (BUG 2) ===");
console.log("Hora enviada (Ej: 14:30 ISO):", formatTimeToString("2026-03-24T14:30:00.000Z"));
console.log("Hora enviada (Ej: 09:15 ISO):", formatTimeToString("2026-03-24T09:15:00.000Z"));
console.log("-----------------------------------------");
