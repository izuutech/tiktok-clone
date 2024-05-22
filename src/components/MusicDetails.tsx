import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View} from 'react-native';
import Marquee from './Marquee';

export default function MusicDetails() {
  return (
    <View style={[styles.container]}>
      <FontAwesome
        name="music"
        size={16}
        style={{marginRight: 10}}
        color={'white'}
      />
      <View style={styles.marqueebox}>
        <Marquee text=" Roddy Roundicch - The Round Table" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '5%',
    position: 'absolute',
    bottom: 120,
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'carbona-reg',
    fontSize: 13,
    lineHeight: 16,
    height: '100%',
  },
  marqueebox: {
    width: '80%',
    overflow: 'hidden',
  },
});
