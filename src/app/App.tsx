import React from 'react';
import type {FC} from 'react';

import {Navigation} from './navigation';
import {Provider} from 'react-redux';
import {store} from '@shared/store';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
