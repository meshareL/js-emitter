'use strict';
import Emitter, {EventType, EventListener} from '../index';

interface KeydownEvent {
    readonly key: string;
}

interface MousedownEvent {
    readonly altKey: boolean;
}

const onkeydown: EventType<KeydownEvent> = Symbol()
    , onmousedown: EventType<MousedownEvent> = Symbol()
    , keydownListener1: EventListener<KeydownEvent> = event => console.log(event)
    , keydownListener2: EventListener<KeydownEvent> = event => console.log(event)
    , keydownListener3: EventListener<KeydownEvent> = event => console.log(event)
    , emitter = new Emitter();

emitter
    .addListener(onkeydown, keydownListener1)
    .addListener(onkeydown, keydownListener2)
    .addListener(onkeydown, keydownListener3)
    .addListener(onkeydown, event => console.log(event), true)
    .addListener(onmousedown, event => console.log(event), true);

emitter.emit(onkeydown, {key: 'Enter'});

emitter
    .removeListener(onkeydown, keydownListener1)
    .removeAllListeners(onkeydown);
