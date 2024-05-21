import {StyleSheet, View, Dimensions, useWindowDimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import VideoPlayer from '../../components/VideoPlayer';
import LikeBox from '../../components/LikeBox';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {IVideo} from '../../types/video';
import PostDetails from '../../components/PostDetails';
import MusicDetails from '../../components/MusicDetails';
import {TabBarIndicator} from 'react-native-tab-view';
import {FlashList} from '@shopify/flash-list';

const windowHeight = Dimensions.get('window').height;

export default function DashboardView({
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
}: Partial<{
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
  const layout = useWindowDimensions();
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={styles.container}>
      {showVideoTabs && !openComments && (
        <LikeBox
          openShare={openShare}
          setOpenShare={setOpenShare}
          setOpenModal={setOpenModal}
          openModal={openModal}
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
      <MusicDetails />
      {showVideoTabs && !openComments && <PostDetails post={item as IVideo} />}
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
