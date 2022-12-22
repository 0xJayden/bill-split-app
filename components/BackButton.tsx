import {Dispatch, SetStateAction} from 'react';
import {Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../Styles';

interface BackButtonProps {
  open: Dispatch<SetStateAction<boolean>>;
  close: Dispatch<SetStateAction<boolean>>;
}

const BackButton: React.FC<BackButtonProps> = ({open, close}) => {
  return (
    <Pressable
      onPress={() => {
        open(true);
        close(false);
      }}
      style={styles.back}>
      <Icon name="arrow-back-ios" size={25} style={styles.backText} />
    </Pressable>
  );
};

export default BackButton;
