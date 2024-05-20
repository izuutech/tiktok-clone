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
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Video, {ResizeMode} from 'react-native-video';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const VideoPlayer = forwardRef(
  (
    {
      setOpenShare,
      openComments,
      height,
      heightWithOpenComment,
      thumbnail,
      video,
      loader,
      setShowVideoTabs,
      postId,
    }: Partial<any>,
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
        {pause === true && (
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
            poster={thumbnail}
            onError={e => console.log(e, 'error loggg video')}
            repeat={true}
            // paused={ready === false ? true : pause}
            paused={pause}
          />
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
