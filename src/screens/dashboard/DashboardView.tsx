import {StyleSheet, View, Dimensions} from 'react-native';

import VideoPlayer from '../../components/VideoPlayer';
import LikeBox from '../../components/LikeBox';
import {IVideo} from '../../types/video';
import PostDetails from '../../components/PostDetails';
import MusicDetails from '../../components/MusicDetails';
import {FlashList} from '@shopify/flash-list';

const windowHeight = Dimensions.get('window').height;

export default function DashboardView({
  mediaRefs,
  item,
  index,
  showVideoTabs,
  setShowVideoTabs,
  video,
  flashListRef,
  image,
  route,
  jumpTo,
}: {
  route: {key: string; title: string};
  jumpTo: (key: string) => void;
} & Partial<{
  mediaRefs: any;
  item: IVideo;
  index: number;
  showVideoTabs: boolean;
  setShowVideoTabs: any;
  video: string;
  image: string;
  flashListRef: FlashList<any> | null;
}>) {
  return (
    <View style={styles.container}>
      {showVideoTabs && (
        <LikeBox
          item={item}
          commentCount={item?.comments || 0}
          likes={item?.likes || 0}
        />
      )}
      {route.key === 'following' ? (
        <VideoPlayer
          showVideoTabs={showVideoTabs}
          setShowVideoTabs={setShowVideoTabs}
          route={route}
          video={video?.replace('http://', 'https://')}
          image={image?.replace('http://', 'https://')}
          thumbnail={item?.media.previewUrl}
          postId={item?.id}
          flashListRef={flashListRef}
          index={index}
          ref={(VideoSingleRef: any) =>
            (mediaRefs.current[index as number] = VideoSingleRef)
          }
        />
      ) : (
        <VideoPlayer
          showVideoTabs={showVideoTabs}
          setShowVideoTabs={setShowVideoTabs}
          route={route}
          video={video?.replace('http://', 'https://')}
          image={image?.replace('http://', 'https://')}
          thumbnail={item?.media.previewUrl}
          postId={item?.id}
          flashListRef={flashListRef}
          index={index}
          ref={(VideoSingleRef: any) =>
            (mediaRefs.current[index as number] = VideoSingleRef)
          }
        />
      )}
      {showVideoTabs && <PostDetails post={item as IVideo} />}
      <MusicDetails />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: windowHeight,
  },
  more: {
    position: 'absolute',
    right: '2.5%',
    zIndex: 6,
    marginTop: '2.5%',
  },
});
