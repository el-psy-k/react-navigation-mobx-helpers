# react-navigation-mobx-helpers

[React-Navigation](https://github.com/react-navigation/react-navigation) bindings for [MobX](https://github.com/mobxjs/mobx)

## Installation

```shell
npm install react-navigation-mobx-helpers --save
```

## Usage

```jsx
import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider, inject, observer } from 'mobx-react';
import NavigationStore from 'react-navigation-mobx-helpers';

const RootNavigator = StackNavigator(RouteConfigs);

const enhancedNavigation = new NavigationStore(RootNavigator);

class Root extends React.Component {
  render() {
    return (
      <Provider enhancedNavigation={enhancedNavigation}>
        <App />
      </Provider>
    );
  }
}

@inject('enhancedNavigation')
@observer
class App extends React.Component {
  render() {
    const { state, dispatch, addListener } = this.props.enhancedNavigation;
    return (
      <RootNavigator
        navigation={addNavigationHelpers({ state, dispatch, addListener })}
      />
    );
  }
}
```
