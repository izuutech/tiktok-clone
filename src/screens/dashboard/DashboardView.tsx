import {StyleSheet, View, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import VideoPlayer from '../../components/VideoPlayer';
import LikeBox from '../../components/LikeBox';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {IVideo} from '../../types/video';
import PostDetails from '../../components/PostDetails';

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
}: Partial<{
  mediaRefs: any;
  item: IVideo;
  index: number;
  showVideoTabs: boolean;
  setShowVideoTabs: any;
  openComments: boolean;
  setOpenComments: any;
  video: string;
  setOpenShare: any;
  openShare: boolean;
}>) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPost = async (j: any) => {};
  const {
    isLoading,
    data: singlePost,
    refetch: refetchSinglePost,
  }: any = useQuery('single_post' + item?.id, async () => {
    return await fetchPost(item?.id);
  });

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
          // canOpenComment={false}
          challenge={singlePost?.data?.challenge}
          post={{
            ...singlePost?.data?.user,
            _id: item?.id,
            voters: singlePost?.data?.post?.voters,
            singlePost: singlePost?.data?.post,
          }}
          // commentCount={comments.length}
          commentCount={item?.comments || 0}
          queryKey={'user_data' + singlePost?.data?.user?.userId}
          refetchPost={refetchSinglePost} //instead of fetching single post I'm refetching entire list
        />
      )}
      <VideoPlayer
        setOpenShare={setOpenShare}
        openComments={openComments}
        showVideoTabs={showVideoTabs}
        setShowVideoTabs={setShowVideoTabs}
        video={video}
        thumbnail={item?.thumbnailUrl}
        postId={item?.id}
        ref={(VideoSingleRef: any) =>
          (mediaRefs.current[index as number] = VideoSingleRef)
        }
      />
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
