import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/color';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    padding: 10,
  },
});
