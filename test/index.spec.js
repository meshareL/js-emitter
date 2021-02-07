'use strict';
const {assert} = require('chai')
    , sinon = require('sinon')
    , Emitter = require('../dist/index.cjs')
    , methodnames = [
    {on: 'addListener', off: 'removeListener', offAll: 'removeAllListeners'},
    {on: 'on', off: 'off', offAll: 'offAll'}
];

methodnames.forEach(names => {
    describe(`js-emitter${names.on === 'on' ? ' short method' : ''}`, () => {
        const event = {
            onkeydown: 'on:keydown',
            onmousedown: 'on:mousedown'
        }
            , initListener = sinon.fake()
            , /** @type {Emitter} */ emitter = new Emitter()
            , addListener = emitter[names.on].bind(emitter)
            , removeListener = emitter[names.off].bind(emitter)
            , removeAllListener = emitter[names.offAll].bind(emitter);

        beforeEach(() => {
            addListener(event.onkeydown, initListener);
            addListener(event.onkeydown, initListener);
            addListener(event.onmousedown, initListener);
            addListener(event.onmousedown, initListener);
        });

        afterEach(() => {
            removeAllListener();
            sinon.restore();
        });

        it('event type can use symbol', () => {
            const type = Symbol('event type');
            addListener(type, sinon.fake());
            assert.lengthOf(emitter.listeners(type), 1);
        });

        it('add a listener for a given event', () => {
            const type = 'on:keypress';
            addListener(type, sinon.fake());
            assert.lengthOf(emitter.listeners(type), 1);
        });

        it('add a one-time listener for a given event', () => {
            const type = 'on:keypress';
            addListener(type, sinon.fake(), true);

            assert.lengthOf(emitter.listeners(type), 1);
            assert.isTrue(emitter.listeners(type)[0].once);
        });

        it('get all listeners for a given event', () => {
            assert.lengthOf(emitter.listeners(event.onmousedown), 2);
            assert.lengthOf(emitter.listeners(event.onkeydown), 2);
        });

        it('remove at most one listener instance for a given event', () => {
            removeListener(event.onkeydown, initListener);
            assert.lengthOf(emitter.listeners(event.onkeydown), 1);
        });

        it('remove all listeners for a given event', () => {
            removeAllListener(event.onkeydown);
            assert.isEmpty(emitter.listeners(event.onkeydown));
            assert.lengthOf(emitter.listeners(event.onmousedown), 2);
        });

        it('emit an event and the event parameter contains the type attribute', () => {
            const type = 'on:keypress'
                , listener = sinon.fake();

            addListener(type, listener);
            emitter.emit(type, {relatedTarget: true});

            assert.isTrue(listener.calledOnce);
            assert.isTrue(listener.calledOnceWith({relatedTarget: true, type: 'on:keypress'}));
        });

        it('should be deleted after a one-time listener call', () => {
            const type = 'on:keypress';

            addListener(type, sinon.fake())
            addListener(type, sinon.fake(), true)
            addListener(type, sinon.fake());
            emitter.emit(type, {relatedTarget: true});

            assert.lengthOf(emitter.listeners(type), 2);
            emitter.listeners(type).forEach(obj => assert.isFalse(obj.once));
        });
    });
});
