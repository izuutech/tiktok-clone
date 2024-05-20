import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from 'react-native';
import {IVideo} from '../types/video';

export default function PostDetails({post}: {post: IVideo}) {
  const palette: any = {};
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#ffffff05',
        // height: height || title?.length > 50 ? '55%' : styles.container.height,
      }}>
      <View style={[styles.displaybox]}>
        <Text style={[styles.sixty, {color: 'white'}]}>
          @{post.username?.toLowerCase()}
        </Text>
        <Text style={[styles.sixtyBold, {color: 'white'}]}>
          {post.caption?.substring(0, 151) || ''}
          {post.caption?.length > 151 ? '...' : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 80,
    overflow: 'hidden',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 250,
  },
  displaybox: {
    paddingHorizontal: '5%',
    paddingVertical: 10,
    width: '100%',
    minHeight: '100%',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sixty: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
    width: '100%',
    textAlignVertical: 'center',
    marginBottom: 2,
  },
  sixtyBold: {
    fontFamily: 'carbona-reg',
    fontSize: 14,
    lineHeight: 15,
    // ...Platform.select({
    //   // ios: {height: 14},
    //   android: {height: '50%'},
    // }),
    width: '100%',
    textAlignVertical: 'center',
  },
  btn: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'carbona-bold',
    fontSize: 14,
    lineHeight: 14,
    ...Platform.select({
      ios: {height: 14},
      android: {height: '100%'},
    }),
    textAlignVertical: 'center',
  },
});
