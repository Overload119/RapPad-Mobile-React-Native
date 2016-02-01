/**
* Dashboard screen shows all raps a user has made.
**/

import React,
{
  View, Text, StyleSheet, RefreshControl, TouchableWithoutFeedback, ScrollView,
  Alert}
from 'react-native';

import {COLORS} from '../constants/Colors'
import {GlobalStyles} from '../constants/GlobalStyles'
import API from '../lib/API'
import RPLink from './RPLink'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      raps: [
        { id: 1, title: 'Test Rap 1' },
        { id: 2, title: 'Test Rap 2' },
        { id: 3, title: 'Test Rap 3' }
      ]
    }
  }
  componentDidMount() {
    this.loadRaps()
  }
  async loadRaps() {
    try {
      let response = await API.getUserRaps({
        limit: 10,
        offset: 0
      });
      let responseJSON = await response.json();
      if (response.status === 200) {
        Alert.alert('We made it!');
      }
      this.setState({
        error: responseJSON.message,
        isLoading: false
      });
    } catch (error) {
      Alert.alert('Alert Title', 'Error')
      this.setState({
        error: 'Could not reach the server.',
        isLoading: false
      });
      throw error;
    }
  }
  renderRapRow(rap) {
    return (
      <TouchableWithoutFeedback key={rap.id}>
        <View style={styles.row}>
          <Text style={styles.text}>{rap.title}</Text>
          <Text style={styles.text}>{rap.id}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
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
        {this.state.raps.map(this.renderRapRow)}
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
  row: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.FORM
  },
  text: {
    color: COLORS.GRAY
  }
});

export default Dashboard;
module.exports = Dashboard;
