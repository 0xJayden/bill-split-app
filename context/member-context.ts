import {createContext, Dispatch} from 'react';
import {MemberType} from '../types';

export enum ActionKind {
  NAME = 'NAME',
  ADD_ITEM = 'ADD_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
}

interface Action {
  type: ActionKind;
  name: string;
  newName: string;
}

export const memberInitialState: MemberType = {
  name: '',
  items: [],
  results: {
    subTotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
  },
};

export const MemberContext = createContext<[MemberType, Dispatch<Action>]>([
  {
    name: '',
    items: [],
    results: {
      subTotal: 0,
      tax: 0,
      tip: 0,
      total: 0,
    },
  },
  () => {},
]);

export const memberReducer = (state: MemberType, action: Action) => {
  switch (action.type) {
    case ActionKind.NAME:
      let member = state.find(m => m.name === action.name);
      if (member) member.name = action.newName;
      return member;
    default:
      return state;
  }
};
