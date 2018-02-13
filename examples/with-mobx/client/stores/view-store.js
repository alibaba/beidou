import { observable } from 'mobx';
import { ALL_TODOS } from '../utils/constants';

export default class ViewStore {
  @observable todoBeingEdited = null;
  @observable todoFilter = ALL_TODOS;
}
