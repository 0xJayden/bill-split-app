import {Dispatch, SetStateAction} from 'react';
import {Pressable, Text} from 'react-native';

interface CloseButtonProps {
  close: Dispatch<SetStateAction<boolean>>;
}

const CloseButton: React.FC<CloseButtonProps> = ({close}) => {
  return (
    <Pressable
      style={{borderWidth: 1, width: '10%'}}
      onPress={() => close(false)}>
      <Text>X</Text>
    </Pressable>
  );
};

export default CloseButton;
