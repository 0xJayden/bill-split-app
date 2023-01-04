import {useContext} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Kind, PartyContext} from '../context/party-context';
import {ItemType, MemberType} from '../types';

interface ItemProps {
  item: ItemType;
  member: MemberType;
}

const Item: React.FC<ItemProps> = ({item, member}) => {
  const [party, dispatch] = useContext(PartyContext);

  return (
    <View className="flex-row rounded py-4 px-2 items-center justify-between border-b border-b-cyan-900">
      <Pressable
        className="mr-2 self-end"
        onPress={() => {
          dispatch({type: Kind.DeleteItem, item, member});
        }}>
        <Text className="text-gray-600" style={{fontFamily: 'Nunito-Regular'}}>
          X
        </Text>
      </Pressable>
      <Text
        className="text-gray-200 w-1/4"
        style={{fontFamily: 'Nunito-Regular'}}>
        {item.name}
      </Text>
      <Text
        className="text-gray-200 w-1/6"
        style={{fontFamily: 'Nunito-Regular'}}>
        x{item.quantity}
      </Text>
      <View className=" w-1/4 items-end">
        <Text className="text-gray-200" style={{fontFamily: 'Nunito-Regular'}}>
          ${(+item.price).toFixed(2)}
          <Text className="text-gray-600"> ea</Text>
        </Text>
      </View>
      <View className=" w-1/4 items-end">
        <Text className="text-gray-200" style={{fontFamily: 'Nunito-Regular'}}>
          ${(+item.price * +item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default Item;
