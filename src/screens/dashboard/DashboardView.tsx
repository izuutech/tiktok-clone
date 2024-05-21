import {StyleSheet, View, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';

import VideoPlayer from '../../components/VideoPlayer';
import LikeBox from '../../components/LikeBox';
import {IVideo} from '../../types/video';
import PostDetails from '../../components/PostDetails';
import MusicDetails from '../../components/MusicDetails';
import {FlashList} from '@shopify/flash-list';
import TabIndicator from '../../components/TabIndicator';

const windowHeight = Dimensions.get('window').height;

export default function DashboardView({
  active,
  mediaRefs,
  item,
  index,
  showVideoTabs,
  setShowVideoTabs,
  openComments,
  setOpenComments,
  video,
  setOpenShare,
  openShare,
  flashListRef,
  image,
}: {active: 'fyp' | 'following'} & Partial<{
  mediaRefs: any;
  item: IVideo;
  index: number;
  showVideoTabs: boolean;
  setShowVideoTabs: any;
  openComments: boolean;
  setOpenComments: any;
  video: string;
  image: string;
  setOpenShare: any;
  openShare: boolean;
  flashListRef: FlashList<any> | null;
}>) {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <TabIndicator active={active} />
      {showVideoTabs && !openComments && (
        <LikeBox
          setOpenShare={setOpenShare}
          openComments={openComments}
          setOpenComments={setOpenComments}
          commentCount={item?.comments || 0}
          likes={item?.likes || 0}
        />
      )}
      <VideoPlayer
        setOpenShare={setOpenShare}
        openComments={openComments}
        showVideoTabs={showVideoTabs}
        setShowVideoTabs={setShowVideoTabs}
        video={video}
        image={image}
        thumbnail={item?.thumbnailUrl}
        postId={item?.id}
        flashListRef={flashListRef}
        index={index}
        ref={(VideoSingleRef: any) =>
          (mediaRefs.current[index as number] = VideoSingleRef)
        }
      />
      {showVideoTabs && !openComments && <PostDetails post={item as IVideo} />}
      <MusicDetails />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: windowHeight,
    // zIndex: 1,
    // flex: 1,
  },
  more: {
    position: 'absolute',
    right: '2.5%',
    zIndex: 6,
    marginTop: '2.5%',
  },
});
