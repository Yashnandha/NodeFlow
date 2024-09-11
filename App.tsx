import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Emoji from './Emoji';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import VideoPlayer from './src/VideoPlayer';
import WorkflowComponent from './workFlow';
import {Canvas, Rect, vec, BoxShadow} from '@shopify/react-native-skia';
import GmailMailer from './GmailMailer';
import GpayNew from './GpayNew';
import InstaHome from './InstaHome';

const App = () => {
  const {height, width} = Dimensions.get('screen');
  const centerX = width / 2;
  const centerY = height / 2;
  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          // alignItems: 'center',
          // justifyContent: 'center',
          backgroundColor: '#f1f1f1',
        }}>
        {/* <Emoji /> */}
        {/* <VideoPlayer /> */}
        {/* <WorkflowComponent /> */}
        {/* <GmailMailer /> */}
        {/* <GpayNew /> */}
        <InstaHome />
      </View>
    </GestureHandlerRootView>
  );
};
export default App;
