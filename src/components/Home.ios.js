/**
* Home screen holds tabs along the top and content within it.
**/

import React, {
  View, Text, StyleSheet, TabBarIOS, StatusBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../constants/Colors';
import Dashboard from './Dashboard';
import Forum from './Forum';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabPosition: 0,
    };
  }
  async componentDidMount() {
    let dashboardIcon = await Icon.getImageSource('ios-list', 20, 'red');
    let exploreIcon = await Icon.getImageSource('ios-world', 20, 'red');
    let forumIcon = await Icon.getImageSource('ios-chatbubble', 20, 'red');
    this.setState({
      dashboardIcon: dashboardIcon,
      exploreIcon: exploreIcon,
      forumIcon: forumIcon
    });
    StatusBarIOS.setHidden(true);
  }
  handlePressTab(tabPosition, evt) {
    this.setState({ tabPosition: tabPosition });
  }
  render() {
    return (
      <Dashboard navigator={this.props.navigator} />
      /* In version 1.0 we won't have these options.
      <TabBarIOS
        translucent={true}
        barTintColor={COLORS.BASE}
        style={styles.home}>
        <TabBarIOS.Item
          title="Dashboard"
          icon={this.state.dashboardIcon}
          selected={this.state.tabPosition === 0}
          onPress={this.handlePressTab.bind(this, 0)}>
          <Dashboard navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Explore"
          selected={this.state.tabPosition === 1}
          icon={this.state.exploreIcon}
          onPress={this.handlePressTab.bind(this, 1)}>
          <Dashboard />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Forums"
          selected={this.state.tabPosition === 2}
          icon={this.state.forumIcon}
          onPress={this.handlePressTab.bind(this, 2)}>
          <Forum />
        </TabBarIOS.Item>
      </TabBarIOS>
      */
    );
  }
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: COLORS.BASE,
    flex: 0.1,
    flexDirection: 'column'
  },
  tabBar: {
  },
  viewPager: {
    flex: 1
  }
});

module.exports = Home;
