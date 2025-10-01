import React, { useState, useContext } from 'react';
import { View, Image } from 'react-native';
import { Text, TextInput, Button, Card, Divider } from 'react-native-paper';
import { login } from '../api';
import { AuthContext } from '../AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('parent@example.com');
  const [password, setPassword] = useState('parent123');
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async () => {
    setErr(''); setLoading(true);
    try {
      const payload = await login(email, password);
      await signIn(payload);
    } catch (e) {
      setErr(e.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <View style={{ flex:1, backgroundColor:'#f5f6f8' }}>
      <LinearGradient colors={['#111827', '#374151']} style={{ paddingTop:80, paddingBottom:32, paddingHorizontal:20 }}>
        <Text style={{ color:'#fff', fontSize:28, fontWeight:'700', marginBottom:4 }}>Student Tracking</Text>
        <Text style={{ color:'#d1d5db' }}>Sign in to continue</Text>
      </LinearGradient>

      <View style={{ padding:20, marginTop:-24 }}>
        <Card mode="elevated" style={{ borderRadius:16 }}>
          <Card.Content>
            <Text variant="labelLarge" style={{ marginBottom:8 }}>Email</Text>
            <TextInput mode="outlined" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <Text variant="labelLarge" style={{ marginTop:12, marginBottom:8 }}>Password</Text>
            <TextInput mode="outlined" value={password} onChangeText={setPassword} secureTextEntry />
            {!!err && <Text style={{ color:'#b91c1c', marginTop:10 }}>{err}</Text>}
            <Button mode="contained" style={{ marginTop:16, borderRadius:12 }} loading={loading} onPress={onSubmit}>
              Sign In
            </Button>
            <Divider style={{ marginVertical:16 }} />
            <Button mode="text" onPress={() => navigation.navigate('Settings')}>Settings</Button>
            <Text style={{ color:'#6b7280', marginTop:12 }}>
              Demo users: parent@example.com / parent123 • staff@example.com / staff123
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
