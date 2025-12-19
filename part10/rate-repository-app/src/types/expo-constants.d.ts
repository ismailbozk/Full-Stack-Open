// Custom type definitions for expo-constants
// This file extends the expo-constants types with our app-specific config
import 'expo-constants';

declare module 'expo-constants' {
  export interface ExpoConfig {
    extra?: {
      env?: string;
      apolloUri?: string;
    };
  }
}
