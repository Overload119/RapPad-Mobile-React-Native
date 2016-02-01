import ExNavigator, { SceneConfigs } from '@exponent/react-native-navigator';

let RPRouter = {
  getLaunchRoute() {
    return {
      getSceneClass() {
        return require('../components/Launch');
      }
    };
  },
  getRegisterRoute() {
    return {
      getSceneClass() {
        return require('../components/Register');
      }
    };
  },
  getLoginRoute() {
    return {
      getTitle() {
        return 'Login';
      },
      getSceneClass() {
        return require('../components/Login');
      }
    };
  },
  getDashboardRoute() {
    return {
      getSceneClass() {
        return require('../components/Dashboard');
      }
    };
  }
};

export default RPRouter
