export type ItemType = {
  id: number;
  name: string;
  price: string;
  quantity: string;
};

export interface MemberType {
  name: string;
  items: Items;
  results: {
    subTotal: number;
    tax: number;
    taxOwed: number;
    tip: number;
    total: number;
  };
}

export type Items = Array<ItemType>;

export type PartyType = Array<MemberType> | null;

export type StackParamList = {
  Home: undefined;
  HowManyPeople: undefined;
  Tax: undefined;
  Party: undefined;
  Member: MemberType;
  Results: undefined;
};

export interface Tips {
  [percent: number]: {tip: number; newTotal: number};
}
