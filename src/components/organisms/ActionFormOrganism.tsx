import React, {useState} from 'react';
import {NativeSyntheticEvent, TextInputKeyPressEventData} from 'react-native';
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

  const onChangeText = (text: string) => {
    setTypingText(text);
  };

  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key == 'Enter') {
      onClickButton();
    }
  };

  return (
    <>
      <ActionForm
        value={typingText}
        onKeyPress={handleKeyDown}
        onChangeText={text => onChangeText(text)}
      />
      <BottomButtonBar onClickButton={onClickButton} />
    </>
  );
};
