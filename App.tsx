import React, { useState } from "react";
import { NovaOcorrenciaInput, StatusOcorrencia } from "./src/types/Ocorrencia";
import { useOcorrencias } from "./src/hooks/useOcorrencias";
import { ListaScreen }    from "./src/screens/ListaScreen";
import { CadastroScreen } from "./src/screens/CadastroScreen";
import { DetalheScreen }  from "./src/screens/DetalheScreen";

type Tela = "lista" | "cadastro" | "detalhe";

export default function App() {
  const [tela, setTela] = useState<Tela>("lista");
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);

  const {
    ocorrencias,
    ocorrenciasFiltradas,
    filtro, setFiltro,
    contadores,
    adicionarOcorrencia,
    atualizarStatus,
    excluirOcorrencia,
  } = useOcorrencias();

  // Busca sempre a versão mais recente do estado — nunca uma cópia velha
  const ocorrenciaSelecionada = idSelecionado !== null
    ? ocorrencias.find((o) => o.id === idSelecionado) ?? null
    : null;

  function handleSalvar(input: NovaOcorrenciaInput) {
    adicionarOcorrencia(input);
    setTela("lista");
  }

  if (tela === "cadastro") {
    return (
      <CadastroScreen
        onSalvar={handleSalvar}
        onVoltar={() => setTela("lista")}
      />
    );
  }

  if (tela === "detalhe" && ocorrenciaSelecionada) {
    return (
      <DetalheScreen
        ocorrencia={ocorrenciaSelecionada}
        onVoltar={() => setTela("lista")}
        onAtualizarStatus={atualizarStatus}
        onExcluir={(id) => { excluirOcorrencia(id); setTela("lista"); }}
      />
    );
  }

  return (
    <ListaScreen
      ocorrencias={ocorrenciasFiltradas}
      filtro={filtro}
      onSetFiltro={setFiltro}
      contadores={contadores}
      onVerDetalhe={(o) => { setIdSelecionado(o.id); setTela("detalhe"); }}
      onNova={() => setTela("cadastro")}
    />
  );
}
