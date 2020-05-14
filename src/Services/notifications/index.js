import EventEmitter from 'events';
import { nanoid } from 'nanoid';

const eventEmitter = new EventEmitter();
let notifications = [];

function add(text) {
  const id = nanoid();
  notifications = [...notifications, { id, text }];
  eventEmitter.emit('change');
}

function remove(id) {
  notifications = notifications.filter((n) => n.id !== id);
  eventEmitter.emit('change');
}

function subscribe(changeHandler) {
  eventEmitter.on('change', changeHandler);
}

function unsubscribe(changeHandler) {
  eventEmitter.off('change', changeHandler);
}

function getAll() {
  return notifications;
}

export default {
  getAll,
  add,
  remove,
  subscribe,
  unsubscribe,
};
