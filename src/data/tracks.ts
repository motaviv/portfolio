// Metadados das trilhas — Nav e /projetos leem esse arquivo pra gerar os cards/filtros.
// Pra adicionar uma trilha nova no futuro: (1) adiciona o novo valor no tipo "track" em projects.ts,
// (2) adiciona uma entrada aqui. Nenhum outro arquivo precisa ser tocado — Nav, menu suspenso e
// filtro de /projetos já iteram sobre essa lista automaticamente.

export type TrackId = "digital" | "social";

export type TrackMeta = {
  id: TrackId;
  label: { pt: string; en: string };
  icon: "gear" | "leaf";
};

export const tracks: TrackMeta[] = [
  { id: "digital", label: { pt: "Soluções Digitais", en: "Digital Solutions" }, icon: "gear" },
  { id: "social", label: { pt: "Pesquisa & Impacto Social", en: "Research & Social Impact" }, icon: "leaf" },
];
