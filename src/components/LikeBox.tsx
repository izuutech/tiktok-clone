import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {useEffect, useState} from 'react';
import useToast from '../hooks/useToast';
import {IVideo} from '../types/video';

export default function LikeBox({
  likes,
  item,
  commentCount,
}: Partial<{
  likes: number;
  commentCount: number;
  item: IVideo;
}>) {
  const palette: any = {};
  const toast = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [showFollow, setShowFollow] = useState(true);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [likesCount, setLikesCount] = useState(likes as number);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (isFollowing) {
        setShowFollow(false);
      }
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFollowing]);
  const like_submit = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev: number) => (prev -= 1));
      return;
    }

    setIsLiked(true);
    setLikesCount((prev: number) => (prev += 1));
  };

  const follow_user = async () => {
    setIsFollowing(prev => !prev);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: palette.darkOpacity,
        },
      ]}>
      <View style={styles.boxWithText}>
        <TouchableOpacity
          style={[
            styles.imgbox,
            {borderColor: 'white', borderWidth: avatarLoaded ? 0 : 1},
          ]}
          onPress={() => {}}>
          <Image
            source={{uri: item?.profilePhotoUrl}}
            onLoad={() => setAvatarLoaded(true)}
            style={styles.userIcon}
          />
        </TouchableOpacity>
        {showFollow && (
          <TouchableOpacity
            onPress={follow_user}
            style={[styles.followCircle, {backgroundColor: 'red'}]}>
            {isFollowing ? (
              <Fontisto name="check" size={7} color="white" />
            ) : (
              <Octicons name="plus" size={15} color={'white'} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.box} onPress={like_submit}>
        {<AntDesign name="heart" size={35} color={isLiked ? 'red' : 'white'} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.boxWithText, {height: undefined, marginBottom: 5}]}>
        <Text style={[styles.text, {color: 'white'}]}>{likesCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxWithText}
        onPress={() => {
          toast.show('my_success', {
            type: 'my_success',
            data: {
              title: 'Message:',
              message:
                'Your intentions are clear! Unfortunately, the comments do not want to be viewed by you.',
            },
          });
        }}>
        <FontAwesome name="commenting" size={35} color="white" />
        <Text style={[styles.text, {color: 'white'}]}>{commentCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxWithText}
        onPress={() => {
          toast.show('my_success', {
            type: 'my_success',
            data: {
              title: 'Message:',
              message:
                'You must not share everything, try to be stingy with content ',
            },
          });
        }}>
        <Entypo name="forward" size={35} color={'white'} />
        <Text style={[styles.text, {color: 'white'}]}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    right: '2.5%',
    top: '35%',
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  imgbox: {
    marginTop: 5,
    height: 35,
    width: 35,
    borderRadius: 35,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  followCircle: {
    width: 18,
    height: 18,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -5,
    left: 14,
  },
  boxWithText: {
    marginTop: 10,
    height: 46,
    width: 46,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    marginTop: 15,
    height: 40,
    width: 46,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'carbona-reg',
    fontSize: 14,
    lineHeight: 15,
    width: '100%',
    textAlign: 'center',
    marginTop: 1,
  },
  userIcon: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});
