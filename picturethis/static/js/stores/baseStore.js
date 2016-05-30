import { EventEmitter } from 'events';

export default class BaseStore extends EventEmitter  {
    constructor(){
        super();
    }

    emitChange(event){
        if(event){
            this.emit(event);
        } else {
            this.emit('change');
        }
    }

    addChangeListener(callback, event){
        if(event){
            this.on(event, callback);
        } else {
            this.on('change', callback);
        }
    }

    removeChangeListener(callback, event){
        if(event){
            this.removeListener(event, callback);
        } else {
            this.removeListener('change', callback);
        }
    }
}

BaseStore.dispatchToken = null;
