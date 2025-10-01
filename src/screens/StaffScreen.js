import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Card, Button, Chip, List, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { getStaffStudents, getStaffZones } from '../api';
import { AuthContext } from '../AuthContext';

export default function StaffScreen({ navigation }) {
  const { token, signOut } = useContext(AuthContext);
  const [zones, setZones] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const z = await getStaffZones(token);
      const s = await getStaffStudents(token);
      setZones(z || []); setStudents(s || []);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={{ flex:1, backgroundColor:'#f5f6f8' }}>
      <LinearGradient colors={['#111827', '#374151']} style={{ paddingTop:14, paddingBottom:14, paddingHorizontal:20 }}>
        <Text style={{ color:'#fff', fontSize:20, fontWeight:'700' }}>Staff Dashboard</Text>
      </LinearGradient>

      <View style={{ padding:16 }}>
        <Card style={{ borderRadius:16, marginBottom:12 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom:8 }}>Zones</Text>
            <View style={{ flexDirection:'row', flexWrap:'wrap', gap:8 }}>
              {zones.map((z, idx)=>(
                <Chip key={idx} elevated icon="office-building">
                  {z.zone}: {z.count}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={{ borderRadius:16 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom:8 }}>Students</Text>
            {students.map((s, idx)=>(
              <View key={idx}>
                <List.Item
                  title={`${s.name}`}
                  description={`${s.zone || '—'}   •   ${s.updated_at || ''}`}
                  left={props => <List.Icon {...props} icon="account-school" />}
                />
                {idx < students.length-1 && <Divider />}
              </View>
            ))}
          </Card.Content>
        </Card>

        <View style={{ height:12 }} />
        <Button mode="outlined" onPress={()=>navigation.navigate('Settings')}>Settings</Button>
        <View style={{ height:8 }} />
        <Button mode="text" onPress={signOut}>Sign Out</Button>
      </View>
    </View>
  );
}
