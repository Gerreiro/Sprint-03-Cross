import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

export function AppStatusBar() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1A3A2E" />
      <View style={styles.bar}>
        <Text style={styles.hora}>9:41</Text>
        <Text style={styles.sensor}>IoT ● Online</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#1A3A2E",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hora: { color: "#A0D4B8", fontSize: 11, fontWeight: "500" },
  sensor: { color: "#A0D4B8", fontSize: 11, fontWeight: "500" },
});
