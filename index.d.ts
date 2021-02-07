interface EventType<T> extends Symbol { }

/**
 * 每个监听器函数 `event` 参数都会被添加一个 `type` 属性(事件类型)
 *
 * 使用 `emit` 触发事件时, `event` 不要添加 `type` 属性, 否则该属性将被覆盖
 */
declare type EmitterEvent<T> = T & { type: string };

declare type EventListener<T> = (event: EmitterEvent<T>) => void;

interface EventListenerObject<T> {
    /** 事件监听器 */
    handleEvent: (event: T) => void;
    /** 是否为一次性监听器 */
    once: boolean;
}

declare class Emitter {
    /** 构造一个 {@link Emitter} 实例 */
    constructor();

    /**
     * 获取监听给定事件的所有监听器
     *
     * @param type 事件类型
     */
    listeners<T>(type: EventType<T> | string): EventListenerObject<T>[];

    /**
     * 触发指定事件
     *
     * @param type 事件类型
     * @param event 事件
     */
    emit<T>(type: EventType<T> | string, event: T): void;

    /**
     * 将监听器函数添加到给定事件的监听器数组末尾
     *
     * 函数未检查监听器函数是否已添加, 多次调用将导致监听器函数多次添加
     *
     * @param type 事件类型
     * @param listener 监听器函数
     * @param [once=false] 该监听器是否为一次性监听器函数
     * @return 返回对 {@link Emitter} 的引用, 以便链式调用
     */
    addListener<T, E extends T = T>(type: EventType<T> | string, listener: EventListener<E>, once?: boolean): this;

    /**
     * 移除给定事件的监听器数组中指定的监听器函数
     *
     * 如果监听器函数多次添加到给定事件的监听器数组中, 则需要多次调用该函数来删除每个实例
     *
     * @param type 事件类型
     * @param listener 监听器函数
     * @return 返回对 {@link Emitter} 的引用, 以便链式调用
     */
    removeListener<T, E extends T = T>(type: EventType<T> | string, listener: EventListener<E>): this;

    /**
     * 删除所有监听器或给定事件的所有监听器
     *
     * @param [type] 事件类型
     * @return 返回对 {@link Emitter} 的引用, 以便链式调用
     */
    removeAllListeners<T>(type?: EventType<T> | string): this;

    /**
     * 将监听器函数添加到给定事件的监听器数组末尾
     *
     * 函数未检查监听器函数是否已添加, 多次添加监听器函数将多次调用
     *
     * @alias Emitter.addListener
     *
     * @param type 事件类型
     * @param listener 监听器函数
     * @param [once=false] 该监听器是否为一次性监听器函数
     * @return 返回对 {@link Emitter} 的引用, 以便链式调用
     */
    on<T, E extends T = T>(type: EventType<T> | string, listener: EventListener<E>, once?: boolean): this;

    /**
     * 移除给定事件的监听器数组中指定的监听器函数
     *
     * 如果监听器函数多次添加到给定事件的监听器数组中, 则需要多次调用该函数来删除每个实例
     *
     * @alias Emitter.removeListener
     *
     * @param type 事件类型
     * @param listener 监听器函数
     * @return 返回对 {@link Emitter} 的引用, 以便链式调用
     */
    off<T, E extends T = T>(type: EventType<T> | string, listener: EventListener<E>): this;

    /**
     * 删除所有监听器或给定事件的所有监听器
     *
     * @alias Emitter.removeAllListener
     *
     * @param type 事件类型
     * @return 返回对 {@link Emitter} 的引用, 以便链式调用
     */
    offAll<T>(type?: EventType<T> | string): this;
}

export default Emitter;
export { EventType, EmitterEvent as Event, EventListener, EventListenerObject };
