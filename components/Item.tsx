import {useContext} from 'react';
import {Animated, Text, View} from 'react-native';
import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';

import {Kind, PartyContext} from '../context/party-context';
import {ItemType, MemberType} from '../types';

interface ItemProps {
  item: ItemType;
  member: MemberType;
}

const Item: React.FC<ItemProps> = ({item, member}) => {
  const [party, dispatch] = useContext(PartyContext);

  const deleteItem = () => {
    let subtotal = member.results.subTotal - +item.price * +item.quantity;

    let taxOwed =
      member.results.taxOwed -
      +item.price * +item.quantity * (member.results.tax / 100);

    let total =
      member.results.total -
      +item.price * +item.quantity -
      +item.price * +item.quantity * (member.results.tax / 100);

    dispatch({type: Kind.DeleteItem, item, member});
    dispatch({type: Kind.SetSubtotal, subtotal, member});
    dispatch({type: Kind.SetTaxOwed, taxOwed, member});
    dispatch({type: Kind.SetTotal, total, member});
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-100, 0],
      outputRange: [2, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View className=" p-2" style={{opacity}}>
        <TouchableOpacity onPress={() => deleteItem()}>
          <Text className="text-red-500" style={{fontFamily: 'Nunito-Regular'}}>
            Delete
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View className="flex-row p-2 border-b border-b-cyan-900">
        <Text
          className="ml-4 text-gray-200 w-1/4"
          style={{fontFamily: 'Nunito-Regular'}}>
          {item.name}
        </Text>
        <Text
          className="text-gray-200 w-1/6"
          style={{fontFamily: 'Nunito-Regular'}}>
          x{item.quantity}
        </Text>
        <View className="items-end w-1/4">
          <Text
            className="text-gray-200"
            style={{fontFamily: 'Nunito-Regular'}}>
            ${(+item.price).toFixed(2)}
            <Text className="text-gray-600"> ea</Text>
          </Text>
        </View>
        <View className="items-end w-1/4">
          <Text
            className="text-gray-200"
            style={{fontFamily: 'Nunito-Regular'}}>
            ${(+item.price * +item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default Item;
