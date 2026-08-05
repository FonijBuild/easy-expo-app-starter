import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import type { ZodType } from 'zod';

async function getSecureValue(key: string): Promise<string | null> {
  if (Platform.OS === 'web') return AsyncStorage.getItem(key);
  return SecureStore.getItemAsync(key);
}

async function setSecureValue(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

async function deleteSecureValue(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export function createJsonStorage<T>(key: string, schema: ZodType<T>, secure = false) {
  return {
    async read(): Promise<T | null> {
      const raw = secure ? await getSecureValue(key) : await AsyncStorage.getItem(key);
      if (!raw) return null;
      try {
        const parsed: unknown = JSON.parse(raw);
        const result = schema.safeParse(parsed);
        if (result.success) return result.data;
      } catch {
        // Invalid persisted data is cleared below.
      }
      await this.clear();
      return null;
    },
    async write(value: T): Promise<void> {
      const serialized = JSON.stringify(value);
      if (secure) await setSecureValue(key, serialized);
      else await AsyncStorage.setItem(key, serialized);
    },
    async clear(): Promise<void> {
      if (secure) await deleteSecureValue(key);
      else await AsyncStorage.removeItem(key);
    },
  };
}
