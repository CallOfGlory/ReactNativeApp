import { View, Text, StyleSheet } from 'react-native';

const LIGHTS = [
  { key: 'red', label: 'STOP', on: '#E14F4F', off: '#4A2323' },
  { key: 'yellow', label: 'READY', on: '#F2B705', off: '#4A3E12' },
  { key: 'green', label: 'GO', on: '#2FB170', off: '#1D3C2C' },
];

export default function TrafficLightScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.housing}>
        {LIGHTS.map((light) => (
          <View key={light.key} style={[styles.bulb, { backgroundColor: light.on }]}>
            <Text style={styles.bulbText}>{light.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F1720',
    alignItems: 'center',
    justifyContent: 'center',
  },
  housing: {
    backgroundColor: '#2B2F33',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bulb: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  bulbText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
