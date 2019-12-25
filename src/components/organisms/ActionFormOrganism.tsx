import React, {useState} from 'react';
import {Container, Header, Content, Button, Text} from 'native-base';
import ListContainer from '../../components/molecules/ListContainer';
import {View} from 'react-native';
import ActionList from '../../components/organisms/ActionList';
import ActionForm from '../../components/atoms/forms/ActionForm';
import BottomButtonBar from '../../components/molecules/BottomButtonBar';

interface Props {
  addAction: (text: string) => void;
}
export default (props: Props) => {
  const [typingText, setTypingText] = useState('');
  const onClickButton = () => {
    props.addAction(typingText);
    setTypingText('');
  };

  return (
    <>
      <ActionForm
        value={typingText}
        onChangeText={text => setTypingText(text)}
      />
      <BottomButtonBar onClickButton={onClickButton} />
    </>
  );
};
