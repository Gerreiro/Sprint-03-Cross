import { useState } from "react";
import { Ocorrencia, NovaOcorrenciaInput, NivelRisco, StatusOcorrencia } from "../types/Ocorrencia";
import { ocorrenciasMock } from "../data/ocorrenciasMock";

export type FiltroAtivo = "todas" | NivelRisco | StatusOcorrencia;

export function useOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(ocorrenciasMock);
  const [filtro, setFiltro] = useState<FiltroAtivo>("todas");

  const proximoId = ocorrencias.length > 0
    ? Math.max(...ocorrencias.map((o) => o.id)) + 1
    : 1;

  const ocorrenciasFiltradas = ocorrencias.filter((o) => {
    if (filtro === "todas") return true;
    if (filtro === "baixo" || filtro === "medio" || filtro === "alto") return o.risco === filtro;
    return o.status === filtro;
  });

  const contadores = {
    total: ocorrencias.length,
    alto: ocorrencias.filter((o) => o.risco === "alto").length,
    medio: ocorrencias.filter((o) => o.risco === "medio").length,
    baixo: ocorrencias.filter((o) => o.risco === "baixo").length,
    pendente: ocorrencias.filter((o) => o.status === "pendente").length,
  };

  function adicionarOcorrencia(input: NovaOcorrenciaInput) {
    const nova: Ocorrencia = {
      ...input,
      id: proximoId,
      data: new Date().toISOString(),
      status: "pendente",
    };
    setOcorrencias((prev) => [nova, ...prev]);
    return nova;
  }

  function atualizarStatus(id: number, status: StatusOcorrencia) {
    setOcorrencias((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }

  function excluirOcorrencia(id: number) {
    setOcorrencias((prev) => prev.filter((o) => o.id !== id));
  }

  return {
    ocorrencias,
    ocorrenciasFiltradas,
    filtro,
    setFiltro,
    contadores,
    adicionarOcorrencia,
    atualizarStatus,
    excluirOcorrencia,
  };
}
