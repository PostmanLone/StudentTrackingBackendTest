import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme as NavTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme, configureFonts } from 'react-native-paper';
import AuthProvider, { AuthContext } from './AuthContext';
import LoginScreen from './screens/LoginScreen';
import ParentScreen from './screens/ParentScreen';
import StaffScreen from './screens/StaffScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const fonts = configureFonts({
  config: {
    fontFamily: 'System',
  },
});

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#111827',
    secondary: '#6b7280',
    surface: '#ffffff',
    background: '#f5f6f8',
    onSurface: '#111827',
  },
  fonts,
};

const navTheme = {
  ...NavTheme,
  colors: { ...NavTheme.colors, background: '#f5f6f8' },
};

function Root() {
  const { token, role } = useContext(AuthContext);
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : role === 'staff' || role === 'admin' ? (
          <>
            <Stack.Screen name="Staff" component={StaffScreen} options={{ title: 'Staff Dashboard' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Parent" component={ParentScreen} options={{ title: 'Parent' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </PaperProvider>
  );
}
