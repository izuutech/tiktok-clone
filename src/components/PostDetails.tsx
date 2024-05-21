import {StyleSheet, View, Text, Platform} from 'react-native';
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
        <Text style={[styles.username, {color: 'white'}]}>
          @{post.username?.toLowerCase()}
        </Text>
        <Text style={[styles.caption, {color: 'white'}]}>{post.caption}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 180,
  },
  displaybox: {
    paddingHorizontal: '5%',
    paddingVertical: 10,
    width: '80%',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 15,
    lineHeight: 17,
    fontWeight: 'bold',
    width: '100%',
    textAlignVertical: 'center',
    marginBottom: 2,
  },
  caption: {
    fontFamily: 'carbona-reg',
    fontSize: 14,
    lineHeight: 15,

    width: '100%',
    flexWrap: 'wrap',
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
