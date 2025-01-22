import { Alert, StyleSheet, TouchableOpacity, Linking } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Text, View } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MQTT from "@taoqf/react-native-mqtt"; // Use the React Native MQTT library
import queryString from "query-string"; // Import query-string library
import { throttle } from "lodash"; // Import lodash throttle

const MQTT_BROKER =
  "wss://your url mqtt broker:8884/mqtt";
const MQTT_TOPIC = "your topic";

const TabOneScreen = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [pathCoordinates, setPathCoordinates] = useState<any[]>([]);
  const [heading, setHeading] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [userAction, setUserAction] = useState(false);
  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const mapRef = useRef<MapView>(null);
  const mqttClientRef = useRef<any>(null); // Using ref to store MQTT client

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;
    let headingSubscription: Location.LocationSubscription | null = null;

    // Initialize MQTT client
    const mqttClient = MQTT.connect(MQTT_BROKER, {
      username: "username", // Replace with your HiveMQ username
      password: "password", // Replace with your HiveMQ password
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe(MQTT_TOPIC);
    });

    mqttClient.on("message", (topic, message) => {
      if (topic === MQTT_TOPIC) {
        try {
          const parsedMessage = queryString.parse(message.toString(), {
            parseBooleans: true,
            parseNumbers: true,
          });
          setLiveLocation({
            lat: (parsedMessage.lat as number) || 0,
            lng: (parsedMessage.lng as number) || 0,
          });
        } catch (error) {
          console.error("Failed to parse MQTT message:", error);
        }
      }
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT Client Error:", err);
    });

    mqttClientRef.current = mqttClient; // Store the client in ref

    const fetchLocationData = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permissions are required to use this feature.",
          [{ text: "Go to Settings", onPress: () => Linking.openSettings() }]
        );
        setLoading(false);
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (location) => {
          const { latitude, longitude } = location.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setPathCoordinates((prev) => [...prev, { latitude, longitude }]);
        }
      );

      headingSubscription = await Location.watchHeadingAsync((headingData) => {
        setHeading(headingData.trueHeading);
      });

      setLoading(false);
    };

    fetchLocationData();

    // Throttle location updates
    const throttledPublish = throttle(() => {
      if (latitude && longitude && mqttClientRef.current) {
        const message = queryString.stringify({
          lat: latitude,
          lng: longitude,
        });
        mqttClientRef.current.publish(MQTT_TOPIC, message); // Publish message
        console.log(`Location sent: ${latitude}, ${longitude}`);
      }
    }, 1000); // Send updates every 2 seconds

    // Run throttled updates periodically
    const intervalId = setInterval(() => {
      throttledPublish();
    }, 1000);

    return () => {
      locationSubscription?.remove();
      headingSubscription?.remove();
      clearInterval(intervalId); // Clear interval on unmount
      mqttClientRef.current?.end();
    };
  }, [latitude, longitude]); // Re-run if latitude/longitude changes

  const showMyLocation = () => {
    if (latitude !== null && longitude !== null) {
      setUserAction(true); // Prevent automatic updates temporarily
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      Alert.alert("Location not available", "Unable to fetch your location.");
    }
  };

  const alignMapToHeading = () => {
    if (latitude && longitude) {
      mapRef.current?.animateCamera({
        center: { latitude, longitude },
        heading,
        pitch: 0,
        zoom: 15,
      });
    } else {
      Alert.alert(
        "Location not available",
        "Unable to align map to your heading."
      );
    }
  };
  useEffect(() => {
    if (!userAction && latitude !== null && longitude !== null) {
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [latitude, longitude, userAction]);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: latitude || 37.7749, // Default to San Francisco if location unavailable
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
          <Marker coordinate={{ latitude, longitude }}>
            <FontAwesome name="street-view" size={36} color="black" />
          </Marker>
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={showMyLocation} style={styles.button}>
          <Text style={styles.buttonItem}>Show My Location</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={alignMapToHeading} style={styles.button}>
          <Text style={styles.buttonItem}>Align</Text>
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
    backgroundColor: "#f7f8fa",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 15,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    height: 50,
    paddingHorizontal: 10, // Padding to give some breathing space
    zIndex: 1, // Ensure buttons are above the map
  },

  button: {
    flex: 1,
    marginHorizontal: 5, // Adds space between buttons
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: "rgba(0, 150, 136, 0.7)", // Semi-transparent background
    shadowColor: "#009688",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.05 }],
    width: "45%",
    elevation: 10, // For Android shadow effect
  },

  map: {
    width: "100%",
    height: "100%",
    borderRadius: 1,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    filter: "blur(8px)", // Apply blur to the map for better button visibility
  },

  buttonItem: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default TabOneScreen;
