import { observable, action } from 'mobx';
import { NavigationScreenProp, NavigationState, NavigationContainerComponent, NavigationAction, NavigationParams, NavigationNavigateAction } from 'react-navigation';

export default class Navigation {
  @observable.ref navigation: NavigationScreenProp<NavigationState> | undefined;

  @action.bound createRef(ref: NavigationContainerComponent & { _navigation: NavigationScreenProp<NavigationState> }) {
    this.navigation = ref._navigation;
  }

  @action.bound dispatch(action: NavigationAction) {
    if (!this.navigation) {
      throw new Error('please create navigation refs first.');
    }
    this.navigation.dispatch(action);
  }

  @action.bound getParam(paramName: string, fallback?: NavigationParams) {
    if (!this.navigation) {
      throw new Error('please create navigation refs first.');
    }
    this.navigation.getParam(paramName, fallback);
  }

  @action.bound setParams(newParams: NavigationParams) {
    if (!this.navigation) {
      throw new Error('please create navigation refs first.');
    }
    this.navigation.setParams(newParams);
  }

  @action.bound navigate(
    routeNameOrOptions: string | {
      routeName: string | {
        routeName: string;
        params?: NavigationParams;
        action?: NavigationAction;
        key?: string;
      };
      params?: NavigationParams;
      action?: NavigationAction;
      key?: string;
    },
    params?: NavigationParams,
    action?: NavigationAction,
  ) {
    if (!this.navigation) {
      throw new Error('please create navigation refs first.');
    }
    this.navigation.navigate(routeNameOrOptions as string, params, action);
  }

  @action.bound push(routeName: string, params?: NavigationParams, action?: NavigationAction) {
    if (!this.navigation) {
      throw new Error('please create navigation refs first.');
    }
    this.navigation.push(routeName, params, action as NavigationNavigateAction);
  }

  @action.bound replace(routeName: string, params?: NavigationParams, action?: NavigationAction) {
    if (!this.navigation) {
      throw new Error('please create navigation refs first.');
    }
    this.navigation.replace(routeName, params, action as NavigationNavigateAction);
  }

  @action.bound goBack(routeKey?: string | null) {
    if (!this.navigation) {
      throw new Error('please create navigation refs first.');
    }
    this.navigation.goBack(routeKey);
  }

  @action.bound pop(n?: number, params?: { immediate?: boolean }) {
    if (!this.navigation) {
      throw new Error('please create navigation refs first.');
    }
    this.navigation.pop(n, params);
  }

  @action.bound popToTop(params?: { immediate?: boolean }) {
    if (!this.navigation) {
      throw new Error('please create navigation refs first.');
    }
    this.navigation.popToTop(params);
  }
}
