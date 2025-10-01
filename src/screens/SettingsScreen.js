import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Card, TextInput, Button } from 'react-native-paper';
import { setBaseUrl, BASE_URL } from '../api';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const [url, setUrl] = useState(BASE_URL);
  return (
    <View style={{ flex:1, backgroundColor:'#f5f6f8' }}>
      <LinearGradient colors={['#111827', '#374151']} style={{ paddingTop:14, paddingBottom:14, paddingHorizontal:20 }}>
        <Text style={{ color:'#fff', fontSize:20, fontWeight:'700' }}>Settings</Text>
      </LinearGradient>

      <View style={{ padding:16 }}>
        <Card style={{ borderRadius:16 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom:8 }}>API Base URL</Text>
            <TextInput mode="outlined" value={url} onChangeText={setUrl} autoCapitalize="none" />
            <Button mode="contained" style={{ marginTop:12, borderRadius:10 }} onPress={()=>setBaseUrl(url)}>
              Save
            </Button>
            <Text style={{ color:'#6b7280', marginTop:12 }}>
              Example: https://your-fastapi.onrender.com
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
