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
  View,
  ActivityIndicator,
  Image,
  NativeSyntheticEvent,
  ImageLoadEventData,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Video, {ResizeMode} from 'react-native-video';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {FlashList} from '@shopify/flash-list';
import RouteContext from '../contexts/routecontext';

export const VideoPlayer = forwardRef(
  (
    {
      thumbnail,
      video,
      image,
      loader,
      flashListRef,
    }: {flashListRef: {current: FlashList<any> | null}} & Partial<any>,
    parentRef,
  ) => {
    const {toggle} = useContext(RouteContext);

    const videoPlayerRef = useRef<any>(null);
    const imageRef = useRef<any>(null);
    const timeoutRef = useRef<any>(null);
    const [pause, setPause] = useState(true);
    const [viewableIndex, setViewableIndex] = useState(0);
    const [arrLength, setArrLength] = useState(0);
    const [ready, setReady] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);

    useImperativeHandle(parentRef, () => ({
      playVideo,
      startCountdown,
      stopCountdown,
      callViewableIndex,
      pauseVideo,
      unload,
    }));

    const playVideo = (currentViewableIndex: number, length: number) => {
      if (videoPlayerRef.current == null) {
        return;
      }
      if (pause === false) {
        return;
      }
      setViewableIndex(currentViewableIndex);
      setArrLength(length);
      setPause(false);
    };

    const callViewableIndex = (index: number) => {
      if (videoPlayerRef.current == null) {
        return;
      }
      setViewableIndex(index);
    };

    const stopCountdown = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const startCountdown = (currentViewableIndex: number, length: number) => {
      if (imageRef.current == null) {
        return;
      }

      setViewableIndex(currentViewableIndex);
      setArrLength(length);
      if (currentViewableIndex < length - 1) {
        timeoutRef.current = setTimeout(() => {
          flashListRef?.current?.scrollToIndex({
            index: currentViewableIndex + 1,
            animated: true,
          });
        }, 10000);
      }
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
          pauseVideo();
          stopCountdown();
        };

        return () => unsubscribe();
      }, []),
    );

    useEffect(() => {
      pauseVideo();
    }, [toggle]);

    const onLoad = useCallback(
      ({nativeEvent}: NativeSyntheticEvent<ImageLoadEventData>) => {
        if (
          nativeEvent.source &&
          nativeEvent.source.width &&
          nativeEvent.source.width > 0
        ) {
          setAspectRatio(nativeEvent.source.width / nativeEvent.source.height);
        }
        setReady(true);
      },
      [viewableIndex],
    );
    return (
      <View
        style={[
          {
            height: '100%',
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
            }}
            style={styles.play}
          />
        )}
        {video && (loader || ready === false) && (
          <ActivityIndicator style={styles.loader} color={'white'} size={50} />
        )}
        <TouchableHighlight
          onPress={() => {
            setPause(!pause);
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
                if (viewableIndex < arrLength) {
                  flashListRef?.current?.scrollToIndex({
                    index: viewableIndex + 1,
                    animated: true,
                  });
                }
              }}
              poster={thumbnail}
              onError={e => console.log('e', 'error loggg video')}
              repeat={true}
              paused={pause}
            />
          ) : (
            <Image
              ref={imageRef}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: aspectRatio,
              }}
              resizeMode="cover"
              onLoad={onLoad}
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

export default React.memo(VideoPlayer);
