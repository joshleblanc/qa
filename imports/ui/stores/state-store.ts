import {createContext, useContext} from 'react';
//@ts-ignore
import { ReactiveDict } from 'meteor/reactive-dict';
import { APP_NAME } from './constants';

class StateStore {
  private state = new ReactiveDict({
    title: APP_NAME
  });

  get title() {
    return this.state.get("title");
  }

  set title(newTitle: string) {
    this.state.set("title", newTitle);
  }
}

export const StateStoreContext = createContext<StateStore>(new StateStore());
export const useStateStore = () => useContext(StateStoreContext);
