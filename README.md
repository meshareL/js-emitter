# js-emitter
An event emit library

## 安装
```shell
npm install @tomoeed/js-emitter --save
```

## 使用
```js
import Emitter from '@tomoeed/js-emitter';
// commonjs
const Emitter = require('@tomoeed/js-emitter').default;

const emitter = new Emitter();
emitter.addListener();
```

如果使用 `script` 引入库, 则可以通过 `window.JSEmitter` 使用

## API
### `addListener(type, listener, [once])`
别名: `on`
- `type`: &lt;string&gt; | [&lt;EventType&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L1) 事件类型
- `listener`: [&lt;EventListener&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L6) 回调函数
- `once`: 该监听器是否为一次性监听器函数. 默认值: `false`
- Return: [&lt;Emitter&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L18)

将监听器函数添加到给定事件的监听器数组末尾  
函数未检查监听器函数是否已添加, 多次调用将导致监听器函数多次添加

```js
emitter.addListener('on:event', event => {});
```

### `removeListener(type, listener)`
别名: `off`
- `type`: &lt;string&gt; | [&lt;EventType&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L1) 事件类型
- `listener`: [&lt;EventListener&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L6) 回调函数
- Return: [&lt;Emitter&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L18)

移除给定事件的监听器数组中指定的监听器函数  
如果监听器函数多次添加到给定事件的监听器数组中, 则需要多次调用该函数来删除每个实例

```js
function listener() {}
emitter.removeListener('on:event', listener);
```

### `removeAllListener([type])`
别名: `offAll`
- `type`: &lt;string&gt; | [&lt;EventType&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L1) 事件类型
- Return: [&lt;Emitter&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L18)

删除所有监听器或给定事件的所有监听器

```js
emitter.removeAllListeners('on:event');
emitter.removeAllListeners();
```

### `emit(type, event)`
- `type`: &lt;string&gt; | [&lt;EventType&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L1) 事件类型
- `event`: 传递给处理程序的参数

触发指定事件

```js
emitter.emit('on:event', {});
```

### `listeners(type)`
- `type`: &lt;string&gt; | [&lt;EventType&gt;](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L1) 事件类型
- Return: [&lt;EventListenerObject&gt;[]](https://github.com/meshareL/js-emitter/blob/master/index.d.ts#L12)

获取监听给定事件的所有监听器

```js
emitter.listeners('on:event');
```

## License
[Apache-2.0](https://github.com/meshareL/js-emitter/blob/master/LICENSE)
