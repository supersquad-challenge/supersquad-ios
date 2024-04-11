import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as WebBrowser from "expo-web-browser";
import store from "@/src/redux/store";
import HomeScreen from "@/src/screens/HomeScreen";
import ProfileScreen from "@/src/screens/ProfileScreen";
import SignInScreen from "@/src/screens/SignInScreen";
import ExploreScreen from "@/src/screens/ExploreScreen";
import MyChallengeScreen from "@/src/screens/MyChallengeScreen";
import ChallengeDetail from "@/src/screens/ChallengeDetail";
import SplashScreen from "@/src/screens/SplashScreen";
import MyChallengeDetailScreen from "@/src/screens/MyChallengeDetailScreen";
import ChallengeStatusModal from "@/src/screens/modal/ChallengeStatusModal";
import CompleteChallenegeModal from "@/src/screens/modal/CompleteChallengeModal";
import ExploreChallengeModal from "@/src/screens/modal/ExploreChallengeModal";
import JoinChallengeModal from "@/src/screens/modal/JoinChallengeModal";
import SubmitPhotoModal from "@/src/screens/modal/SubmitPhotoModal";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_SENDER_ID,
  FIREBASE_STORAGE,
} from "@env";
import { Text } from "react-native";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const auth = getAuth(app);

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    ClashDisplayVariable: require("@/assets/static/fonts/clashdisplay/ClashDisplay-Variable.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Hello</Text>;
  }

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Stack.Navigator initialRouteName={"HomeScreen"}>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExploreScreen"
              component={ExploreScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{ headerShown: false }}
              initialParams={{
                auth: auth,
              }}
            />
            <Stack.Screen
              name="MyChallengeScreen"
              component={MyChallengeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyChallengeDetailScreen"
              component={MyChallengeDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChallengeDetailScreen"
              component={ChallengeDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChallengeStatusModal"
              component={ChallengeStatusModal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CompleteChallengeModal"
              component={CompleteChallenegeModal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExploreChallengeModal"
              component={ExploreChallengeModal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JoinChallengeModal"
              component={JoinChallengeModal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SubmitPhotoModal"
              component={SubmitPhotoModal}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
