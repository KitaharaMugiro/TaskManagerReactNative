import {Button, Text} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  onClickButton: () => void;
}

export default (props: Props) => {
  return (
    <View style={styles.container}>
      <Button onPress={props.onClickButton}>
        <Text>カードを追加</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'blue',
  },
});
