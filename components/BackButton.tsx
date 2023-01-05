import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="self-start absolute top-10 left-10 z-10"
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="arrow-back-ios" size={25} color="#00b0d6" />
    </TouchableOpacity>
  );
};

export default BackButton;
