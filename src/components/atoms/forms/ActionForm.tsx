import {Form, Textarea, Input, Item} from 'native-base';
import React from 'react';
import {
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

interface Props {
  onChangeText: (text: string) => void;
  value: string;
  onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
}

export default (props: Props) => {
  return (
    <Form>
      <Item regular>
        <Input
          onKeyPress={props.onKeyPress}
          value={props.value}
          onChangeText={text => props.onChangeText(text)}
          style={styles.textarea}
          placeholder="新しいActionを入力"
          keyboardType="default"
          returnKeyType="done"
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
