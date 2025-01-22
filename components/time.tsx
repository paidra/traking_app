import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime.toLocaleTimeString()}</Text>
      <Text style={styles.dateText}>
        {currentTime.toLocaleDateString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    marginTop: 2,
  },
});