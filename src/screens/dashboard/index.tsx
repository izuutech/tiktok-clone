import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Alert,
  FlatList,
  Text,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {useContext, useState, useCallback, useRef, useEffect} from 'react';

import {useQuery} from 'react-query';
import DashboardView from './DashboardView';
import CommentBox from '../../components/CommentBox';
import httpService from '../../apis/http';
import {URLS} from '../../apis/urls';
import {IVideo} from '../../types/video';

const windowHeight = Dimensions.get('window').height;

const fetchAllPostsSecondEndPoint = async (j: any) => {
  return;
};
const fetchPost = async (j: any) => {
  return;
};
const getChallengeByShortCode = async (j: any) => {
  return;
};
export default function Dashboard({navigation, route}: Partial<any>) {
  const palette: any = {};
  const mediaRefs = useRef([]);
  const flatListRef = useRef(null);
  const [showVideoTabs, setShowVideoTabs] = useState(true);
  const [fetchMore, setFetchMore] = useState(true);
  const [pagination, setPagination] = useState({page: 1, limit: 4});
  const [videoList, setVideoList] = useState<IVideo[]>([]);
  const [openComments, setOpenComments] = useState(false);
  const [commentId, setCommentId] = useState('');
  const [openShare, setOpenShare] = useState(false);
  const [openModal, setOpenModal] = useState({active: false, challenge: {}});

  const {isFetching, isLoading, isRefetching, refetch} = useQuery(
    `all_posts`,
    () => httpService.get(`${URLS.FOLLOWING}`),
    {
      onSuccess: res => {
        setVideoList([...res.data]);
        console.log(res.data, 'resppp');
      },
    },
  );

  // console.log(data?.data, 'zp12e34');

  const onViewableItemsChanged = useRef(({changed}: any) => {
    // console.log(changed, 'changed');
    changed.forEach((el: any) => {
      const cell: any = mediaRefs.current[el.index];
      if (cell) {
        setOpenShare(false);
        // console.log(el, el.isViewable, 'bbbbbbelllll');
        if (el.isViewable) {
          cell.playVideo();
          cell.setPostId(setCommentId);
        } else {
          cell.pauseVideo();
        }
      }
    });
  });

  useEffect(() => {
    setFetchMore(false);
  }, []);

  useEffect(() => {
    if (fetchMore === true) {
      refetch();
    }
  }, [pagination]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        mediaRefs.current = [];
        // setVideoList([]);
      };

      return () => unsubscribe();
    }, [route]),
  );

  return (
    <KeyboardAvoidingView behavior={'position'}>
      <View style={[styles.container, {backgroundColor: palette.surface}]}>
        <FlatList
          ref={flatListRef}
          // data={dummyVideos}
          data={videoList}
          pagingEnabled={true}
          windowSize={3}
          maxToRenderPerBatch={2}
          initialNumToRender={1}
          removeClippedSubviews={true}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 90,
          }}
          onViewableItemsChanged={onViewableItemsChanged.current}
          keyExtractor={(item, index) => item.id}
          decelerationRate={'normal'}
          onEndReached={() => {
            if (!isFetching && !isRefetching && !isLoading) {
              setPagination(prev => ({
                ...pagination,
                page: (prev.page += 1),
              }));
            }
          }}
          onEndReachedThreshold={0.1}
          onScrollBeginDrag={() => {
            setFetchMore(true);
          }}
          renderItem={({item, index}) => (
            <DashboardView
              item={item}
              index={index}
              key={item.id}
              mediaRefs={mediaRefs}
              showVideoTabs={showVideoTabs}
              setShowVideoTabs={setShowVideoTabs}
              openComments={openComments}
              setOpenComments={setOpenComments}
              video={item.videoUrl}
              openShare={openShare}
              setOpenShare={setOpenShare}
            />
          )}
        />
        {/* {(isLoading || isFetching || isRefetching) && (
          <ActivityIndicator
            size={50}
            style={styles.loader}
            color={palette.surface}
          />
        )} */}
        {openComments && <CommentBox />}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    ...Platform.select({
      ios: {
        height: windowHeight,
      },
      android: {
        height: windowHeight,
      },
    }),
    // height: '100%',
    // flex: 1,
  },
  communityBox: {
    position: 'absolute',
    right: '2.5%',
    zIndex: 6,
    top: '2.5%',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  people: {
    width: 25,
    height: 25,
  },
  loader: {
    position: 'absolute',
    top: '40%',
    left: '45%',
  },
});
