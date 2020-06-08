import { at } from '../reducer';

export default function change(dispatch, update) {
  dispatch({ type: at.CHANGE, update });
}
