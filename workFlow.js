// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import Draggable from 'react-native-draggable';
// import Svg, {Line, Polyline} from 'react-native-svg';
// import NodeComponent from './nodeComponents';
// import {workflowData} from './app.const';

// const nodes = [
//   {
//     id: 'whatsapp',
//     label: 'Whatsapp',
//     headerBgColor: '#15945F',
//     position: {x: -100, y: 50},
//   },
//   {
//     id: 'notify',
//     label: 'Notify team member on Whatsapp',
//     headerBgColor: '#10B981',
//     position: {x: -100, y: 200},
//   },
//   {
//     id: 'sendTemplate',
//     label: 'Send Template',
//     headerBgColor: '#19B2AA',
//     position: {x: -100, y: 350},
//   },
// ];

// const edges = [
//   {source: 'whatsapp', target: 'notify'},
//   {source: 'notify', target: 'sendTemplate'},
// ];

// const WorkflowComponent = () => {
//   return (
//     <View style={styles.container}>
//       <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
//         {workflowData?.singleWorkflow?.workflowData[0].edges.map(
//           (edge, index) => {
//             const sourceNode =
//               workflowData?.singleWorkflow?.workflowData[0].nodes.find(
//                 node => node.id === edge.source,
//               );
//             const targetNode =
//               workflowData?.singleWorkflow?.workflowData[0].nodes.find(
//                 node => node.id === edge.target,
//               );
//             return (
//               <Line
//                 key={index}
//                 x1={sourceNode.position.x + 100}
//                 y1={sourceNode.position.y + 10}
//                 x2={targetNode.position.x + 100}
//                 y2={targetNode.position.y + 10}
//                 stroke="#000"
//                 strokeWidth="2"
//               />
//             );
//           },
//         )}
//       </Svg>

//       {workflowData?.singleWorkflow?.workflowData[0].nodes.map(node => (
//         <Draggable
//           key={node.id}
//           x={node.position.x}
//           y={node.position.y}
//           renderSize={200}
//           renderColor="transparent"
//           renderText=""
//           disabled={node?.dragging}
//           isCircle={false}>
//           <NodeComponent
//             label={node.data.label}
//             headerBgColor={node.data.headerBgColor}
//             title={node.data.title}
//           />
//         </Draggable>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default WorkflowComponent;
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import Draggable from 'react-native-draggable';
import Svg, {Line} from 'react-native-svg';
import NodeComponent from './nodeComponents';
const {width, height} = Dimensions.get('window');
const nodes = [
  {
    id: 'notifyTeamSMS',
    label: 'Events',
    subLabel: 'On WhatsApp received activities',
    headerBgColor: '#15945F',
    title: 'Lorem Epsum Donalas',
  },
  {
    label: 'Notify team member on Whatsapp',
    headerBgColor: '#15945F',
    id: 'notify',
    type: 'both',
    title: 'Select template',
  },
  {
    label: 'Notify team member on SMS',
    headerBgColor: '#560560',
    id: 'notify',
    type: 'both',
    title: 'Select template',
  },
  {
    label: 'Check if lead is interested',
    headerBgColor: '#28479D',
    id: 'notify',
    type: 'both',
    title: 'Get property details | Form Details',
  },
  {
    label: 'Show Property Visit Reminder',
    headerBgColor: '#19B2AA',
    id: 'notify',
    type: 'both',
    title: '',
  },
  // {
  //   id: 'notifyTeamSMS',
  //   label: 'Followup on SMS',
  //   headerBgColor: '#560560',
  //   title: `Lorem Epsum Donalas JoSnS JS sj Jo ojsrs  New Dcev HG djHH JHKIUs JHJH ds kajw sasjasjahs ajas asjhasasasasasasasasasassasj ahsjahs asajs ajs hashassddaasasasa
  //     <ReactFlow
  //     nodes={nodes}
  //     edges={edges}
  //     onNodesChange={onNodesChange}
  //     onEdgesChange={onEdgesChange}
  //     onConnect={onConnect}
  //     fitView
  //     attributionPosition="top-right"
  //     nodeTypes={nodeTypes}
  //     edgeTypes={edgeTypes}
  //     className="overview"
  //   >
  //     `,
  // },
  // {
  //   id: 'notifyTeamSMS',
  //   label: 'Followup on Call',
  //   headerBgColor: '#900900',
  //   title:
  //     'Lorem Epsum Donalas JoSnS JS sj Jo ojsrs  New Dcev HG djHH JHKIUs JHJH ds kajw sasjasjahs ajas asjhasasasasasasasasasassasj ahsjahs asajs ajs hashassddaasasasa ',
  // },
  // {
  //   id: 'sendTemplate',
  //   label: 'Send Template',
  //   headerBgColor: '#28479D',
  //   title:
  //     'Lorem Epsum Donalas JoSnS JS sj Jo ojsrs  New Dcev HG djHH JHKIUs JHJH ds kajw sasjasjahs ajas asjhasasasasasasasasasassasj ahsjahs asajs ajs hashassddaasasasa ',
  // },
];

const WorkflowComponent = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./DotGrid.png')}
        style={styles.bgContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100,
            paddingTop: 100,
          }}>
          {nodes.map((node, nIndex) => (
            <NodeComponent
              key={nIndex}
              label={node.label}
              headerBgColor={node.headerBgColor}
              title={node.title}
              index={nIndex}
              length={nodes.length}
              subLabel={node.subLabel}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgContainer: {
    height,
    width,
  },
});

export default WorkflowComponent;
