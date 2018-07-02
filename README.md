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
import { StackNavigator } from 'react-navigation';
import NavigationStore from 'react-navigation-mobx-helpers';

const RootNavigator = StackNavigator(RouteConfigs);

const rootNavigation = new NavigationStore();

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
    const { rootNavigation } = this.props;
    return <RootNavigator ref={rootNavigation.createRef} />;
  }
}
```

## API

| Action      | Parameter                                                                                                                                                                | Description                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `createRef` | `ref: React.Component`                                                                                                                                                   | Save an instance of navigation to store                                |
| `dispatch`  | `action: NavigationAction`                                                                                                                                               | Send an action to router                                               |
| `getParam`  | `paramName: string, fallback?: NavigationParams`                                                                                                                         | Get a specific param with fallback                                     |
| `setParams` | `newParams: NavigationParams`                                                                                                                                            | Make changes to route's params                                         |
| `navigate`  | `{ routeName: string, params?: NavigationParams, action?: NavigationAction, key?: string }` OR `routeName: string, params?: NavigationParams, action?: NavigationAction` | Go to another screen, figures out the action it needs to take to do it |
| `push`      | `routeName: string, params?: NavigationParams, action?: NavigationAction`                                                                                                | Navigate forward to new route in stack                                 |
| `replace`   | `routeName: string, params?: NavigationParams, action?: NavigationAction`                                                                                                | Replace the current route with a new one                               |
| `goBack`    | `routeKey?: string \| null`                                                                                                                                              | Close active screen and move back in the stack                         |
| `pop`       | `n?: number, params?: { immediate?: boolean }`                                                                                                                           | Go back in the stack                                                   |
| `popToTop`  | `params?: { immediate?: boolean }`                                                                                                                                       | Go to the top of the stack                                             |
