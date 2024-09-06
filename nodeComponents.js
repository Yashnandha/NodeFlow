import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {FadeIn, FadeInUp} from 'react-native-reanimated';

const NodeComponent = ({
  label,
  headerBgColor,
  title,
  item,
  index,
  length,
  subLabel,
}) => {
  return (
    <Animated.View entering={FadeInUp.delay(index * 100)} exiting={FadeIn}>
      <TouchableOpacity
        activeOpacity={1}
        disabled
        style={[
          styles.mainNode,
          {
            alignItems:
              index == 0
                ? 'flex-start'
                : index === length - 1
                ? 'flex-end'
                : 'center',
          },
        ]}>
        {/* start poly line for first node */}
        {length > 1 && (
          <>
            {/* Connector line */}
            {index == 0 && <View style={[styles.connectersLine]} />}
            {length > 1 && index == 1 && (
              <View
                style={[
                  styles.connectersLineEnd,
                  {
                    left: 13,
                    top: -13,
                    position: 'absolute',
                  },
                ]}
              />
            )}
            {length != 3 && index == 1 && (
              <View
                style={[
                  styles.rowContainerCenterRight,
                  {
                    position: 'absolute',
                    left: 10,
                    bottom: 13,
                  },
                ]}>
                {length == 2 && (
                  <>
                    <View style={[styles.knob]} />
                    <View style={[styles.connectersLineHorizontalEnd]} />
                  </>
                )}
              </View>
            )}
          </>
        )}
        {/* end poly line for last node */}
        {length > 2 && (
          <>
            {index === length - 1 && (
              <>
                <View style={[styles.connectersLineEnd]} />
                <View style={[styles.triangleEnd]} />
              </>
            )}
          </>
        )}

        {/* middle nodes poly line */}
        {index + 1 !== length && index !== 0 && (
          <>
            {index != 1 && (
              <View
                style={[
                  styles.connectersLineEnd,
                  {
                    top: -50,
                  },
                ]}
              />
            )}
            <View style={[styles.connectersLineMiddleNode]} />
            {index != 1 && (
              <View
                style={[
                  styles.connectersLineEnd,
                  {
                    top: 0,
                  },
                ]}
              />
            )}
          </>
        )}
        {index + 1 !== length && index !== 0 && (
          <View style={[styles.rowContainerCenterRight]}>
            <View style={[styles.connectersLineHorizontalEnd]} />
            <View style={[styles.knob]} />
          </View>
        )}

        {index + 1 !== length && index !== 0 && (
          <View style={[styles.rowContainerCenterLeft]}>
            <View style={[styles.knob]} />
            <View style={[styles.connectersLineHorizontalEnd]} />
          </View>
        )}
        {index + 1 !== length && index !== 0 && (
          <>
            {index != 1 && (
              <View
                style={[
                  styles.connectersLineEnd,
                  {
                    top: -50,
                    left: 13,
                  },
                ]}
              />
            )}
            <View style={[styles.connectersLineMiddleNodeEnd]} />
          </>
        )}

        <View style={[styles.nodeContainer]}>
          <View style={[styles.nodeHeader, {backgroundColor: headerBgColor}]}>
            <Text style={styles.nodeLabel} numberOfLines={1}>
              {label}
            </Text>
            {subLabel && (
              <Text style={styles.nodeSubLabel} numberOfLines={1}>
                {subLabel}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.nodeTitle}>{title}</Text>
          </View>
          {index == 0 && <View style={[styles.startConnectors]} />}
          {index == length - 1 && null}
          {index + 1 !== length && index !== 0 && (
            <>
              <View
                style={[
                  styles.connectors,
                  {
                    backgroundColor: '#000',
                  },
                ]}
              />
              <View
                style={[
                  styles.connectors,
                  {
                    right: 0,
                    left: 10,
                  },
                ]}
              />
            </>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  nodeContainer: {
    width: 250,
    borderRadius: 10,
    minHeight: 100,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  nodeHeader: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  nodeLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nodeSubLabel: {
    color: '#ffffff',
    fontSize: 12,
  },
  nodeTitle: {
    padding: 10,
    marginBottom: 10,
  },

  startConnectors: {
    height: 8,
    width: 8,
    borderWidth: 1,
    borderColor: '#A39F9F',
    borderStyle: 'solid',
    borderRadius: 4,
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: '#000',
  },
  connectors: {
    height: 8,
    width: 8,
    borderWidth: 1,
    borderColor: '#A39F9F',
    borderStyle: 'solid',
    borderRadius: 4,
    position: 'absolute',
    backgroundColor: '#fff',
    right: 10,
    bottom: 10,
  },

  mainNode: {
    marginHorizontal: 30,
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  connectersLine: {
    height: '100%',
    flex: 1,
    width: 1,
    backgroundColor: '#101',
    width: 1,
    top: 50,
    left: 13,
    position: 'absolute',
    zIndex: 0,
  },
  connectersLineEnd: {
    flex: 1,
    width: 1,
    backgroundColor: '#101',
    width: 1,
    right: 13,
    top: -60,
    position: 'absolute',
    zIndex: 0,
    height: '100%',
  },
  connectersLineMiddleNode: {
    flex: 1,
    width: 1,
    backgroundColor: '#101',
    width: 1,
    left: 13,
    bottom: 10,
    position: 'absolute',
    zIndex: 1,
    height: '100%',
  },
  connectersLineMiddleNodeEnd: {
    // borderWidth: 1,
    // width: 0.5,
    // borderColor: '#101',
    // borderStyle: 'solid',
    // height: 145,
    // width: 1,
    // right: 13,
    // top: 80,
    // position: 'absolute',
    // zIndex: 1,
  },
  connectersLineHorizontal: {
    height: 1,
    width: 110,
    zIndex: 1,
    backgroundColor: '#101',
  },
  connectersLineHorizontalEnd: {
    height: 1,
    width: 60,
    zIndex: 2,
    backgroundColor: '#101',
  },
  connectersLineHorizontalCenter: {
    height: 1,
    width: 60,
    zIndex: 1,
    backgroundColor: '#101',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: -130,
    position: 'absolute',
    left: 10,
  },
  rowContainerEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -60,
    position: 'absolute',
    right: 10,
  },
  rowContainerCenterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 10,
    position: 'absolute',
    right: 10,
  },
  rowContainerCenterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 10,
    position: 'absolute',
    left: 10,
  },
  knob: {
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: '#000',
  },
  triangleEnd: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: '#010',
    transform: [{rotate: '225deg'}],
    left: -9,
    bottom: 2,
  },
});

export default NodeComponent;
