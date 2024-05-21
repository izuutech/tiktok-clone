import React, {
  useContext,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Keyboard,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';

import Video, {ResizeMode} from 'react-native-video';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {FlashList} from '@shopify/flash-list';

export const VideoPlayer = forwardRef(
  (
    {
      setOpenShare,
      openComments,
      height,
      heightWithOpenComment,
      thumbnail,
      video,
      image,
      loader,
      setShowVideoTabs,
      postId,
      index,
      flashListRef,
    }: {flashListRef: {current: FlashList<any> | null}} & Partial<any>,
    parentRef,
  ) => {
    const videoPlayerRef = useRef<any>(null);
    const [pause, setPause] = useState(true);
    const [ready, setReady] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);
    const palette: any = {};

    useImperativeHandle(parentRef, () => ({
      playVideo,
      pauseVideo,
      unload,
      setPostId,
    }));

    const playVideo = () => {
      if (videoPlayerRef.current == null) {
        return;
      }
      if (pause === false) {
        return;
      }
      setPause(false);
    };

    const setPostId = (funcToSet: any) => {
      if (videoPlayerRef.current == null) {
        return;
      }
      funcToSet(postId);
    };

    const pauseVideo = () => {
      if (videoPlayerRef.current == null) {
        return;
      }
      if (pause === true) {
        return;
      }
      setPause(true);
    };
    const unload = () => {
      if (videoPlayerRef.current == null) {
        return;
      }
      if (pause === true) {
        return;
      }
      videoPlayerRef.current.seek(0);
      setPause(true);
    };

    useFocusEffect(
      useCallback(() => {
        const unsubscribe = () => {
          setPause(true);
        };

        return () => unsubscribe();
      }, []),
    );

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (pause === false) {
          setShowVideoTabs(false);
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }, [pause]);
    useEffect(() => {
      if (pause === true) {
        setShowVideoTabs(true);
      }
    }, [pause]);
    useEffect(() => {
      setTimeout(() => {
        flashListRef?.current?.scrollToIndex({
          index: index + 1,
          animated: true,
        });
      }, 10000);
    }, []);

    return (
      <View
        style={[
          {
            height: openComments
              ? heightWithOpenComment
                ? heightWithOpenComment
                : '35%'
              : height || '100%',
            width: '100%',
          },
          styles.container,
          {backgroundColor: 'black'},
        ]}>
        {video && pause === true && (
          <FontAwesome5
            name="play"
            size={50}
            color={'white'}
            onPress={() => {
              setPause(!pause);
              setOpenShare(false);
            }}
            style={styles.play}
          />
        )}
        {(loader || ready === false) && (
          <ActivityIndicator
            style={styles.loader}
            color={palette.primary}
            size={50}
          />
        )}
        <TouchableHighlight
          onPress={() => {
            setPause(!pause);
            setOpenShare(false);
          }}>
          {video ? (
            <Video
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: aspectRatio,
              }}
              resizeMode={ResizeMode.COVER}
              ref={videoPlayerRef}
              source={{uri: video}}
              volume={1}
              muted={false}
              onLoad={({naturalSize}) => {
                if (naturalSize && naturalSize.width && naturalSize.width > 0) {
                  setAspectRatio(naturalSize.width / naturalSize.height);
                }
                setReady(true);
              }}
              onEnd={() => {
                videoPlayerRef.current.seek(0);
                flashListRef?.current?.scrollToIndex({
                  index: index + 1,
                  animated: true,
                });
              }}
              poster={thumbnail}
              onError={e => console.log(e, 'error loggg video')}
              repeat={false}
              // paused={ready === false ? true : pause}
              paused={pause}
            />
          ) : (
            <Image
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: aspectRatio,
              }}
              onLoad={({nativeEvent}) => {
                if (
                  nativeEvent.source &&
                  nativeEvent.source.width &&
                  nativeEvent.source.width > 0
                ) {
                  setAspectRatio(
                    nativeEvent.source.width / nativeEvent.source.height,
                  );
                }
                setReady(true);
              }}
              onLoadEnd={() => {
                console.log('endedd');
                // setTimeout(() => {
                //   flashListRef?.current?.scrollToIndex({
                //     index: index + 1,
                //     animated: true,
                //   });
                // }, 10000);
              }}
              source={{uri: image}}
            />
          )}
        </TouchableHighlight>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loader: {
    position: 'absolute',
    left: '43%',
    zIndex: 10,
    top: '40%',
  },
  play: {
    opacity: 0.66,
    position: 'absolute',
    left: '45%',
    top: '40%',
    zIndex: 5,
  },
});

export default VideoPlayer;
