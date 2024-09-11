import {
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  Image,
  PixelRatio,
  Dimensions,
} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
const {width} = Dimensions.get('window');
const FeedCard = ({item, index}: any) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        {item?.type == 'p' && (
          <Image
            source={{
              uri: item?.link,
            }}
            style={styles.posts}
            resizeMode="contain"
          />
        )}

        {item?.type == 'reel' && (
          <Video
            source={{
              uri: item?.link,
              isNetwork: true,
              shouldCache: true,
            }}
            repeat
            style={[
              styles.posts,
              {
                height: PixelRatio.getPixelSizeForLayoutSize(180),
              },
            ]}
            resizeMode="contain"
            bufferConfig={{
              cacheSizeMB: 1078,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
  container: {},
  posts: {
    height: PixelRatio.getPixelSizeForLayoutSize(120),
    width,
  },
  imageContainer: {
    marginBottom: 20,
    backgroundColor: '#f7f7f7',
  },
});
