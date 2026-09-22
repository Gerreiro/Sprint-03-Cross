import { NivelRisco, StatusOcorrencia } from "../types/Ocorrencia";

export const CORES = {
  verde:       "#1A3A2E",
  verdeClaro:  "#1D9E75",
  fundo:       "#F2F4F3",
  fundoCard:   "#FFFFFF",
  borda:       "#E0E8E2",
  textoP:      "#1A1A1A",
  textoS:      "#6B7B6E",
  textoT:      "#9BA8A0",
};

export const RISCO_CONFIG: Record<NivelRisco, { bg: string; texto: string; borda: string; label: string; icon: string }> = {
  baixo: { bg: "#EAF3DE", texto: "#27500A", borda: "#97C459", label: "Baixo", icon: "✓" },
  medio: { bg: "#FAEEDA", texto: "#633806", borda: "#EF9F27", label: "Médio", icon: "!" },
  alto:  { bg: "#FCEBEB", texto: "#A32D2D", borda: "#E24B4A", label: "Alto",  icon: "⚠" },
};

export const STATUS_CONFIG: Record<StatusOcorrencia, { bg: string; texto: string; label: string }> = {
  pendente:     { bg: "#FCEBEB", texto: "#A32D2D", label: "Pendente" },
  em_andamento: { bg: "#FAEEDA", texto: "#854F0B", label: "Em andamento" },
  resolvido:    { bg: "#EAF3DE", texto: "#27500A", label: "Resolvido ✓" },
};

export function formatarData(dataStr: string): string {
  const d = new Date(dataStr);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);
  const hora = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  if (d.toDateString() === hoje.toDateString()) return `Hoje, ${hora}`;
  if (d.toDateString() === ontem.toDateString()) return `Ontem, ${hora}`;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" }) + ` ${hora}`;
}

export function formatarDataCompleta(dataStr: string): string {
  const d = new Date(dataStr);
  return d.toLocaleString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}
