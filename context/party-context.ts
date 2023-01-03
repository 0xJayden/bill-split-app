import {createContext, Dispatch} from 'react';
import {ItemType, MemberType} from '../types';

export enum Kind {
  SetParty,
  SetName,
  SetItem,
  DeleteItem,
  SetSubtotal,
  SetTax,
  SetTaxOwed,
  SetTip,
  SetTotal,
}

export type Action =
  | {
      type: Kind.SetParty;
      amount: number;
    }
  | {
      type: Kind.SetName;
      newName: string;
      member: MemberType;
    }
  | {
      type: Kind.SetItem;
      newItem: ItemType;
      member: MemberType;
    }
  | {
      type: Kind.DeleteItem;
      item: ItemType;
      member: MemberType;
    }
  | {
      type: Kind.SetSubtotal;
      subtotal: number;
      member: MemberType;
    }
  | {
      type: Kind.SetTax;
      tax: number;
    }
  | {
      type: Kind.SetTaxOwed;
      taxOwed: number;
      member: MemberType;
    }
  | {
      type: Kind.SetTip;
      member: MemberType;
      tip: number;
    }
  | {
      type: Kind.SetTotal;
      member: MemberType;
      total: number;
    };

export const initialState: MemberType[] = [];

export const PartyContext = createContext<[MemberType[], Dispatch<Action>]>([
  [],
  () => {},
]);

export const partyReducer = (
  state: MemberType[],
  action: Action,
): MemberType[] => {
  switch (action.type) {
    case Kind.SetParty:
      if (state.length > 0) state = [];
      let char;

      if (action.amount)
        for (let i = 0; i < action.amount; i++) {
          char = String.fromCharCode(65 + i);

          let member = {
            name: char,
            items: [],
            results: {subTotal: 0, tax: 0, taxOwed: 0, tip: 0, total: 0},
          };
          state = [...state, member];
        }
      return [...state];
    case Kind.SetName:
      action.member.name = action.newName;
      return [...state];
    case Kind.SetItem:
      action.member.items.push(action.newItem);
      return [...state];
    case Kind.DeleteItem:
      let items = action.member.items.filter(i => i.id !== action.item.id);
      action.member.items = items;
      return [...state];
    case Kind.SetSubtotal:
      action.member.results.subTotal = action.subtotal;
      return [...state];
    case Kind.SetTax:
      state.forEach(m => (m.results.tax = action.tax));
      return [...state];
    case Kind.SetTaxOwed:
      action.member.results.taxOwed = action.taxOwed;
      return [...state];
    case Kind.SetTip:
      action.member.results.tip = action.tip;
      return [...state];
    case Kind.SetTotal:
      action.member.results.total = action.total;
      return [...state];
    default:
      return state;
  }
};
