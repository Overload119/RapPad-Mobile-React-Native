/**
* Dashboard screen shows all raps a user has made.
**/

import React,
{
  View, Text, StyleSheet, RefreshControl, TouchableWithoutFeedback, ScrollView,
  Alert, Image
}
from 'react-native';
import moment from 'moment';

import {COLORS} from '../constants/Colors'
import {GlobalStyles} from '../constants/GlobalStyles'
import API from '../lib/API'
import RPLink from './RPLink'
import RPImage from './RPImage'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      raps: []
    }
  }
  componentDidMount() {
    this.loadRaps();
  }
  async loadRaps() {
    try {
      let result = await RPStorage.loadCurrentUserRaps({
        limit: 10,
        offset: 0
      });
      this.setState({ raps: result, isLoading: false });
    } catch (error) {
    }
  }
  renderRapRow(rap) {
    return (
      <TouchableWithoutFeedback key={rap.id}>
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
      </TouchableWithoutFeedback>
    );
  }
  renderLoader() {
    return (
      <Text style={styles.loader}>Loading...</Text>
    )
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={GlobalStyles.row}>
          <Text style={[GlobalStyles.smallText, styles.label]}>
            YOUR RAPS
          </Text>
          <RPLink
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
          this.state.raps.map(this.renderRapRow)}
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
