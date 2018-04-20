import { observable, action } from 'mobx';
import {
  NavigationContainer,
  NavigationStateRoute,
  NavigationActions,
  NavigationAction,
  NavigationEventCallback,
  NavigationEventSubscription,
  NavigationBackActionPayload,
  NavigationInitActionPayload,
  NavigationNavigateActionPayload,
  NavigationPopActionPayload,
  NavigationPopToTopActionPayload,
  NavigationResetActionPayload,
  NavigationSetParamsActionPayload,
  NavigationUriActionPayload,
  NavigationParams,
  NavigationNavigateAction,
} from 'react-navigation';

class Navigation {
  constructor(private Navigator: NavigationContainer) {};

  @observable.ref state: NavigationStateRoute<any> = this.Navigator.router.getStateForAction(NavigationActions.init(), null);

  private subscribers: Map<string, NavigationEventCallback> = new Map();

  @action.bound dispatch(action: NavigationAction) {
    const lastState = this.state;
    const state = this.Navigator.router.getStateForAction(action, lastState);
    this.state = state;
    this.subscribers.forEach((subscriber) => {
      subscriber({
        type: 'action',
        action,
        state,
        lastState,
      });
    });
  }

  addListener = (eventName: string, handler: NavigationEventCallback): NavigationEventSubscription => {
    if (eventName !== 'action') {
      return { remove: () => {} };
    }
    const { key } = this.state;
    this.subscribers.set(key, handler);
    return {
      remove: () => {
        this.subscribers.delete(key);
      },
    };
  }

  /**
   * original actions
   */

  back = (payload: NavigationBackActionPayload) => {
    const action = NavigationActions.back(payload);
    this.dispatch(action);
  }

  init = (payload: NavigationInitActionPayload) => {
    const action = NavigationActions.init(payload);
    this.dispatch(action);
  }

  navigate = (payload: NavigationNavigateActionPayload) => {
    const action = NavigationActions.navigate(payload);
    this.dispatch(action);
  }

  pop = (payload: NavigationPopActionPayload) => {
    const action = NavigationActions.pop(payload);
    this.dispatch(action);
  }

  popToTop = (payload: NavigationPopToTopActionPayload) => {
    const action = NavigationActions.popToTop(payload);
    this.dispatch(action);
  }

  push = (payload: { routeName: string, params?: NavigationParams, action?: NavigationNavigateAction }) => {
    // @ts-ignore
    const action = NavigationActions.push(payload);
    this.dispatch(action);
  }

  reset = (payload: NavigationResetActionPayload) => {
    const action = NavigationActions.reset(payload);
    this.dispatch(action);
  }

  replace = (payload: { routeName: string, params?: NavigationParams, action?: NavigationNavigateAction }) => {
    // @ts-ignore
    const action = NavigationActions.replace(payload);
    this.dispatch(action);
  }

  setParams = (payload: NavigationSetParamsActionPayload) => {
    const action = NavigationActions.setParams(payload);
    this.dispatch(action);
  }

  uri = (payload: NavigationUriActionPayload) => {
    // @ts-ignore
    const action = NavigationActions.uri(payload);;
    this.dispatch(action);
  }

  completeTransition = (payload: { key?: string }) => {
    // @ts-ignore
    const action = NavigationActions.completeTransition(payload);
    this.dispatch(action);
  }

  /**
   * additional actions
   */

  resetTo = (payload: NavigationNavigateActionPayload) => {
    const action = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate(payload),
      ],
    });
    this.dispatch(action);
  }
}

export default Navigation;
