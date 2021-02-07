'use strict';
import {EventType, EventListener, EventListenerObject} from '../index';

class Emitter {
    private readonly _listeners: Map<string | Symbol, EventListenerObject<any>[]>;

    constructor() {
        this._listeners = new Map();
    }

    listeners<T>(type: EventType<T> | string): EventListenerObject<T>[] {
        if (!this._listeners.has(type)) return [];

        return this._listeners.get(type)!.slice(0) as EventListenerObject<T>[];
    }

    emit<T>(type: EventType<T> | string, event: T): void {
        const listeners = this._listeners.get(type);
        if (!listeners) return;

        for (let i = 0; i < listeners.length; i++) {
            const {handleEvent, once} = listeners[i];
            handleEvent(Object.assign({}, event, {type}));

            if (!once) continue;
            listeners.splice(i, 1);
            i--;
        }
    }

    addListener<T, E extends T = T>(
        type: EventType<T> | string,
        listener: EventListener<E>,
        once: boolean = false
    ): this {
        if (this._listeners.has(type)) {
            this._listeners.get(type)!.push({handleEvent: listener, once});
        } else {
            this._listeners.set(type, [{handleEvent: listener, once}]);
        }

        return this;
    }

    removeListener<T, E extends T = T>(
        type: EventType<T> | string,
        listener: EventListener<E>
    ): this {
        const listeners = this._listeners.get(type);
        if (!listeners) return this;

        const index = listeners.findIndex(fun => fun.handleEvent === listener);
        if (index === -1) return this;

        listeners.splice(index, 1);
        return this;
    }

    removeAllListeners<T>(type?: EventType<T> | string): this {
        if (!type) {
            this._listeners.clear();
            return this;
        }

        if (this._listeners.has(type)) {
            this._listeners.delete(type);
            return this;
        }

        return this;
    }

    on = this.addListener.bind(this);
    off = this.removeListener.bind(this);
    offAll = this.removeAllListeners.bind(this);
}

export default Emitter;
