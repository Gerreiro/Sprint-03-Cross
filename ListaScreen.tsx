import React from "react";
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from "react-native";
import { Ocorrencia } from "../types/Ocorrencia";
import { OcorrenciaCard } from "../components/OcorrenciaCard";
import { AppStatusBar } from "../components/AppStatusBar";
import { FiltroAtivo } from "../hooks/useOcorrencias";
import { CORES } from "../utils/theme";
import { alertasIoTMock } from "../data/ocorrenciasMock";

type Props = {
  ocorrencias: Ocorrencia[];
  filtro: FiltroAtivo;
  onSetFiltro: (f: FiltroAtivo) => void;
  contadores: { total: number; alto: number; medio: number; baixo: number; pendente: number };
  onVerDetalhe: (o: Ocorrencia) => void;
  onNova: () => void;
};

const FILTROS: { key: FiltroAtivo; label: string }[] = [
  { key: "todas",        label: "Todas"       },
  { key: "pendente",     label: "Pendentes"   },
  { key: "alto",         label: "Alto"        },
  { key: "medio",        label: "Médio"       },
  { key: "baixo",        label: "Baixo"       },
  { key: "resolvido",    label: "Resolvidas"  },
];

export function ListaScreen({ ocorrencias, filtro, onSetFiltro, contadores, onVerDetalhe, onNova }: Props) {
  const alertasAltos = alertasIoTMock.filter((a) => a.risco === "alto");

  return (
    <SafeAreaView style={styles.safe}>
      <AppStatusBar />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🌿 GrassWatch</Text>
          <Text style={styles.headerSub}>{contadores.total} ocorrências · {contadores.pendente} pendentes</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={onNova}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Contadores rápidos */}
      <View style={styles.contadores}>
        <View style={[styles.contador, { backgroundColor: "#FCEBEB" }]}>
          <Text style={[styles.contadorNum, { color: "#A32D2D" }]}>{contadores.alto}</Text>
          <Text style={[styles.contadorLabel, { color: "#A32D2D" }]}>Alto</Text>
        </View>
        <View style={[styles.contador, { backgroundColor: "#FAEEDA" }]}>
          <Text style={[styles.contadorNum, { color: "#854F0B" }]}>{contadores.medio}</Text>
          <Text style={[styles.contadorLabel, { color: "#854F0B" }]}>Médio</Text>
        </View>
        <View style={[styles.contador, { backgroundColor: "#EAF3DE" }]}>
          <Text style={[styles.contadorNum, { color: "#27500A" }]}>{contadores.baixo}</Text>
          <Text style={[styles.contadorLabel, { color: "#27500A" }]}>Baixo</Text>
        </View>
      </View>

      {/* Alertas IoT */}
      {alertasAltos.length > 0 && (
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>⚠  {alertasAltos.length} alerta{alertasAltos.length > 1 ? "s" : ""} do sensor IoT</Text>
          {alertasAltos.map((a) => (
            <Text key={a.sensorId} style={styles.bannerItem}>
              · {a.trecho} — {a.distanciaCm}cm detectado
            </Text>
          ))}
        </View>
      )}

      {/* Filtros */}
      <View style={styles.filtrosWrap}>
        <FlatList
          data={FILTROS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(f) => f.key}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
          renderItem={({ item: f }) => (
            <TouchableOpacity
              style={[styles.filtroBtn, filtro === f.key && styles.filtroBtnAtivo]}
              onPress={() => onSetFiltro(f.key)}
            >
              <Text style={[styles.filtroText, filtro === f.key && styles.filtroTextAtivo]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Lista */}
      <FlatList
        data={ocorrencias}
        keyExtractor={(o) => String(o.id)}
        renderItem={({ item }) => <OcorrenciaCard ocorrencia={item} onPress={onVerDetalhe} />}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioIcon}>📋</Text>
            <Text style={styles.vazioTitulo}>Nenhuma ocorrência</Text>
            <Text style={styles.vazioSub}>
              {filtro === "todas"
                ? "Toque em + para registrar a primeira ocorrência."
                : "Nenhuma ocorrência para este filtro."}
            </Text>
          </View>
        }
        ListFooterComponent={
          ocorrencias.length > 0 ? (
            <Text style={styles.rodape}>{ocorrencias.length} ocorrência{ocorrencias.length !== 1 ? "s" : ""} exibida{ocorrencias.length !== 1 ? "s" : ""}</Text>
          ) : null
        }
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={onNova}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: CORES.fundo },
  header: {
    backgroundColor: "#1A3A2E",
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  headerSub: { color: "#A0D4B8", fontSize: 11, marginTop: 2 },
  addBtn: {
    backgroundColor: "#1D9E75",
    width: 36, height: 36, borderRadius: 18,
    alignItems: "center", justifyContent: "center",
  },
  addBtnText: { color: "#FFF", fontSize: 24, lineHeight: 30, fontWeight: "300" },
  contadores: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: "#1A3A2E",
  },
  contador: {
    flex: 1, borderRadius: 10, paddingVertical: 8,
    alignItems: "center",
  },
  contadorNum: { fontSize: 20, fontWeight: "700" },
  contadorLabel: { fontSize: 11, fontWeight: "600", marginTop: 1 },
  banner: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 2,
    backgroundColor: "#FAEEDA",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#FAC775",
    padding: 12,
  },
  bannerTitle: { color: "#633806", fontSize: 12, fontWeight: "700", marginBottom: 4 },
  bannerItem: { color: "#854F0B", fontSize: 11, marginTop: 2 },
  filtrosWrap: { paddingVertical: 10 },
  filtroBtn: {
    paddingVertical: 7, paddingHorizontal: 14,
    borderRadius: 20, backgroundColor: "#E8EDE9",
  },
  filtroBtnAtivo: { backgroundColor: "#1A3A2E" },
  filtroText: { fontSize: 12, color: CORES.textoS, fontWeight: "500" },
  filtroTextAtivo: { color: "#FFF", fontWeight: "700" },
  lista: { paddingHorizontal: 16, paddingBottom: 100, paddingTop: 4 },
  vazio: { alignItems: "center", paddingTop: 60, paddingHorizontal: 32 },
  vazioIcon: { fontSize: 40, marginBottom: 12 },
  vazioTitulo: { fontSize: 16, fontWeight: "600", color: CORES.textoS, marginBottom: 6 },
  vazioSub: { fontSize: 13, color: CORES.textoT, textAlign: "center", lineHeight: 20 },
  rodape: { textAlign: "center", color: CORES.textoT, fontSize: 12, paddingTop: 8, paddingBottom: 4 },
  fab: {
    position: "absolute", bottom: 28, right: 20,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: "#1D9E75",
    alignItems: "center", justifyContent: "center",
    elevation: 4,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4,
  },
  fabText: { color: "#FFF", fontSize: 28, fontWeight: "300", lineHeight: 34 },
});
