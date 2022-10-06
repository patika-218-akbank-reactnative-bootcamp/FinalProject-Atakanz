import {Timestamp} from 'firebase/firestore';
import React from 'react';
import {SafeAreaView, TouchableOpacity, Image, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './UserCards.style';

const UserCards = props => {
  let image = null;
  let text = null;
  let location = null;
  if (props.lastMessageType === 'image') {
    image = true;
  } else if (props.lastMessageType === 'text') {
    text = true;
  } else {
    location = true;
  }
  const now = Timestamp.now().toDate().toString();
  let time = '';
  if (now.slice(4, 15) === props.time.slice(4, 15)) {
    time = props.time.slice(16, 21);
  } else {
    time = props.time.slice(4, 15) + ' ' + props.time.slice(16, 21);
  }
  const theme = useSelector(state => state.theme.theme);
  return (
    <SafeAreaView style={[styles.container, styles[`container${theme}`]]}>
      <TouchableOpacity onPress={props.task}>
        <View style={styles.enabledDirection}>
          <View style={styles.enabledDirection}>
            <View style={styles.viewImg}>
              {props.link ? (
                <Image source={{uri: props.link}} style={styles.img} />
              ) : (
                <Image
                  source={require('../../Assets/noProfilePhoto.jpg')}
                  style={styles.img}
                />
              )}
            </View>
            <View style={[styles.textView, styles[`textView${theme}`]]}>
              <Text style={[styles.textInfo, styles[`text${theme}`]]}>
                {props.name}
              </Text>
              {text && (
                <Text style={[styles.lastMessage, styles[`text${theme}`]]}>
                  {props.lastMessage}
                </Text>
              )}
              {image && (
                <Text style={[styles.lastMessageType, styles[`text${theme}`]]}>
                  Image
                </Text>
              )}
              {location && (
                <Text style={[styles.lastMessageType, styles[`text${theme}`]]}>
                  Location
                </Text>
              )}
            </View>
          </View>
          {props.time && (
            <View style={styles.hourInfo}>
              <Text>{time}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserCards;
