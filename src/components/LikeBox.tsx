import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

import {useContext, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';

const avatarPlaceholder = require('../assets/avatarPlaceholder.png');

export default function LikeBox({
  openShare,
  setOpenShare,
  setOpenModal,
  openModal,
  setOpenComments,
  openComments,
  canOpenComment,
  post,
  refetchPost,
  commentCount,
  queryKey,
  challenge,
}: Partial<any>) {
  const palette: any = {};
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const closingDate = new Date(challenge?.challenge?.closingDate);
  const todaysDate = new Date();

  // To calculate the time difference of two dates
  const difference_In_Time = closingDate.getTime() - todaysDate.getTime();

  // To calculate the no. of days between two dates
  const difference_In_Days = Math.round(
    difference_In_Time / (1000 * 3600 * 24),
  );
  const {
    refetch: refreshFetchedUser,
    data: userData,
    isFetching,
    isRefetching,
    isLoading,
  } = useQuery(queryKey, async () => {}, {
    enabled: false,
    refetchOnWindowFocus: 'always',
  });

  const like_submit = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => (prev -= 1));
      return;
    }
    setIsLiked(true);
    setLikesCount(prev => (prev += 1));
  };

  const unlike_submit = async () => {
    setIsLiked(false);
    setLikesCount(prev => (prev -= 1));
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
            source={avatarPlaceholder}
            onLoad={() => setAvatarLoaded(true)}
            style={styles.userIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={follow_user}
          style={[styles.followCircle, {backgroundColor: 'red'}]}>
          {isFollowing ? (
            <Fontisto name="check" size={7} color="white" />
          ) : (
            <Octicons name="plus" size={15} color={'white'} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.box}
        // onPress={isVoted ? unvote_submit : vote_submit}
        onPress={like_submit}>
        {<AntDesign name="heart" size={35} color={isLiked ? 'red' : 'white'} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.boxWithText, {height: undefined, marginBottom: 5}]}>
        <Text style={[styles.text, {color: 'white'}]}>
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxWithText}
        onPress={
          canOpenComment === false
            ? () => {}
            : () => setOpenComments(!openComments)
        }>
        <FontAwesome
          name="commenting"
          size={35}
          style={{transform: [{rotateY: '180deg'}]}}
          color="white"
        />
        <Text style={[styles.text, {color: 'white'}]}>{commentCount}</Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <Entypo
          name="forward"
          size={35}
          color={'white'}
          onPress={() => setOpenShare((prev: boolean) => !prev)}
        />
      </View>
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
    marginTop: 5,
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
