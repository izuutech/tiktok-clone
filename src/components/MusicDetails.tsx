import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

export default function MusicDetails() {
  const palette = {};
  return (
    <View style={[styles.container]}>
      <FontAwesome
        name="music"
        size={16}
        style={{marginRight: 10}}
        color={'white'}
      />
      <Text style={[styles.text, {color: 'white'}]}>
        I got no rule - Dua Lipa{' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '5%',
    position: 'absolute',
    top: '77%',
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'carbona-reg',
    fontSize: 13,
    lineHeight: 13,
    height: '100%',
  },
});
