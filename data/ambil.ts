// import {events, type Event} from "@/data/event";

// //pura -pura men agmbilo data dari database tyang agak lambat
// function jeda(ms: number) {
//     return new Promise((r) => setTimeout(r, ms));
// }

// export async function ambilEvents() {
//     await jeda(1500);
//     return events;
// }

// export async function ambilEvent(id: number) {
//     await jeda(800);
//     return events.find((e) => e.id === id);
// }

// export async function ambilTerkait(events: Event) {
//     await jeda(2000);
//     return events.filter((e) => e.kategori === event.kategori && e.id !== event.id);
// }


import { events, type Event } from "@/data/event";

// pura-pura mengambil data dari database yang agak lambat
function jeda(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function ambilEvents() {
  await jeda(1500);
//   throw new Error("database sedang mati");
  return events;
}

export async function ambilEvent(id: number) {
  await jeda(800);
  return events.find((e) => e.id === id);
}

export async function ambilTerkait(event: Event) {
  await jeda(2000);
  return events.filter(
    (e) => e.kategori === event.kategori && e.id !== event.id
  );
}