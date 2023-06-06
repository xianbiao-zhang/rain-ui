---
title: rain-ui
full: true
gapless: true
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

<code src="./components/home.tsx" inline="true"></code>

```tsx | preview
/**
 * inline: true
 */
import React from 'react';
import { Section } from './site/Section';
import './site/styles.less';
export default () => (
  <Section
    title="使用 stackblitz 在线体验 Rain-ui"
    style={{ marginTop: 56 }}
    titleStyle={{ paddingBottom: 100, fontWeight: 'bold' }}
  >
    <iframe
      className="codesandbox"
      src="https://stackblitz.com/edit/react-ts-ffemvt?file=App.tsx"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  </Section>
);
```

```tsx | preview
/**
 * inline: true
 */
import React from 'react';
import { Section } from './site/Section';
import './site/styles.less';

export default () => (
  <Section titleStyle={{ paddingBottom: 140 }} scale={1.2}>
    <div style={{ paddingBottom: 30 }}></div>
  </Section>
);
```
