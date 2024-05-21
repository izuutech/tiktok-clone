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
import {FlashList} from '@shopify/flash-list';

import {useContext, useState, useCallback, useRef, useEffect} from 'react';

import {useQuery} from 'react-query';
import DashboardView from './DashboardView';
import httpService from '../../apis/http';
import {URLS} from '../../apis/urls';
import {IVideo} from '../../types/video';

const windowHeight = Dimensions.get('window').height;
export default function Fyp({navigation, route}: Partial<any>) {
  const palette: any = {};
  const mediaRefs = useRef([]);
  const flashListRef = useRef<any>(null);
  const [showVideoTabs, setShowVideoTabs] = useState(true);
  const [fetchMore, setFetchMore] = useState(true);
  const [pagination, setPagination] = useState({page: 1, limit: 4});
  const [videoList, setVideoList] = useState<IVideo[]>([]);
  const [openComments, setOpenComments] = useState(false);

  const {isFetching, isLoading, isRefetching, refetch} = useQuery(
    `fyp`,
    () => httpService.get(`${URLS.FYP}`),
    {
      onSuccess: res => {
        const arr = res.data.map((item: IVideo) => ({
          ...item,
          videoUrl:
            item.type === 'video'
              ? 'https://videos.pexels.com/video-files/3209829/3209829-uhd_3840_2160_25fps.mp4'
              : item.videoUrl,
        }));
        setVideoList([...arr]);
        // setVideoList([...res.data]);
      },
    },
  );

  const onViewableItemsChanged = useRef(({changed}: any) => {
    // console.log(changed, 'changed');
    changed.forEach((el: any) => {
      const cell: any = mediaRefs.current[el.index];
      if (cell) {
        // console.log(el, el.isViewable, 'bbbbbbelllll');
        if (el.isViewable) {
          cell.callViewableIndex(el?.index);
          if (el?.item.type === 'image') {
            cell.startCountdown(el?.index, mediaRefs.current.length);
            return;
          }
          cell.playVideo(el?.index, mediaRefs.current.length);
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
        <FlashList
          ref={flashListRef}
          data={videoList}
          pagingEnabled={true}
          estimatedItemSize={200}
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
              active={'fyp'}
              index={index}
              key={item.id}
              mediaRefs={mediaRefs}
              showVideoTabs={showVideoTabs}
              setShowVideoTabs={setShowVideoTabs}
              flashListRef={flashListRef as any}
              openComments={openComments}
              setOpenComments={setOpenComments}
              video={item.videoUrl}
              image={item.imageUrl}
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
