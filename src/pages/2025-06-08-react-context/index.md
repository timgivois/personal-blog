---
path: '/react-context-guide'
date: '2025-06-08'
title: 'React Context Guide: Share State Without Prop Drilling'
description: 'Learn how React Context shares state across your component tree with setup steps, provider patterns, and pitfalls to avoid.'
tags: ['React', 'JavaScript']
excerpt: 'Use React Context to share state across your component tree without messy prop drilling, with setup steps and pitfalls to avoid.'
image: '/react.png'
time: '5 min.'
---

React Context lets parent components make information available to any component underneath them without passing props explicitly. The official documentation explains that context can replace repetitive prop passing and helps avoid what is called "prop drilling".

Context is ideal for values that many components need, like the current theme or locale. Instead of manually forwarding these props down through every layer, you create a context once and let React handle the plumbing. This keeps component APIs clean and makes it easier to reorganize your tree later.

## How do you use React Context?

1. **Create** a context with `createContext`.
2. **Use** that context from components that need the data using `useContext`.
3. **Provide** that context from a parent component using the `<Provider>` component.

An excerpt from React's guide shows how context lets a parent provide data to distant children:

```md
You can't do it with props alone. This is where context comes into play. You will do it in three steps:

1. **Create** a context. (You can call it `LevelContext`, since it's for the heading level.)
2. **Use** that context from the component that needs the data. (`Heading` will use `LevelContext`.)
3. **Provide** that context from the component that specifies the data. (`Section` will provide `LevelContext`.)
   Context lets a parent--even a distant one!--provide some data to the entire tree inside of it.
```

A simple example using a theme context:

```javascript
// ThemeContext.js
import { createContext } from 'react'
export const ThemeContext = createContext('light')
```

```javascript
// App.js
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

function Toolbar() {
  const theme = useContext(ThemeContext)
  return <div className={theme}>Toolbar</div>
}

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  )
}
```

### What caveats should you be aware of when using Context?

According to the `useContext` documentation:

- The `<Context>` provider must be **above** the component doing the `useContext()` call.
- React **automatically re-renders** all children that use a context whenever the provider receives a different `value`.
- Context only works if the `SomeContext` used to provide and read the value are **exactly the same object**.

These caveats imply that frequent context updates can cause many components to re-render, so context is best for infrequently changing global data like locale or theme.

### When should you avoid using Context?

Context is powerful, but it can be overused. For rapidly changing values, lifting state up or using dedicated state management libraries may give better performance.
