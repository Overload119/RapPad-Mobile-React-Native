/**
* Dashboard screen shows all raps a user has made.
**/

import React, {View, Text} from 'react-native';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Text>You are logged in and on your Dashboard!</Text>
    );
  }
}

export default Dashboard;
module.exports = Dashboard;
