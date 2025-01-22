import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import * as Location from "expo-location";
import Svg, { Path, Line } from "react-native-svg";
import TimeDisplay from "@/components/time";
import Slider from "@react-native-community/slider";
import { NavigationContainer } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";


function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [heading, setHeading] = useState<number>(0);

  // Pitch, Roll, Yaw state
  const [pitch, setPitch] = useState<number>(0);
  const [roll, setRoll] = useState<number>(0);

  const [sliderValue, setSliderValue] = useState(20);

  useEffect(() => {
    // Accelerometer subscription
    const accelSubscription = Accelerometer.addListener((accelerationData) => {
      setData(accelerationData); // Update x, y, z with acceleration values
      calculateAngles(accelerationData);
    });

    // Heading subscription
    const startHeadingUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      await Location.watchHeadingAsync((headingData) => {
        setHeading(headingData.trueHeading); // Update heading (yaw)
      });
    };

    startHeadingUpdates();

    return () => {
      accelSubscription.remove();
    };
  }, []);

  // Update accelerometer refresh rate when sliderValue changes
  useEffect(() => {
    const interval = Math.max(16, Math.floor(1000 / sliderValue)); // Avoid values below 16ms
    Accelerometer.setUpdateInterval(interval);
  }, [sliderValue]);
  // Function to calculate pitch and roll from accelerometer data
  const calculateAngles = ({
    x,
    y,
    z,
  }: {
    x: number;
    y: number;
    z: number;
  }) => {
    const pitch = Math.atan2(x, Math.sqrt(y * y + z * z)) * (180 / Math.PI); // Convert from radians to degrees
    const roll = Math.atan2(y, Math.sqrt(x * x + z * z)) * (180 / Math.PI); // Convert from radians to degrees

    setPitch(pitch);
    setRoll(roll);
  };

  // Calculate 3D transformations (Optional, for visualization)
  const perspectiveFactor = 0.55;
  const xTilt = Math.cos(x * (Math.PI / 180)) * perspectiveFactor;
  const yTilt = Math.cos(y * (Math.PI / 180)) * perspectiveFactor;

  const arrowTransform = `
    rotate(${-heading})
    scale(${xTilt}, ${yTilt})
    translate(${y * 10}, ${x * 10})
  `;

  /*const tabBarIcon = ({ color }: { color: string }) => ( // {{ edit_1 }}
    <>
      <Entypo name="aircraft" size={24} color={color} />
      <Entypo name="aircraft-landing" size={24} color={color} />
    </>)
*/
  return (
    <View style={styles.container}>
      <TimeDisplay />
      <Text>{sliderValue}hz</Text>
      <Slider
        style={{ width: 180, height: 40 }}
        minimumValue={0}
        maximumValue={100}
        onValueChange={(value) => setSliderValue(value)}
        step={5}
        value={sliderValue}
        maximumTrackTintColor="#ff0000"
        minimumTrackTintColor="#00ff00"
      />

      <Svg width={300} height={300} viewBox="-100 -100 200 200">
        {/* Reference grid */}
        <Line x1="-80" y1="0" x2="80" y2="0" stroke="#ddd" strokeWidth="1" />
        <Line x1="0" y1="-80" x2="0" y2="80" stroke="#ddd" strokeWidth="1" />

        {/* 3D Arrow with shading */}
        <Path
          d="M0,-60 L30,60 L0,40 L-30,60 Z"
          fill="#ff0000"
          transform={arrowTransform}
          opacity={0.9}
        />
        <Path
          d="M0,-60 L30,60 L0,40 Z"
          fill="#cc0000"
          transform={arrowTransform}
          opacity={0.8 + x * 0.2}
        />
        <Path
          d="M-5,-50 L5,-50 L0,-60 Z"
          fill="#ff4444"
          transform={arrowTransform}
        />
      </Svg>
      
      <View style={styles.dataContainer}>
        <Text style={styles.text}>Heading: {heading.toFixed(0)}°</Text>
        <Text style={styles.text}>Pitch: {pitch.toFixed(2)}°</Text>
        <Text style={styles.text}>Roll: {roll.toFixed(2)}°</Text>
        <Text style={styles.text}> X: {x.toFixed(2)} m/s²</Text>
        <Text style={styles.text}> Y: {y.toFixed(2)} m/s²</Text>
        <Text style={styles.text}>
          {" "}
          Z: {Math.abs(parseFloat(z.toFixed(2)))} m/s²
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  slider: {
    width: 300,
    height: 40,
    marginVertical: 20,
  },
  sliderValue: {
    fontSize: 10,
    color: "#555",
  },
  dataContainer: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
    color: "#333",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
export default App;
