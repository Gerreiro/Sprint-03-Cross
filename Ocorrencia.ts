export type NivelRisco = "baixo" | "medio" | "alto";
export type StatusOcorrencia = "pendente" | "em_andamento" | "resolvido";

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  trecho: string;
  risco: NivelRisco;
  data: string;
  umidadeSensor?: number;
  distanciaCm?: number;
  validadoPorCamera: boolean;
  status: StatusOcorrencia;
  operador: string;
};

export type NovaOcorrenciaInput = Omit<Ocorrencia, "id" | "data" | "status">;
