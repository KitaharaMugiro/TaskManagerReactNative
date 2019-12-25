import {Body, Card, CardItem, Text, Right, Icon} from 'native-base';
import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../../../constants/color';

interface Props {
  text: string;
  selected: boolean;
  onPressCard: () => void;
}

export default (props: Props) => {
  const color = props.selected ? colors.blue : colors.white;
  return (
    <TouchableWithoutFeedback onPress={props.onPressCard}>
      <Card>
        <CardItem style={{backgroundColor: color}}>
          <Body>
            <Text>{props.text}</Text>
          </Body>
        </CardItem>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textarea: {
    backgroundColor: '#fff',
  },
});
