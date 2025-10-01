import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Card, Button, TextInput, Chip, List, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../AuthContext';
import { getParentChild, getParentAlerts } from '../api';

export default function ParentScreen({ navigation }) {
  const { token, profile } = useContext(AuthContext);
  const [studentId, setStudentId] = useState(profile?.student_id || 'S-001');
  const [current, setCurrent] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const c = await getParentChild(token, studentId);
      const a = await getParentAlerts(token, studentId);
      setCurrent(c); setAlerts(a || []);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={{ flex:1, backgroundColor:'#f5f6f8' }}>
      <LinearGradient colors={['#111827', '#374151']} style={{ paddingTop:14, paddingBottom:14, paddingHorizontal:20 }}>
        <Text style={{ color:'#fff', fontSize:20, fontWeight:'700' }}>Parent</Text>
      </LinearGradient>

      <View style={{ padding:16 }}>
        <Card style={{ borderRadius:16, marginBottom:12 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom:6 }}>Student</Text>
            <TextInput mode="outlined" value={studentId} onChangeText={setStudentId} right={<TextInput.Icon icon="account" />} />
            <Button mode="contained" style={{ marginTop:12, borderRadius:10 }} loading={loading} onPress={load}>Refresh</Button>
          </Card.Content>
        </Card>

        <Card style={{ borderRadius:16, marginBottom:12 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom:8 }}>Current Zone</Text>
            <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
              <Chip icon="map-marker" elevated>{current?.zone || '—'}</Chip>
            </View>
            <Text style={{ color:'#6b7280', marginTop:8 }}>Updated: {current?.updated_at || '—'}</Text>
          </Card.Content>
        </Card>

        <Card style={{ borderRadius:16 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom:8 }}>Recent Alerts</Text>
            {alerts.length === 0 ? (
              <Text style={{ color:'#6b7280' }}>No alerts.</Text>
            ) : alerts.map((a, idx)=>(
              <View key={idx}>
                <List.Item
                  title={a.message || a.type}
                  description={a.ts}
                  left={props => <List.Icon {...props} icon="bell-outline" />}
                />
                {idx < alerts.length-1 && <Divider />}
              </View>
            ))}
          </Card.Content>
        </Card>

        <View style={{ height:12 }} />
        <Button mode="outlined" onPress={()=>navigation.navigate('Settings')}>Settings</Button>
      </View>
    </View>
  );
}
