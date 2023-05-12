import React from 'react';
import { Icon } from 'raind';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const App: React.FC = () => {
  return (
    <>
      <Icon icon="coffee" theme="success" size="8x" />
      <Icon icon="coffee" theme="primary" size="8x" />
      <Icon icon="coffee" theme="warning" size="8x" />
      <Icon icon="coffee" theme="error" size="8x" />
    </>
  );
};

export default App;
