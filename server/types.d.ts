export {};

declare global {
  namespace Meteor {
    export interface User {
      admin: boolean;
    }
  }
}