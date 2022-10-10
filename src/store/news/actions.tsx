import { FETCH, SAVE, UPDATE, REMOVE } from './actionTypes';

export function save(payload: any) {
  return {
    type: SAVE,
    newsData: payload
  }
}

export function fetch() {
  return {
    type: FETCH
  }

}

export function update(payload?: any) {
  return {
    type: UPDATE,
    payload
  }
}

export function remove(payload?: any) {
  return {
    type: REMOVE,
    payload
  }
}


const WhatchListAction = {
  save,
  fetch,
  update,
  remove
}

export default WhatchListAction;