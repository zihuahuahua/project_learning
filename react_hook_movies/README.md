### 基础 Hook

> useState
```js
// 传入初始值，作为 state
const [state, setState] = useState(initialState)

//  `惰性初始 state`；传入函数，由函数计算出的值作为 state
// 此函数只在初始渲染时被调用
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props)
  return initialState
})
```
> useEffect

- 该 Hook 接受两个参数，一个是要运行的函数，另一个是数组。在该数组中，只传入一个值，该值告诉 React 如果传入的值未更改，则跳过该函数。
- 默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它 在只有某些值改变的时候才执行。
- 清除 effect
通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。要实现这一点，useEffect 函数需返回一个清除函数。以下就是一个创建 useEffect 例子：
```js
useEffect(() => {
  const subscription = props.source.subscribe()
  return () => {
    // 清除订阅
    subscription.unsubscribe()
  }
}, [依赖])
```
> useContext
### 额外的 Hook

useReducer
useCallback
useMemo
useRef
useImperativeHandle
useLayoutEffect
useDebugValue

## 如何正确的使用 Hook 

1. 使用规则
只在最顶层使用 Hook：不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。
不要在普通的 JavaScript 函数中调用 Hook。你可以
▲ 在 React 的函数组件中调用 Hook
▲ 在自定义 Hook 中调用其他 Hook
---
2. 只有在自己依赖更新时才执行 effect

当在函数组件里面，有多个 effect 的时候，默认的 effect 将在每次 UI render 之后被调用。当我们通过 useEffect 的第二个数组类型参数，指明当前 effect 的依赖，就能避免不相关的执行开销了。

*可以通过启用 eslint-plugin-react-hooks 插件，来强制提醒我们在使用 effect 的时候，申明所需要的依赖*

对于 useEffect 内部方法，一旦引用外部的函数，需要把 useEffect 内部引用到的方式，声明为当前 effect 的依赖
```js
// 错误写法
const getFetchUrl = () => {
  return `https://hn.algolia.com/api/v1/search?query=${query}`
}

const fetchData = async () => {
  return axios.get(getFetchUrl())
}

useEffect(() => {
  fetchData().then(resp => {
    console.log(resp)
    setData(resp.data)
  })
}, [])
```
```js
// 正确写法
useEffect(() => {
  const getFetchUrl = () => {
    return `https://hn.algolia.com/api/v1/search?query=${query}`
  }

  const fetchData = async () => {
    return axios.get(getFetchUrl())
  }

  fetchData().then(resp => {
    console.log(resp)
    setData(resp.data)
  })
}, [query])
```
---
3. 理解每一次的 Rendering
>每一次渲染都有它自己的 Props and State
每一次渲染都有它自己的事件处理函数
每次渲染都有它自己的 Effects
