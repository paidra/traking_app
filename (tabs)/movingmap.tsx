import { Alert, Linking, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Text, View } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MQTT from "@taoqf/react-native-mqtt";
import queryString from "query-string";
import { throttle } from "lodash";

const MQTT_BROKER = "wss://your url mqtt broker:8884/mqtt";
const MQTT_TOPIC = "your topic ";

const TabOneScreen = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [pathCoordinates, setPathCoordinates] = useState<any[]>([]);
  const mapRef = useRef<MapView>(null);
  const mqttClientRef = useRef<any>(null);
  const hasFetchedLocation = useRef(false);

  useEffect(() => {
    const mqttClient = MQTT.connect(MQTT_BROKER, {
      username: "your user name",
      password: "your password",
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker your topic");
      mqttClient.subscribe(MQTT_TOPIC);
    });

    mqttClient.on("message", (topic, message) => {
      if (topic === MQTT_TOPIC) {
        try {
          const parsedMessage = queryString.parse(message.toString(), {
            parseBooleans: true,
            parseNumbers: true,
          });
          setPathCoordinates((prev) => [
            ...prev,
            { latitude: parsedMessage.lat || 0, longitude: parsedMessage.lng || 0 },
          ]);
        } catch (error) {
          console.error("Failed to parse MQTT message:", error);
        }
      }
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT Client Error:", err);
    });

    mqttClientRef.current = mqttClient;

    const fetchLocationData = async () => {
      if (hasFetchedLocation.current) {
        return;
      }

      hasFetchedLocation.current = true;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permissions are required to use this feature.",
          [{ text: "Go to Settings", onPress: () => Linking.openSettings() }]
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setPathCoordinates([{ latitude, longitude }]);
      console.log("Initial location fetched:", latitude, longitude);
    };

    fetchLocationData();

    const throttledPublish = throttle(() => {
      if (latitude && longitude && mqttClientRef.current) {
        const message = queryString.stringify({ lat: latitude, lng: longitude });
        mqttClientRef.current.publish(MQTT_TOPIC, message);
        console.log(`Location sent: ${latitude}, ${longitude}`);
      }
    }, 2000);

    const intervalId = setInterval(() => {
      throttledPublish();
    }, 2000);

    return () => {
      clearInterval(intervalId);
      mqttClientRef.current?.end();
    };
  }, [latitude, longitude]);

  const moveLocation = (direction: string) => {
    if (latitude && longitude) {
      let newLatitude = latitude;
      let newLongitude = longitude;

      const moveDistance = 0.0001;

      switch (direction) {
        case "up":
          newLatitude += moveDistance;
          break;
        case "down":
          newLatitude -= moveDistance;
          break;
        case "left":
          newLongitude -= moveDistance;
          break;
        case "right":
          newLongitude += moveDistance;
          break;
      }

      setLatitude(newLatitude);
      setLongitude(newLongitude);
      setPathCoordinates((prev) => [...prev, { latitude: newLatitude, longitude: newLongitude }]);
      mapRef.current?.animateToRegion({
        latitude: newLatitude,
        longitude: newLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      Alert.alert("Location not available", "Unable to move the location.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: latitude || 37.7749,
          longitude: longitude || -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline
          coordinates={pathCoordinates}
          strokeColor="#ff5722"
          strokeWidth={5}
          lineDashPattern={[10, 5]}
        />
        {latitude && longitude && (
          <Marker draggable coordinate={{ latitude, longitude }}>
            <FontAwesome name="street-view" size={36} color="black" />
          </Marker>
        )}
      </MapView>

      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={() => moveLocation("up")} style={styles.arrowButton}>
          <FontAwesome name="arrow-up" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => moveLocation("left")} style={styles.arrowButton}>
            <FontAwesome name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => moveLocation("right")} style={styles.arrowButton}>
            <FontAwesome name="arrow-right" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => moveLocation("down")} style={styles.arrowButton}>
          <FontAwesome name="arrow-down" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FF000080",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  arrowContainer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  arrowButton: {
    backgroundColor: "rgba(0, 150, 136, 0.8)",
    borderRadius: 25,
    padding: 10,
    margin: 5,
    elevation: 5,
  },
});

export default TabOneScreen;
