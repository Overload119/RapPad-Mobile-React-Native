/**
* Dashboard screen shows all raps a user has made.
**/

import React,
{
  View, Text, StyleSheet, RefreshControl, TouchableOpacity, ScrollView,
  Alert, Image
}
from 'react-native';
import moment from 'moment';

import API from '../lib/API'
import RPImage from './RPImage'
import RPLink from './RPLink'
import RPRouter from '../lib/RPRouter'
import {COLORS} from '../constants/Colors'
import {GlobalStyles} from '../constants/GlobalStyles'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      raps: [],
      localRaps: []
    }
  }
  componentDidMount() {
    this.loadRaps();
  }
  async loadRaps() {
    this.setState({ isLoading: true });
    try {
      let result = await RPStorage.loadCurrentUserRaps({
        limit: 10,
        offset: 0
      });
      this.setState({ raps: result });
    } catch (error) {
      // Not found.
    }

    try {
      let result = await RPStorage.loadLocalRaps();
      this.setState({ localRaps: result });
    } catch (error) {
      // Not found.
    }

    this.setState({ isLoading: false });
  }
  handleOnRefresh() {
    this.loadRaps();
  }
  handlePressNew() {
    let rap = {
      title: 'Untitled Rap',
      lyrics: ''
    }
    this.props.navigator.push(RPRouter.getEditorRoute(rap));
  }
  handlePressRap(rap) {
    let clonedRap = {};
    Object.assign(clonedRap, rap)
    this.props.navigator.push(RPRouter.getEditorRoute(clonedRap));
  }
  renderRapRow(rap) {
    return (
      <TouchableOpacity
        key={rap.id}
        onPress={this.handlePressRap.bind(this, rap)}>
        <View style={styles.row}>
          <RPImage
            style={styles.rowImage}
            source={{ uri: rap.thumbnail }}
            defaultSource={require('../images/default_rap.png')}
          />
          <View>
            <Text style={styles.rowText} numberOfLines={1}>{rap.title}</Text>
            <Text style={[styles.rowText, GlobalStyles.smallText]}>
              {moment(rap.created_at).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  renderLoader() {
    return (
      <Text style={styles.loader}>Loading...</Text>
    )
  }
  renderLocalRaps() {
    if (this.state.localRaps.length === 0) {
      return null;
    }

    return (
      <View>
        <View style={GlobalStyles.row}>
          <Text style={[GlobalStyles.smallText, styles.label]}>
            YOUR RAPS (SAVED ON PHONE ONLY)
          </Text>
        </View>
        {this.state.isLoading ?
          this.renderLoader() :
          this.state.localRaps.map(this.renderRapRow.bind(this))}
      </View>
    )
  }
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this.handleOnRefresh.bind(this)}
            title="Loading..."
            progressBackgroundColor={COLORS.WHITE}
            tintColor={COLORS.WHITE}
          />
        }
        style={styles.container}>
        {this.renderLocalRaps()}
        <View style={GlobalStyles.row}>
          <Text style={[GlobalStyles.smallText, styles.label]}>
            YOUR RAPS
          </Text>
          <RPLink
            onPress={this.handlePressNew.bind(this)}
            style={[
              GlobalStyles.marginVert,
              GlobalStyles.smallText,
              { flex: 0.5 }
            ]}>
            NEW +
          </RPLink>
        </View>
        {this.state.isLoading ?
          this.renderLoader() :
          this.state.raps.map(this.renderRapRow.bind(this))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BASE,
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12
  },
  label: {
    marginTop: 12,
    marginBottom: 12,
    color: COLORS.GRAY,
    flex: 0.5
  },
  loader: {
    color: COLORS.GRAY,
    fontSize: 24,
    textAlign: 'center'
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.FORM,
    paddingTop: 8,
    paddingBottom: 8,
    flex: 1,
    flexDirection: 'row'
  },
  rowText: {
    flex: 1,
    color: COLORS.GRAY,
    overflow: 'hidden'
  },
  rowImage: {
    width: 38,
    height: 38,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.FORM,
  },
  text: {
    color: COLORS.GRAY
  }
});

export default Dashboard;
module.exports = Dashboard;
