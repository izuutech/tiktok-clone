import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {IVideo} from '../types/video';

export default function PostDetails({post}: {post: IVideo}) {
  const [showFullCaption, setShowFullCaption] = useState(false);

  const handleSeeMore = () => {
    setShowFullCaption(!showFullCaption);
  };

  const renderCaption = () => {
    if (showFullCaption) {
      return post.caption.split(' ').map((word, index) => (
        <Text
          key={index}
          style={word.startsWith('#') ? styles.boldText : styles.text}>
          {word}{' '}
        </Text>
      ));
    } else {
      const truncatedCaption =
        post.caption.length > 50
          ? post.caption.slice(0, 50) + '...'
          : post.caption;
      return truncatedCaption.split(' ').map((word, index) => (
        <Text
          key={index}
          style={word.startsWith('#') ? styles.boldText : styles.text}>
          {word}{' '}
        </Text>
      ));
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.displaybox]}>
        <Text style={[styles.username, {color: 'white'}]}>
          @{post.username?.toLowerCase()}
        </Text>
        <Text style={[styles.caption, {color: 'white'}]}>
          {renderCaption()}{' '}
          {post.caption.length > 50 && (
            <Text style={styles.btnText} onPress={handleSeeMore}>
              {showFullCaption ? ' See less' : ' See more'}
            </Text>
          )}
        </Text>
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
    fontSize: 14,
    lineHeight: 15,
    width: '100%',
    flexWrap: 'wrap',
    textAlignVertical: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 15,
    color: 'white',
  },
  boldText: {
    fontSize: 14,
    lineHeight: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 15,
    textAlignVertical: 'center',
    color: 'white',
    marginTop: 5,
  },
});
