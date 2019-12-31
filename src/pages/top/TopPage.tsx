import React, {useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
interface Props {
  navigation: NavigationStackProp;
}

export default (props: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to DashBoard"
        onPress={() => props.navigation.push('DashBoard')}
      />
    </View>
  );
};
