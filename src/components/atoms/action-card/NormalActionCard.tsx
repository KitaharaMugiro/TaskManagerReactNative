import {Body, Card, CardItem, Text, View, Left, Right} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/color';

interface Props {
  text: string;
  leftText: string;
  children: React.ReactChild;
}

export default (props: Props) => {
  return (
    <Card>
      <CardItem style={{backgroundColor: colors.white}}>
        <Left>
          <Text>{props.text}</Text>
        </Left>
        <Right>
          <Text>{props.leftText}</Text>
        </Right>
      </CardItem>
      <CardItem cardBody>
        <View style={styles.container}>{props.children}</View>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  textarea: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
