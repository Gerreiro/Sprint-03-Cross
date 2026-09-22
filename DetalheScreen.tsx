import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert,
} from "react-native";
import { Ocorrencia, StatusOcorrencia } from "../types/Ocorrencia";
import { RiscoBadge } from "../components/RiscoBadge";
import { Header } from "../components/Header";
import { AppStatusBar } from "../components/AppStatusBar";
import { CORES, STATUS_CONFIG, formatarDataCompleta } from "../utils/theme";

type Props = {
  ocorrencia: Ocorrencia;
  onVoltar: () => void;
  onAtualizarStatus: (id: number, status: StatusOcorrencia) => void;
  onExcluir: (id: number) => void;
};

const PROXIMOS_STATUS: Record<StatusOcorrencia, { proximo: StatusOcorrencia; label: string; cor: string } | null> = {
  pendente:     { proximo: "em_andamento", label: "Iniciar atendimento", cor: "#EF9F27" },
  em_andamento: { proximo: "resolvido",    label: "Marcar como resolvida", cor: "#1D9E75" },
  resolvido:    null,
};

export function DetalheScreen({ ocorrencia, onVoltar, onAtualizarStatus, onExcluir }: Props) {
  const statusCfg   = STATUS_CONFIG[ocorrencia.status];
  const proximoAcao = PROXIMOS_STATUS[ocorrencia.status];

  function handleExcluir() {
    Alert.alert(
      "Excluir ocorrência",
      "Tem certeza que deseja excluir esta ocorrência? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => { onExcluir(ocorrencia.id); onVoltar(); },
        },
      ]
    );
  }

  function handleAtualizarStatus() {
    if (!proximoAcao) return;
    onAtualizarStatus(ocorrencia.id, proximoAcao.proximo);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <AppStatusBar />
      <Header titulo="Detalhe" onVoltar={onVoltar} acaoDireita={{ label: "🗑", onPress: handleExcluir }} />

      <ScrollView contentContainerStyle={styles.content}>

        {/* Foto placeholder */}
        <View style={styles.foto}>
          <Text style={styles.fotoIcon}>🖼</Text>
          <Text style={styles.fotoLabel}>
            {ocorrencia.validadoPorCamera ? "📷 Foto registrada ✓" : "Sem foto — não validado por câmera"}
          </Text>
        </View>

        {/* Título */}
        <View style={styles.tituloRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.titulo}>{ocorrencia.trecho}</Text>
            <Text style={styles.sub}>{ocorrencia.local}</Text>
          </View>
          <RiscoBadge risco={ocorrencia.risco} size="lg" />
        </View>

        {/* Status atual */}
        <View style={[styles.statusBanner, { backgroundColor: statusCfg.bg }]}>
          <Text style={[styles.statusLabel, { color: statusCfg.texto }]}>
            Status: {statusCfg.label}
          </Text>
        </View>

        {/* Dados do sensor */}
        {(ocorrencia.distanciaCm !== undefined || ocorrencia.umidadeSensor !== undefined) && (
          <>
            <Text style={styles.secLabel}>DADOS DO SENSOR IOT</Text>
            <View style={styles.sensorCard}>
              {ocorrencia.distanciaCm !== undefined && (
                <View style={styles.sensorItem}>
                  <Text style={styles.sensorVal}>{ocorrencia.distanciaCm}cm</Text>
                  <Text style={styles.sensorSub}>Distância medida</Text>
                </View>
              )}
              {ocorrencia.umidadeSensor !== undefined && (
                <View style={styles.sensorItem}>
                  <Text style={styles.sensorVal}>{ocorrencia.umidadeSensor}%</Text>
                  <Text style={styles.sensorSub}>Umidade do solo</Text>
                </View>
              )}
              <View style={styles.sensorItem}>
                <Text style={[styles.sensorVal, { fontSize: 14 }]}>
                  {ocorrencia.validadoPorCamera ? "✓" : "✗"}
                </Text>
                <Text style={styles.sensorSub}>Câmera</Text>
              </View>
            </View>
          </>
        )}

        {/* Informações */}
        <Text style={styles.secLabel}>INFORMAÇÕES</Text>
        <View style={styles.infoCard}>
          <InfoRow label="Registrado em"    value={formatarDataCompleta(ocorrencia.data)} />
          <InfoRow label="Operador"         value={ocorrencia.operador} />
          <InfoRow label="ID da ocorrência" value={`#${String(ocorrencia.id).padStart(4, "0")}`} />
          <InfoRow
            label="Câmera"
            value={ocorrencia.validadoPorCamera ? "Validado ✓" : "Não validado"}
            valueColor={ocorrencia.validadoPorCamera ? "#27500A" : "#A32D2D"}
            last
          />
        </View>

        {/* Descrição */}
        <Text style={styles.secLabel}>DESCRIÇÃO</Text>
        <View style={styles.descCard}>
          <Text style={styles.desc}>{ocorrencia.descricao}</Text>
        </View>

        {/* Ação de status */}
        {proximoAcao && (
          <TouchableOpacity
            style={[styles.acaoBtn, { backgroundColor: proximoAcao.cor }]}
            onPress={handleAtualizarStatus}
          >
            <Text style={styles.acaoBtnText}>{proximoAcao.label}</Text>
          </TouchableOpacity>
        )}

        {ocorrencia.status === "resolvido" && (
          <View style={styles.resolvidoBox}>
            <Text style={styles.resolvidoText}>✓ Ocorrência resolvida</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  label, value, valueColor, last,
}: {
  label: string; value: string; valueColor?: string; last?: boolean;
}) {
  return (
    <View style={[infoStyles.row, !last && infoStyles.border]}>
      <Text style={infoStyles.label}>{label}</Text>
      <Text style={[infoStyles.value, valueColor ? { color: valueColor } : {}]}>{value}</Text>
    </View>
  );
}

const infoStyles = StyleSheet.create({
  row:    { flexDirection: "row", justifyContent: "space-between", paddingVertical: 11, alignItems: "center" },
  border: { borderBottomWidth: 0.5, borderBottomColor: "#F0F2F0" },
  label:  { fontSize: 13, color: CORES.textoS },
  value:  { fontSize: 13, fontWeight: "600", color: CORES.textoP, flex: 1, textAlign: "right" },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: CORES.fundo },
  content: { padding: 16 },
  foto: {
    borderRadius: 12, height: 160,
    backgroundColor: "#1A3A2E",
    alignItems: "center", justifyContent: "center", marginBottom: 16,
  },
  fotoIcon:  { fontSize: 36, opacity: 0.35 },
  fotoLabel: { color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 8 },
  tituloRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12, gap: 10 },
  titulo:    { fontSize: 17, fontWeight: "700", color: CORES.textoP },
  sub:       { fontSize: 13, color: CORES.textoS, marginTop: 3 },
  statusBanner: { borderRadius: 8, padding: 10, marginBottom: 16, alignItems: "center" },
  statusLabel:  { fontSize: 13, fontWeight: "700" },
  secLabel: { fontSize: 11, fontWeight: "700", color: CORES.textoT, letterSpacing: 0.8, marginBottom: 8, marginTop: 4 },
  sensorCard: {
    backgroundColor: "#EAF3DE", borderRadius: 10,
    padding: 14, flexDirection: "row",
    justifyContent: "space-around", marginBottom: 20,
  },
  sensorItem: { alignItems: "center" },
  sensorVal:  { fontSize: 22, fontWeight: "700", color: "#27500A" },
  sensorSub:  { fontSize: 11, color: "#639922", marginTop: 2 },
  infoCard: {
    backgroundColor: CORES.fundoCard, borderRadius: 10,
    borderWidth: 0.5, borderColor: CORES.borda,
    paddingHorizontal: 14, marginBottom: 20,
  },
  descCard: {
    backgroundColor: CORES.fundoCard, borderRadius: 10,
    borderWidth: 0.5, borderColor: CORES.borda,
    padding: 14, marginBottom: 20,
  },
  desc: { fontSize: 14, color: CORES.textoP, lineHeight: 22 },
  acaoBtn: {
    borderRadius: 12, paddingVertical: 15,
    alignItems: "center", marginBottom: 12,
  },
  acaoBtnText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
  resolvidoBox: {
    backgroundColor: "#EAF3DE", borderRadius: 12,
    paddingVertical: 15, alignItems: "center", marginBottom: 12,
  },
  resolvidoText: { color: "#27500A", fontSize: 15, fontWeight: "600" },
});
