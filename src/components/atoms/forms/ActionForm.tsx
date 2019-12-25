import {Form, Textarea, Input, Item} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  onChangeText: (text: string) => void;
  value: string;
}

export default (props: Props) => {
  return (
    <Form>
      <Item regular>
        <Input
          value={props.value}
          onChangeText={text => props.onChangeText(text)}
          style={styles.textarea}
          placeholder="新しいActionを入力"
        />
      </Item>
    </Form>
  );
};

const styles = StyleSheet.create({
  textarea: {
    backgroundColor: '#fff',
  },
});
