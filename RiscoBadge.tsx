import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NivelRisco } from "../types/Ocorrencia";
import { RISCO_CONFIG } from "../utils/theme";

type Props = { risco: NivelRisco; size?: "sm" | "lg" };

export function RiscoBadge({ risco, size = "sm" }: Props) {
  const c = RISCO_CONFIG[risco];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, size === "lg" && styles.lg]}>
      <Text style={[styles.text, { color: c.texto }, size === "lg" && styles.textLg]}>
        {c.icon}  {c.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, alignSelf: "flex-start" },
  lg: { paddingHorizontal: 16, paddingVertical: 8 },
  text: { fontSize: 12, fontWeight: "700" },
  textLg: { fontSize: 15 },
});
