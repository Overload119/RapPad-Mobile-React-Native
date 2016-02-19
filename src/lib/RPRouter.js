import React from 'react-native';
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
  getEditorRoute(rap, dashboard) {
    return {
      renderScene(navigator) {
        let Editor = require('../components/Editor');
        return <Editor navigator={navigator} rap={rap} dashboard={dashboard}/>;
      }
    }
  },
  getHomeRoute() {
    return {
      getSceneClass() {
        return require('../components/Home');
      }
    };
  }
};

export default RPRouter
