import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Alert,
} from "react-native";
import { NivelRisco, NovaOcorrenciaInput } from "../types/Ocorrencia";
import { Header } from "../components/Header";
import { AppStatusBar } from "../components/AppStatusBar";
import { CORES, RISCO_CONFIG } from "../utils/theme";

type Props = {
  onSalvar: (input: NovaOcorrenciaInput) => void;
  onVoltar: () => void;
};

type Erros = Partial<Record<"trecho" | "local" | "risco" | "operador", string>>;

const RISCOS: NivelRisco[] = ["baixo", "medio", "alto"];

export function CadastroScreen({ onSalvar, onVoltar }: Props) {
  const [trecho,    setTrecho]    = useState("");
  const [local,     setLocal]     = useState("");
  const [descricao, setDescricao] = useState("");
  const [risco,     setRisco]     = useState<NivelRisco | null>(null);
  const [distancia, setDistancia] = useState("");
  const [operador,  setOperador]  = useState("");
  const [erros,     setErros]     = useState<Erros>({});

  function validar(): boolean {
    const novosErros: Erros = {};
    if (!trecho.trim())   novosErros.trecho   = "Informe o trecho da rodovia.";
    if (!local.trim())    novosErros.local    = "Informe a localização.";
    if (!operador.trim()) novosErros.operador = "Informe o nome do operador.";
    if (!risco)           novosErros.risco    = "Selecione o nível de risco.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSalvar() {
    if (!validar()) return;

    const distVal = distancia ? Number(distancia) : undefined;

    // Alerta de confirmação para risco alto
    if (risco === "alto") {
      Alert.alert(
        "⚠ Risco Alto",
        "Você está registrando uma ocorrência de risco ALTO. Confirmar?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Confirmar",
            style: "destructive",
            onPress: () => salvarEVoltar(distVal),
          },
        ]
      );
    } else {
      salvarEVoltar(distVal);
    }
  }

  function salvarEVoltar(distVal?: number) {
    onSalvar({
      trecho:           trecho.trim(),
      local:            local.trim(),
      descricao:        descricao.trim() || "Sem descrição adicional.",
      risco:            risco!,
      distanciaCm:      distVal,
      umidadeSensor:    undefined,
      validadoPorCamera: false,
      operador:         operador.trim(),
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <AppStatusBar />
      <Header titulo="Nova ocorrência" onVoltar={onVoltar} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            📡 Confirme visualmente o risco apontado pelo sensor IoT antes de registrar.
          </Text>
        </View>

        <Campo label="Trecho da rodovia *" erro={erros.trecho}>
          <TextInput
            style={[styles.input, erros.trecho && styles.inputErro]}
            placeholder="Ex: BR-101 km 312"
            placeholderTextColor={CORES.textoT}
            value={trecho}
            onChangeText={(v) => { setTrecho(v); setErros((e) => ({ ...e, trecho: undefined })); }}
          />
        </Campo>

        <Campo label="Localização específica *" erro={erros.local}>
          <TextInput
            style={[styles.input, erros.local && styles.inputErro]}
            placeholder="Ex: Acostamento esquerdo"
            placeholderTextColor={CORES.textoT}
            value={local}
            onChangeText={(v) => { setLocal(v); setErros((e) => ({ ...e, local: undefined })); }}
          />
        </Campo>

        <Campo label="Operador responsável *" erro={erros.operador}>
          <TextInput
            style={[styles.input, erros.operador && styles.inputErro]}
            placeholder="Seu nome"
            placeholderTextColor={CORES.textoT}
            value={operador}
            onChangeText={(v) => { setOperador(v); setErros((e) => ({ ...e, operador: undefined })); }}
          />
        </Campo>

        <Campo label="Leitura do sensor IoT (cm)">
          <TextInput
            style={styles.input}
            placeholder="Ex: 8"
            placeholderTextColor={CORES.textoT}
            value={distancia}
            onChangeText={setDistancia}
            keyboardType="numeric"
            maxLength={4}
          />
        </Campo>

        <Campo label="Nível de risco *" erro={erros.risco}>
          <View style={styles.riscoRow}>
            {RISCOS.map((r) => {
              const cfg = RISCO_CONFIG[r];
              const sel = risco === r;
              return (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.riscoBtn,
                    { backgroundColor: cfg.bg, borderColor: cfg.borda },
                    sel && styles.riscoBtnSel,
                  ]}
                  onPress={() => { setRisco(r); setErros((e) => ({ ...e, risco: undefined })); }}
                >
                  <Text style={[styles.riscoIcon, { color: cfg.texto }]}>{cfg.icon}</Text>
                  <Text style={[styles.riscoLabel, { color: cfg.texto }]}>{cfg.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Campo>

        <Campo label="Descrição">
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva o estado da vegetação observado..."
            placeholderTextColor={CORES.textoT}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </Campo>

        {/* Foto placeholder */}
        <Text style={styles.label}>Foto do trecho</Text>
        <TouchableOpacity style={styles.fotoBox}>
          <Text style={styles.fotoIcon}>📷</Text>
          <Text style={styles.fotoText}>Toque para capturar foto</Text>
          <Text style={styles.fotoSub}>Validação visual do sensor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={handleSalvar}>
          <Text style={styles.btnText}>✓  Registrar ocorrência</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Campo({ label, erro, children }: { label: string; erro?: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={campoStyles.label}>{label}</Text>
      {children}
      {erro && <Text style={campoStyles.erro}>{erro}</Text>}
    </View>
  );
}

const campoStyles = StyleSheet.create({
  label: { fontSize: 12, color: CORES.textoS, fontWeight: "500", marginBottom: 6 },
  erro:  { fontSize: 11, color: "#A32D2D", marginTop: 4 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: CORES.fundo },
  content: { padding: 16 },
  banner: {
    backgroundColor: "#FAEEDA",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#FAC775",
    padding: 12,
    marginBottom: 16,
  },
  bannerText: { color: "#633806", fontSize: 12 },
  label: { fontSize: 12, color: CORES.textoS, fontWeight: "500", marginBottom: 6 },
  input: {
    backgroundColor: CORES.fundoCard,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#D1D9D3",
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: CORES.textoP,
  },
  inputErro: { borderColor: "#E24B4A", borderWidth: 1 },
  textArea: { height: 96 },
  riscoRow: { flexDirection: "row", gap: 8 },
  riscoBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 8,
    borderWidth: 1.5, alignItems: "center",
  },
  riscoBtnSel: {
    borderWidth: 2.5,
    shadowColor: "#1D9E75",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  riscoIcon: { fontSize: 16, marginBottom: 2 },
  riscoLabel: { fontSize: 12, fontWeight: "700" },
  fotoBox: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#D1D9D3",
    borderStyle: "dashed",
    padding: 24,
    alignItems: "center",
    backgroundColor: CORES.fundoCard,
    marginBottom: 20,
  },
  fotoIcon: { fontSize: 28, marginBottom: 6 },
  fotoText: { fontSize: 13, color: CORES.textoS, fontWeight: "500" },
  fotoSub:  { fontSize: 11, color: CORES.textoT, marginTop: 2 },
  btn: {
    backgroundColor: "#1A3A2E",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  btnText: { color: "#FFF", fontSize: 15, fontWeight: "600" },
});
