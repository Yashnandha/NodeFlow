import {View, Text, SafeAreaView, StatusBar, FlatList} from 'react-native';
import React from 'react';
import {data} from './constant';
import FeedCard from './FeedCard';

const InstaHome = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <StatusBar />
      <FlatList data={data} renderItem={FeedCard} />
    </SafeAreaView>
  );
};

export default InstaHome;
