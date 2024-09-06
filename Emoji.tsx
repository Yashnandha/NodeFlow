import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

const Emoji = () => {
  interface randomEmojiType {
    name: string;
    category: string;
    group: string;
    htmlCode: string[];
    unicode: string[];
  }

  const [randomEmoji, setRandomEmoji] = useState<randomEmojiType[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const [emojiCode, setEmojiCode] = useState<string[]>([]);
  const {width, height} = Dimensions.get('window');
  useEffect(() => {
    fetch('https://emojihub.yurace.pro/api/all', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setRandomEmoji(data?.slice(0, 5));
      })
      .catch(error => console.error('Error fetching emoji:', error));
  }, []);

  // Helper function to safely convert hex code points to characters
  const convertToEmoji = (unicodeArray: string[]) => {
    return unicodeArray
      .map(code => {
        // Remove "U+" prefix and parse the remaining hex code
        const cleanedCode = code.replace('U+', '');
        const codePoint = parseInt(cleanedCode, 16);
        return !isNaN(codePoint) ? String.fromCodePoint(codePoint) : ''; // Check for NaN before conversion
      })
      .join('');
  };

  const handlePressIn = (code: string[]) => {
    setEmojiCode(code);
    setShowEmoji(true);
    positionY.value = 0;
    positionX.value = 0;
    opacity.value = 1;

    // Start animation for position and opacity
    positionY.value = withTiming(Math.random() * 300 - 500, {
      duration: 2000,
      easing: Easing.linear,
    });

    positionX.value = withTiming(Math.random() * 300 - 150, {
      duration: 2000,
      easing: Easing.linear,
    });

    opacity.value = withTiming(0, {
      duration: 2000,
    });
  };

  const handlePressOut = () => {
    setShowEmoji(false);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: positionX.value}, {translateY: positionY.value}],
      opacity: opacity.value,
    };
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 50,
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 100,
      }}>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginHorizontal: 10,
          backgroundColor: '#f9f9f9',
          padding: 10,
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        {randomEmoji.map((res, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePressIn(res.unicode)}>
            <Text
              style={{
                fontSize: 30,
                opacity: 1,
                color: '#000000',
              }}>
              {convertToEmoji(res.unicode)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showEmoji && (
        <Animated.View style={[styles.emojiContainer, animatedStyle]}>
          {Array.from({length: 15}).map((itm, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.emoji,
                {
                  left: Math.random() * (width - index * 30), // Random X position
                  top: Math.random() * (height - 50), // Random Y position
                },
              ]}>
              {convertToEmoji(emojiCode)}
            </Animated.Text>
          ))}
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default Emoji;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    padding: 20,
    backgroundColor: '#6200EE',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  emojiContainer: {
    position: 'absolute',
    bottom: 50, // Starting position of the emoji
  },
  emoji: {
    fontSize: 40,
    opacity: 1,
    color: '#000000',
  },
});
