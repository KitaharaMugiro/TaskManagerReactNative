import {Body, Card, CardItem, Text, Right, Icon} from 'native-base';
import React from 'react';

interface Props {
  text: string;
  onClickDelete: () => void;
}

export default (props: Props) => {
  return (
    <Card>
      <CardItem>
        <Body>
          <Text>{props.text}</Text>
        </Body>
        <Right>
          <Icon onPress={props.onClickDelete} type="Entypo" name="cross" />
        </Right>
      </CardItem>
    </Card>
  );
};
