import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ocorrencia } from "../types/Ocorrencia";
import { RISCO_CONFIG, CORES, formatarData } from "../utils/theme";

type Props = {
  ocorrencia: Ocorrencia;
  onPress: (o: Ocorrencia) => void;
};

export function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  const cfg = RISCO_CONFIG[ocorrencia.risco];

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(ocorrencia)} activeOpacity={0.75}>
      <View style={[styles.iconBox, { backgroundColor: cfg.bg }]}>
        <Text style={[styles.icon, { color: cfg.texto }]}>{cfg.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.trecho} numberOfLines={1}>
          {ocorrencia.trecho} — {ocorrencia.local}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {formatarData(ocorrencia.data)}
          {ocorrencia.distanciaCm !== undefined
            ? `  ·  Sensor: ${ocorrencia.distanciaCm}cm`
            : ocorrencia.umidadeSensor !== undefined
            ? `  ·  ${ocorrencia.umidadeSensor}% umidade`
            : ""}
        </Text>
        <View style={[styles.statusPill, { backgroundColor: cfg.bg }]}>
          <Text style={[styles.statusText, { color: cfg.texto }]}>
            {ocorrencia.status === "pendente" ? "Pendente" : ocorrencia.status === "em_andamento" ? "Em andamento" : "Resolvido"}
          </Text>
        </View>
      </View>
      <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
        <Text style={[styles.badgeText, { color: cfg.texto }]}>{cfg.label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: CORES.fundoCard,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: CORES.borda,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconBox: { width: 42, height: 42, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  icon: { fontSize: 18, fontWeight: "700" },
  info: { flex: 1, gap: 3 },
  trecho: { fontSize: 13, fontWeight: "600", color: CORES.textoP },
  sub: { fontSize: 11, color: CORES.textoS },
  statusPill: { alignSelf: "flex-start", paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6, marginTop: 2 },
  statusText: { fontSize: 10, fontWeight: "600" },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: "700" },
});
