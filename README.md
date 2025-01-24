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


##Installation and Setup

  Starting the Project:
    1-Initialize a new Expo app
      We'll use create-expo-app to initialize a new Expo app. It is a command line tool to create a new React Native project. Run the following command in your terminal:
      
![image](https://github.com/user-attachments/assets/1de17495-bed6-4d48-b250-87e28aac29d2)

 

2-Run the app on mobile 

  The development server is typically hosted on http://localhost:8081. It hosts a manifest from / which the client uses to request the JavaScript bundle from the bundler.
  
Manifest:

An Expo app manifest is similar to a web app manifest. It provides information that Expo Go needs to know how to run the app and other relevant data.

In the project directory, run the following command to start the development server from the terminal:
 
After running the above command:

![image](https://github.com/user-attachments/assets/082d7a6b-07e9-46f5-88ba-b3502b55547b)


1.	The development server will start, and you'll see a QR code inside the terminal window.

   ![image](https://github.com/user-attachments/assets/a9ccbd00-8506-457c-b943-dd0caf3306a8)


 
3.	Scan that QR code to open the app on the device. use the Expo Go > Scan QR code option. On iOS, use the default camera app.

![image](https://github.com/user-attachments/assets/84c57109-f6d2-43ac-bf34-984549dbf3a7)

 


Entry Point of the App

The entry point of the app initializes the application and executes when the development server starts. It is built using core React Native components, including:

•	<View>: Serves as the container for other UI elements.

•	<Text>: Displays textual content on the screen.

Key Features of the Entry Point:

1.	Background and Text Rendering:
   
The entry point sets the background and displays text using these components.

3.	Styling:
   
Unlike traditional web development where styles are defined with CSS, styles in React Native are applied using JavaScript objects. This approach enables dynamic styling and integration with JavaScript logic.

![image](https://github.com/user-attachments/assets/e9264b82-63a0-4dbf-99f2-92d941fa2c9d)

 
2-Add a bottom tab navigator


To enhance navigation, a bottom tab navigator was implemented. This feature allows users to switch between screens, such as "Home" and "About," using an accessible and intuitive interface.

Organizing the Directory :

A tabs subdirectory was created in the app structure. The existing index.tsx (Home) and about.tsx (About) screens were moved here to maintain a clean, logical structure.

Tab Layout and Navigation :

A layout file (tabs/_layout.tsx) was created to define the tab navigation structure. The Home and About screens are set up as tabs, allowing users to navigate between them effortlessly.

Appearance Customization :

The bottom tab navigator was customized using icons and colors:

•	Icons: Each tab has a unique icon (e.g., a "home" icon for the Home tab).

•	Colors: Active tabs are highlighted with vibrant colors (e.g., tomato), while inactive tabs use neutral tones.

Root Integration :

The root layout was updated to include the tab navigator, making it a central component of the app.

Using Vector Icons :

The app utilizes @expo/vector-icons for scalable, visually appealing icons. These icons improve the interface by giving users quick visual cues.














The core development loop

![image](https://github.com/user-attachments/assets/bbcd683f-1419-427c-a060-0fbf4866b696)

 




The core development loop in app development consists of four main activities:

1.	Writing and Running JavaScript Code: Focused on creating components, implementing business logic, or using npm libraries that don’t require native code modifications. These changes are reflected immediately in the app without affecting the native side.

2.	Updating App Configuration: Involves modifying app settings, such as name, icon, splash screen, and properties via app.json or app.config.js. Some changes may impact the native project and may require additional configuration or plugins.


3.	Writing or Modifying Native Code: Directly involves editing or adding native code or adjusting the native project configuration. This requires access to native project directories or tools like Expo Modules.

4.	Installing Libraries Requiring Native Code Changes: Certain libraries may require modifying native project configuration, which involves updating the app config or using a development build to apply the changes.


Together, these steps form a cyclical process where each stage supports the progression of app development across JavaScript and native layers.








# #Application Pages and Features

/Campss page
 

1.time display :

The TimeDisplay component displays the current time and date, updating in real-time. It uses the useState hook to store the current time and the useEffect hook with a setInterval to update the time every second. The time is formatted using toLocaleTimeString() for the clock and toLocaleDateString() for the date with custom options. The clearInterval ensures the timer stops when the component unmounts. This provides a dynamic and localized display of time and date.

![image](https://github.com/user-attachments/assets/db5ac7bd-d4d4-4952-b9b5-1737745293d9)

 

2.campass:

The startHeadingUpdates function requests foreground permissions to access the device's heading data. Once granted, it uses Location.watchHeadingAsync to track heading changes, updating the heading state with the true heading (yaw) value. The perspectiveFactor, xTilt, and yTilt calculations adjust the tilt of an object based on the device's orientation. 
 
The arrowTransform applies transformations such as rotation, scaling, and translation to visually adjust an arrow’s direction based on the device's heading. The accelSubscription.remove() ensures cleanup when the component unmounts.
 

3.data container:

to calculate pitch and roll we use  accelerometer from expo-senser
 expo-senser:provide various APIs for accessing device sensors to measure motion, orientation, pressure, magnetic fields, ambient light, and step count.

The accelSubscription listens for changes in device acceleration using the Accelerometer.addListener method. It updates the data state with the new acceleration values (x, y, z). Additionally, it calls the calculateAngles function to compute the angles based on the acceleration data.
 

This useEffect adjusts the accelerometer update interval based on the sliderValue, ensuring it doesn't fall below 16ms for smoother updates. It then calls the Accelerometer.setUpdateInterval method to set the interval. The calculateAngles function computes the pitch and roll angles from the accelerometer's x, y, and z data, converting the results from radians to degrees. The calculated angles are stored in the pitch and roll state variables for shering in the data container.
 
4.slider:

I use slider from react-native-community/slider
It allows the user to select a value between 0 and 100, with steps of 5.
 








 map page :

 ![image](https://github.com/user-attachments/assets/b520a3c6-6fc1-4d03-b5b1-34921b4aebc5)

Initialization

Read article posted on [Medium](https://medium.com/quick-code/react-native-location-tracking-14ab2c9e2db8)


First, download the library from npm:

![image](https://github.com/user-attachments/assets/67f8ac97-ca92-4f39-9c7b-44a29f3b9466)

 
This MapView component is built so that features on the map (such as Markers, Polygons, etc.) are specified as children of the MapView itself. This provides an intuitive and react-like API for declaratively controlling features on the map.
We use this Component API :


  <MapView /> Component API:
  
  The <MapView /> component provides a customizable map interface for React Native applications. It allows displaying maps, markers, and user interactions, such as gestures for zoom and pan. Key features   include rendering custom map styles, markers, and overlays.
  
  <Polyline /> Component API:
  
  The <Polyline /> component will be used to draw the user's path on the map. By providing an array of coordinates, it will visually represent the route taken, with customizable color and width for clarity.

Using `react-native-maps` for rendering the map

  In this project, I used the react-native-maps library to implement map tracking, along with the <MapView /> and <Polyline /> components to display the map and draw the user's path. For location           tracking, I relied on the expo-location library instead of the Google Maps API, as it offers a simpler and more integrated solution within the Expo ecosystem.
  Using the Google Maps API can introduce several challenges:
  
  •	Complex Setup: It requires obtaining API keys, enabling services on the Google Cloud Platform, and configuring billing, which can be time-consuming and complex for small projects.
  
  •	Dependencies: Integration with React Native may involve additional setup, such as linking native modules or using third-party libraries.
  
  •	Cost: The Google Maps API has usage limits and charges after a certain threshold, which may not be ideal for budget-sensitive projects.
  
  •	Platform-Specific Issues: Some Google Maps features may behave differently or require extra configuration on iOS and Android.
  
  By using expo-location, I avoided these challenges. It allowed me to focus on core functionality, such as tracking and displaying the user's movement, without dealing with the complexities of external    APIs. This approach ensured a smoother development experience and faster implementation.




Integration with `expo-location` to get GPS data

  Expo-location allows reading geolocation information from the device. Your app can poll for the current location or subscribe to location update events.
  
  installation

   ![image](https://github.com/user-attachments/assets/a5e3fa3f-d49b-4ecf-b4e7-8ae472b87277)

  
  Permissions and Location Tracking
  •	We are using react-native-map for background view 
  •	Location permissions must be granted. On iOS it must be granted with Always option.
  
   
   
     

Features 

  This code tracks the user's real-time location using Location.watchPositionAsync with high accuracy, updating every second. The latitude and longitude are stored in state, and the path coordinates are   updated to draw the user's movement on a map. Once initialized, tracking is ready, indicated by setLoading(false).
   
   
  1.show my location :
  The showMyLocation function centers the map on the user's current location if latitude and longitude are available. It temporarily disables automatic updates and animates the map view to the user's        region with a small zoom. If the location is unavailable, it displays an alert message.
   
  
  2.align:
  The alignMapToHeading function orients the map to the user's current heading if latitude and longitude are available. It adjusts the camera to the user's location, heading, and a zoom level of 15. If     the location is unavailable, it shows an alert.
  
   
  
  








##Backend Architecture
 
![image](https://github.com/user-attachments/assets/348da599-1b1f-4572-8dae-40ff98c3534c)


Definition

  React Native :
  
  is Facebook’s open-source cross-platform mobile application development framework, a derivative of React for the native mobile application platform, which supports both iOS and Android platforms. React   Native uses Javascript, similar to HTML’s JSX, and CSS to develop mobile applications, allowing technical staff familiar with web front-end development to start working on mobile application              development with a minimal learning curve. React Native also offers performance and experience close to that of native applications.
  
  MQTT :
  
  is a lightweight IoT messaging protocol based on a publish/subscribe model that enables stable transmission over severely constrained hardware devices and low-bandwidth, high-latency networks.            With its easy implementation, QoS support, and small message size, it has been widely used in IoT industry.
  
  Meta:
  
  Formerly Facebook, Meta is the group that develops React Native, Metro Bundler, Hermes Engine, Yoga and more. The Expo team collaborates with Meta to deliver the best possible developer experience.

Why Not Paho MQTT?

  In my React Native project, I utilized the **react-native-mqtt** library to connect to an MQTT broker, which facilitates efficient message communication between clients. While **Paho MQTT** was           considered as an alternative, I opted against it due to several disadvantages:
  
  1. Web-Centric Design: Paho MQTT is primarily built for web applications, which can lead to compatibility issues when used in mobile environments like React Native.
  
  2. Performance Overhead: The library may introduce additional overhead compared to more lightweight alternatives, potentially affecting the performance of mobile applications.
  
  3. Complex API: Paho's API can be more complex and less intuitive, making it harder for developers to implement and troubleshoot.
  
  4. Larger Footprint: Paho MQTT tends to have a larger bundle size, which can increase the overall size of the mobile application, impacting download times and storage requirements.
  
  5. Limited Mobile Support: While Paho MQTT does provide some mobile capabilities, it may not fully leverage mobile-specific features, leading to a less optimal user experience.
  
  6. Community and Documentation: The community and documentation for Paho MQTT may not be as robust or tailored for mobile development compared to libraries specifically designed for mobile platforms,       which can hinder troubleshooting and support.
  
  These factors contribute to the decision to choose a more suitable library, such as **react-native-mqtt**, for mobile applications.








Installation and Setup

![image](https://github.com/user-attachments/assets/06454513-52d2-4026-9d82-086569772748)

 
This project leverages the react-native-mqtt library, a robust MQTT client module for React Native, compatible with both iOS and Android platforms. The library includes bundled TypeScript definition files, ensuring seamless integration in TypeScript projects and enhancing compatibility with development tools that utilize .d.ts files.

Implementation of MQTT for Real-Time Communication :

  To enable real-time communication for live location updates, MQTT (Message Queuing Telemetry Transport) was implemented using react-native-mqtt. The MQTT broker utilized is hosted on HiveMQ, providing     a reliable platform for secure WebSocket connections.

  ![image](https://github.com/user-attachments/assets/b613b16c-89b2-4d13-9d45-33f8f4fb9da5)


Transition to TLS WebSocket URL :

  Initially, a standard WebSocket URL was used for communication with the MQTT broker. However, the implementation was upgraded to a TLS-secured WebSocket URL. This transition significantly enhances        the security of the connection by encrypting data in transit, protecting against eavesdropping and unauthorized access. The use of TLS ensures compliance with modern security standards and strengthens    the reliability of real-time data exchange.

Using MQTT*

  1.	Connection to Broker:
  The MQTT client is initialized with the broker's WebSocket URL, along with the necessary authentication credentials (username and password). Upon successful connection, the client subscribes to the       designated topic (`live/location`) to receive location updates.
   
   
  
  3.	Message Handling: 
  The client listens for incoming messages on the subscribed topic. When a message is received, it is parsed using the `query-string` library to extract latitude and longitude values. This data is then     stored in the component's state, allowing the application to update the user's location on the map dynamically.
   
  
  
  4.	Error Management:
   The MQTT client includes error handling to log any connection issues, ensuring that the application can respond appropriately to connectivity problems.
  
  5.	Publishing Location Data: 
  The application periodically publishes the user's current location to the MQTT broker. This is achieved through a throttled function that sends updates every second, ensuring efficient use of network      resources while maintaining timely updates.
  
  6.	Cleanup on Unmount:
   To prevent memory leaks, the MQTT client is properly closed when the component unmounts, ensuring that all subscriptions and connections are terminated.
   
Overall, the use of MQTT in this project facilitates efficient and real-time communication for live location tracking, enhancing the user experience by providing up-to-date positional information.

 Lodash 
Purpose
In this project, I utilized the  Lodash  library's `throttle` function to optimize the frequency of location updates sent to the MQTT broker. This technique is crucial for managing network resources effectively while ensuring that the application remains responsive.

Key Features of Lodash Throttle Implementation:

1.	Purpose of Throttling:
 The `throttle` function is designed to limit the rate at which a particular function can be executed. In the context of this project, it is used to control how often the user's location is published to the MQTT broker. By throttling the publish action, we prevent excessive network traffic and reduce the load on both the client and the server.

2.	Configuration:
 In this implementation, the throttled function is set to allow location updates every second (1000 milliseconds). This means that even if the user’s location changes more frequently, the application will only send updates at the throttled rate, ensuring optimal performance.




3.	Throttled Publish Function: 
The throttled function checks if the current latitude and longitude values are available before sending an update. If they are, it formats the location data into a query string using the `query-string` library and publishes it to the MQTT topic. This structured approach ensures that only valid location data is transmitted.

4.	Improved Performance: 
By using `throttle`, the application can maintain a balance between timely updates and resource efficiency. This is particularly important in mobile applications, where battery life and data usage are critical considerations.

5.	Integration with Location Updates:
 The throttled function is called within a set interval, which runs every second. This allows the application to continuously monitor the user’s location while adhering to the throttling constraints.

Overall, the use of  Lodash's throttle  function in this project enhances the application's efficiency by limiting the frequency of location updates sent to the MQTT broker. This approach not only conserves network resources but also improves the overall user experience by ensuring that updates are timely yet not overwhelming.

QoS Levels in MQTT
Here is how QoS works:
•	QoS 0 : received at most once : The packet is sent, and that's it. There is no validation about whether it has been received.

![image](https://github.com/user-attachments/assets/f0346be2-c85d-42d0-ab18-d0b1917ab608)


•	QoS 1 : received at least once : The packet is sent and stored as long as the client has not received a confirmation from the server. MQTT ensures that it will be received, but there can be duplicates.

![image](https://github.com/user-attachments/assets/7742a2ed-41fe-4da3-9338-734c406b1d2f)


•	QoS 2 : received exactly once : Same as QoS 1 but there is no duplicates.

![image](https://github.com/user-attachments/assets/9eb228dc-eb5f-4666-95fb-7e62d7ba1c40)


About data consumption, obviously, QoS 2 > QoS 1 > QoS 0, if that's a concern to you.








QueryString 

Understanding the Difference Between Query, URL Query, and Query String Parameters

1. Query
   
•	General Concept: A "query" is any request for data or information. In the context of URLs, it typically refers to the part of the URL used to pass data to the server or application.
•	Broader Use: The term "query" is not limited to URLs. For instance:
o	In SQL, a query fetches data from a database.
o	In REST APIs, a query fetches resources.

3. URL Query
   
•	Refers to the query component in a URL. This is the section of the URL where data is appended after a ? character.
•	It acts as a carrier for parameters that inform the server or application about the requested operation.

5. Query String Parameters
   
•	These are the key-value pairs embedded within the query string part of the URL. They represent actual data passed in the query.
•	Each key-value pair is separated by &, and the key is linked to the value with =.


![image](https://github.com/user-attachments/assets/e1da0a11-441d-4e8f-96c3-ae90300ac5f7)

Using the qs Library and Native Query String Handling

 ![image](https://github.com/user-attachments/assets/ff38e5a8-2fbd-41ef-87d7-15a46e51a355)


qs is a popular npm package used for serializing JavaScript objects into query strings. It provides an easy way to handle query parameters in web applications by converting object data into a format that can be appended to URLs for HTTP requests.

 This library allows for easy conversion of URL-encoded query strings into a JSON-like object. For instance, when a message arrives in the format lat=37.7749&lng=-122.4194, it is parsed to retrieve the coordinates, which are then stored in the component's state. This enables the application to update the user's location on the map dynamically.



useref

  In this React Native project, the `ref` feature from React is utilized to manage mutable references to components and instances, particularly for the MQTT client. Here’s how `ref` is effectively          implemented:
  
  Key Features of Using `ref`:
  
  1.	Storing Mutable References:
     
   The `useRef` hook is employed to create a mutable reference for the MQTT client. This allows the application to retain a reference to the MQTT client instance across re-renders without causing             additional renders. By storing the client in a `ref`, we can easily access it throughout the component lifecycle.
  
   
  3.	Avoiding Unnecessary Re-renders:
     
  When using state to store the MQTT client, any updates would trigger a re-render of the component. However, by using `ref`, we avoid this issue, ensuring that the component remains performant and responsive. The MQTT client can be updated without affecting the rendering process.
  
  5.	Accessing the Client:
     
After initializing the MQTT client within the `useEffect` hook, we store it in the `mqttClientRef`. This allows us to access the client later in the component, such as when handling incoming messages or publishing location updates.

 

7.	Cleanup on Unmount:
   
When the component unmounts, it’s important to clean up any active connections to prevent memory leaks. By accessing the MQTT client through the `ref`, we can easily disconnect the client without needing to manage its state. This is done in the cleanup function of the `useEffect` hook.
 

  9.	Encapsulation of Logic:
      
   Using `ref` helps encapsulate the logic related to the MQTT client, keeping it separate from the component’s state management. This separation of concerns makes the code cleaner and easier to maintain.
  
   Conclusion
  
  Using `ref` in this project enhances the management of the MQTT client by providing a way to store mutable references that persist across renders. This approach improves performance, simplifies           cleanup, and keeps the component logic organized. Overall, leveraging `ref` is a best practice in React for handling instances and mutable data that do not need to trigger re-renders.

 ##Challenges and Solutions

  challenge  overload and long time loading :
  
  We encountered a problem with the application taking too long to load, which led us to use **Lodash** to optimize the frequency of location updates and improve performance. By utilizing **ref**, we efficiently managed the MQTT client instance without causing unnecessary re-renders. Additionally, by setting the quality of service (QoS) level to 0 on the MQTT broker, we reduced overhead since there was no need for QoS 1 or 2, contributing to a faster loading time for the application.
  
  Challenge connect to mqt broker:
  I faced a challenge connecting to the MQTT broker in my project. To troubleshoot, I used MQTT Explorer, a graphical MQTT client, to verify the broker's configuration and connectivity. This tool allowed me to confirm the broker's host, port, authentication settings, and available topics. By successfully subscribing to topics and publishing messages via MQTT Explorer, I ensured the broker was properly configured. This step helped isolate the issue to my application code or network settings. 

   ![image](https://github.com/user-attachments/assets/b73fde37-8e7e-4d5d-9c46-d1f863f22810)

  
  packages outdated or incompatible 
  
  I faced challenges setting up the necessary packages for my React Native project, particularly ensuring compatibility and optimal configurations. To address this, I used React Native Audit, a tool that analyzes the project's dependencies and environment. It helped identify outdated or incompatible packages and provided recommendations for updates. This streamlined the setup process, ensuring my project was aligned with the latest standards and reducing potential runtime issues. By leveraging this tool, I resolved dependency-related challenges effectively.
  
  




