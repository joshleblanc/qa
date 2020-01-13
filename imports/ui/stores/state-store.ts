import {createContext, useContext} from 'react';
import { ReactiveVar } from 'meteor/reactive-var';
import { APP_NAME } from './constants';

class StateStore {
  private _title = new ReactiveVar(APP_NAME);

  get title() {
    return this._title.get();
  }

  set title(newTitle: string) {
    this._title.set(newTitle);
  }
}

export const StateStoreContext = createContext<StateStore>(new StateStore());
export const useStateStore = () => useContext(StateStoreContext);
