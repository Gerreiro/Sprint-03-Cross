import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  titulo: string;
  onVoltar?: () => void;
  acaoDireita?: { label: string; onPress: () => void };
};

export function Header({ titulo, onVoltar, acaoDireita }: Props) {
  return (
    <View style={styles.header}>
      {onVoltar ? (
        <TouchableOpacity onPress={onVoltar} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28 }} />
      )}
      <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
      {acaoDireita ? (
        <TouchableOpacity onPress={acaoDireita.onPress}>
          <Text style={styles.acao}>{acaoDireita.label}</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1A3A2E",
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { color: "#6FCF97", fontSize: 22, width: 28 },
  titulo: { color: "#FFFFFF", fontSize: 17, fontWeight: "600", flex: 1, textAlign: "center" },
  acao: { color: "#6FCF97", fontSize: 14, fontWeight: "500", width: 28, textAlign: "right" },
});
