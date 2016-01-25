import React, {Component, PropTypes, Platform, StyleSheet, Text, View} from 'react-native';
import ExNavigator from '@exponent/react-native-navigator';

import Launch from './Launch.js';
import Register from './Register.js';
import RPRouter from '../lib/RPRouter.js';

class App extends Component {
  static propTypes = {
    instructions: PropTypes.string,
  };

  static defaultProps = {
    ...Component.defaultProps,
    instructions: 'Usage instructions not provided.',
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      platform: Platform.OS,
    };
  }

  render() {
    const { instructions } = this.props;
    let { platform } = this.state;

    // TODO - if logged in, show navigation bar
    // if logged in, don't show launch, but show dashboard.
    return (
      <ExNavigator
        initialRoute={RPRouter.getLaunchRoute()}
        showNavigationBar={false}
      />
    );
  }
}

export default App;
module.exports = App;
