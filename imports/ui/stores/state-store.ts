import {createContext, useContext} from 'react';
import { ReactiveVar } from 'meteor/reactive-var';
//@ts-ignore
import { ReactiveDict } from 'meteor/reactive-dict';
import { APP_NAME } from './constants';

class StateStore {
  private _title = new ReactiveVar(APP_NAME);
  private state = new ReactiveDict({
    removeOtherElements: false
  });

  get title() {
    return this._title.get();
  }

  set title(newTitle: string) {
    this._title.set(newTitle);
  }

  get removeOtherElements() {
    return this.state.get('removeOtherElements');
  }

  set removeOtherElements(value: boolean) {
    this.state.set('removeOtherElements', value);
  }
}

export const StateStoreContext = createContext<StateStore>(new StateStore());
export const useStateStore = () => useContext(StateStoreContext);
