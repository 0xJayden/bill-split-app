import {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import styles from '../Styles';

interface PopupProps {
  broadcast: string;
}

const Popup: React.FC<PopupProps> = ({broadcast}) => {
  const animation = useRef(new Animated.ValueXY()).current;

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const popup = () => {
    Animated.timing(animation, {
      toValue: {x: 0, y: -20},
      duration: 1000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) fadeout();
    });
  };

  const fadeout = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    popup();
  }, [broadcast]);

  return (
    <Animated.View
      style={[
        styles.popupContainer,
        animation.getLayout(),
        {opacity: fadeAnim},
      ]}>
      <Text>{broadcast} Set!</Text>
    </Animated.View>
  );
};

export default Popup;
