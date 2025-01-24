##Title

traking app
A traking app built with React Native / Expo. Using mqtt broker as backend to connect, subscribe and unsubscribe, and send and receive messages(location) from clients to MQTT brokers.


##Description

Target audience and problem it solves
The tracking app allows users to view their real-time location on an interactive map. It aligns with the phone's orientation using the Device Orientation API, facilitating navigation. A path is drawn to represent movements, and page with a dynamic compass helps with orientation 
I created a related  web page that  communecate with mqtt also view their real-time location on an interactive map with a path is drawn to represent movment 
High-level overview of app functionality

![image](https://github.com/user-attachments/assets/fd0ebebe-4169-4208-8127-84b59f35a4d3)

  1.	Core Purpose:
     
  The app enables users to track and share their real-time location using an interactive map interface and MQTT for communication.
  
  3.	Key Features:
    o	Real-Time Location Tracking:
    Users can view their live position on a map, updated continuously.
    o	Path Visualization:
    Movements are traced on the map, providing a visual representation of the user's travel history.
    o	Device Orientation Integration:
    The app uses the Device Orientation API to adjust the map's alignment to match the phone's physical orientation, aiding in navigation.
    o	Dynamic Compass:
    A dedicated page displays a real-time compass to help users with directionality.
    o	MQTT Communication:
    	Connect to an MQTT broker to send and receive location data.
    	Publish location updates and subscribe to other clients' locations to enable sharing and tracking in a multi-user environment.
    o	Web Page Integration:
    A related web page, also connected to the MQTT broker, displays real-time locations and movement paths, mirroring the app's core functionalities in a browser-based experience.
  
  5.	Technology Stack:
    o	Frontend: React Native with Expo for the mobile app.
    o	Backend: MQTT broker for message exchange.
    o	Mapping: Interactive maps with location and movement rendering.
    



![image](https://github.com/user-attachments/assets/324daf96-7791-4336-9ee4-b69c18bd56fd)












## Technology Stack


Built With:

react-native,
expo,
react-navigtion,
react-dom,
react-native-maps,
@taoqf/react-native-mqtt
( @to/react-native-mqtt is not designed for web browsers ),
mqtt,
expo-linking,
expo-sensors,
expo-location,
query-string,
lodash throttle,
expo-router,
expo-blur,
react-native-svg,
react-native-community/slider,

 
Expo go :

  Expo Go is a companion mobile app that enables developers to preview and test their projects instantly on real devices. Expo Go can be considered as a sandbox environment for React Native apps.

Expo CLI:

  The expo package provides a small and powerful CLI tool npx expo which is designed to keep you moving fast during app development.
  When working with Expo projects, the command `npx expo start` offers flexibility and convenience. Unlike `expo start`, which requires a globally installed version of Expo CLI, `npx expo start`             temporarily downloads and uses the version of Expo CLI specified for the project or the latest available version. This ensures compatibility and eliminates the need to manage a global installation.        While    it may be slightly slower due to potential downloads, it guarantees that the correct version is used, especially in environments where multiple projects might depend on different versions of      Expo. For     these reasons, I chose to use `npx expo start` in my project to maintain consistency and avoid potential version conflicts.
  

why using ios:

  In this project, the decision to use only an iOS application was made to ensure optimal compatibility and functionality with the tools and libraries utilized, particularly for MQTT communication. While    libraries like @to/react-native-mqtt are well-suited for React Native applications, they are specifically designed to operate in mobile environments and do not natively support web platforms. By           focusing solely on iOS, we were able to leverage the native capabilities of the operating system, simplify project configurations, and reduce cross-platform challenges.

Development Tools Used

  •	[Expo Go](https://expo.dev/go) installed on a physical device(my phone)
  
  •	[Node.js (LTS version)](https://nodejs.org/en) installed
  
  •	[VS Code](https://code.visualstudio.com/) or any other preferred code editor or IDE installed
  
  •	Windows (PowerShell and MINGW64) with a terminal window open 
  
  •	[HiveMQ](https://www.hivemq.com/products/mqtt-cloud-broker/) cloud a mqtt cloud broker 
  
  •	[MQTT Explorer ](https://mqtt-explorer.com/)
