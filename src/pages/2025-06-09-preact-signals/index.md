---
path: '/preact-signals'
date: '2025-06-09'
title: 'Using Preact Signals'
tags: ['Preact', 'JavaScript']
excerpt: 'When to reach for Preact Signals, how to use them, and when plain props are enough.'
image: 'https://images.weserv.nl/?url=raw.githubusercontent.com/preactjs/preact-www/master/src/assets/branding/symbol.png&h=400'
time: '7 min.'
---

Preact offers an optional library called **Signals** for fine-grained reactivity. Signals let you update only the components that depend on a value rather than re-rendering entire component trees. The official guide has a great introduction on the concept at <Link underline href="https://preactjs.com/guide/v10/signals/">preactjs.com</Link>.

### Install Preact and Signals

```bash
yarn add preact @preact/signals
```

### Create a signal

```javascript
import { signal } from '@preact/signals'

const count = signal(0)
```

Read the current value with `count.value` and update it by assigning to `count.value`. Components that read this signal automatically re-render when the value changes.

### Using signals inside components

```jsx
import { useSignal, useComputed, useSignalEffect } from '@preact/signals'

export default function Counter() {
  const count = useSignal(0)
  const doubled = useComputed(() => count.value * 2)

  useSignalEffect(() => {
    console.log('Count changed', count.value)
  })

  return (
    <div>
      <button onClick={() => count.value++}>Increase</button>
      <p>{count}</p>
      <p>Double: {doubled}</p>
    </div>
  )
}
```

### Why Signals?

Signals tie your state updates directly to DOM updates. Even large component trees stay snappy because only the parts that use a signal will update. It's a small library and integrates nicely with Preact's tiny footprint. The blog post <Link underline href="https://www.builder.io/blog/signals">useSignal() is the Future of Web Frameworks</Link> dives deeper into why developers enjoy this model.

### When to use Signals

- Highly interactive widgets that update many times per second
- Sharing small pieces of state across sibling components
- Cases where you want reactive updates without introducing a global store

### When not to use Signals

- Long-lived global data such as app configuration
- Complex asynchronous state management where dedicated libraries shine
- Simple scenarios that already work well with props or context

### Hooks recap

- `useSignal(initialValue)` creates a memoized signal inside a component.
- `useComputed(fn)` derives values from other signals.
- `useSignalEffect(fn)` runs side effects whenever a signal changes.

Give Signals a try on your next Preact project and see how they feel!
