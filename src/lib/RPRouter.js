import ExNavigator, { SceneConfigs } from '@exponent/react-native-navigator';
import Launch from '../components/Launch';
import Register from '../components/Register';

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
  }
};

export default RPRouter
