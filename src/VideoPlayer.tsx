import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const VideoPlayer = () => {
  const {width} = Dimensions.get('window');
  const my4kVideo =
    'https://videos.pexels.com/video-files/15789389/15789389-sd_640_360_25fps.mp4?resolution=420';

  return (
    <View>
      <Video
        source={{
          uri: my4kVideo,
          isNetwork: true,
          shouldCache: true,
        }}
        style={{height: 200, width: width, aspectRatio: 16 / 9}}
        showNotificationControls
      />
    </View>
  );
};

export default VideoPlayer;
