import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  Constants.expoConfig?.extra?.clerkPublishableKey || "";

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}
