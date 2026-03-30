// Prueba de solapamiento de bloqueos (Bug 1)
const duration = 30; // duración de la cita en minutos
const timeString = "12:00"; // hora que el cliente quiere

const [hours, mins] = timeString.split(":").map(Number);
const minutes = hours * 60 + mins;

// Simulación de bloqueos (bloqueo_parcial de 12:15 a 13:00)
const block = {
  horaInicio: "12:15",
  horaFin: "13:00"
};

// LÓGICA ANTERIOR (Bug):
// Solo validaba si timeString estaba estrictamente dentro del bloqueo
const isBlockedOld = timeString >= block.horaInicio && timeString < block.horaFin;

// LÓGICA NUEVA (Fix):
// Calcula el final del slot y revisa solapamiento
const slotEndMinutes = minutes + duration; // 12:30 (12:00 + 30 min)
const h = Math.floor(slotEndMinutes / 60);
const m = slotEndMinutes % 60;
const slotEndString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

const isBlockedNew = timeString < block.horaFin && slotEndString > block.horaInicio;

console.log("=== TEST DE SOLAPAMIENTO DE BLOQUEOS (BUG 1) ===");
console.log("El cliente intenta reservar a las:", timeString);
console.log("Duración de la cita:", duration, "minutos");
console.log("El slot de la cita es de:", timeString, "a", slotEndString);
console.log("El barbero tiene un bloqueo manual de:", block.horaInicio, "a", block.horaFin);
console.log("-----------------------------------------");
console.log("¿Estaba bloqueado con la lógica ANTERIOR?:", isBlockedOld ? "SÍ 🚫" : "NO ✅ (Este era el BUG)");
console.log("¿Está bloqueado con la lógica NUEVA (Fix)?:", isBlockedNew ? "SÍ 🚫 (Corregido)" : "NO ✅");
