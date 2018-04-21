# react-navigation-mobx-helpers

[React-Navigation](https://github.com/react-navigation/react-navigation) bindings for [MobX](https://github.com/mobxjs/mobx)

## Installation

```shell
npm install react-navigation-mobx-helpers --save
```

## Usage

```jsx
import React from 'react';
import { Provider, inject, observer } from 'mobx-react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import NavigationStore from 'react-navigation-mobx-helpers';

const RootNavigator = StackNavigator(RouteConfigs);

const rootNavigation = new NavigationStore(RootNavigator);

class Root extends React.Component {
  render() {
    return (
      <Provider rootNavigation={rootNavigation}>
        <App />
      </Provider>
    );
  }
}

@inject('rootNavigation')
@observer
class App extends React.Component {
  render() {
    const { state, dispatch, addListener } = this.props.rootNavigation;
    return (
      <RootNavigator
        navigation={addNavigationHelpers({ state, dispatch, addListener })}
      />
    );
  }
}
```
