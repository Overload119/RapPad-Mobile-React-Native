/**
* Home screen holds tabs along the top and content within it.
**/

import React, {
  View, Text, Platform, StyleSheet, ViewPagerAndroid
} from 'react-native';
import {Tab, TabLayout} from 'react-native-android-tablayout'

import {COLORS} from '../constants/Colors';
import Dashboard from './Dashboard';
import Forum from './Forum';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagePosition: 0
    };
  }
  componentDidMount() {
  }
  handleTabSelect(evt) {
    this.setState({ pagePosition: evt.nativeEvent.position });
    this.viewPager.setPage(evt.nativeEvent.position);
  }
  tabTextColor(idx) {
    if (this.state.pagePosition === idx) {
      return COLORS.WHITE;
    }
    return COLORS.GRAY;
  }
  renderTabs() {
    return (
      <TabLayout
        style={styles.tabBar}
        selectedTab={this.state.pagePosition}
        onTabSelected={this.handleTabSelect.bind(this)}
        selectedTabIndicatorColor={COLORS.PURPLE}>
        <Tab
          name="Dashboard"
          textColor={this.tabTextColor(0)}
        />
        <Tab
          name="Explore"
          textColor={this.tabTextColor(1)}
        />
        <Tab
          name="Forums"
          textColor={this.tabTextColor(2)}
        />
      </TabLayout>
    );
  }
  render() {
    return (
      <View style={styles.home}>
        {this.renderTabs()}
        <ViewPagerAndroid
          style={styles.viewPager}
          ref={viewPager => { this.viewPager = viewPager; }}
          onPageSelected={this.handleTabSelect.bind(this)}>
          <Dashboard />
          <View><Text>Tab2</Text></View>
          <Forum />
        </ViewPagerAndroid>
      </View>
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
