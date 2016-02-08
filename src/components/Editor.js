import React, {
  Component, TextInput, StyleSheet, Text, View, Alert, BackAndroid, Platform,
  ScrollView, NetInfo
} from 'react-native';

import Home from './Home';
import Launch from './Launch';
import RPRouter from '../lib/RPRouter';
import RPStorage from '../lib/RPStorage';
import API from '../lib/API';
import RPTextInput from './RPTextInput';
import RPButton from './RPButton';
import {COLORS} from '../constants/Colors';
import {GlobalStyles} from '../constants/GlobalStyles';

export default class Editor extends Component {
  constructor(props, context) {
    super(props, context);
    this.rhymeTimer = null;
    this.state = {
      rap: props.rap,
      showRhymes: true,
      rhymeResult: [],
      rhymeWord: '',
      isConnected: false
    }
  }
  componentWillUnmount() {
    if (this.rhymeTimer != null) {
      clearTimeout(this.rhymeTimer);
      this.rhymeTimer = null;
    }
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleConnectivityChange
    )
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        BackAndroid.removeEventListener('hardwareBackPress');
        this.props.navigator.pop();
        return true;
      });
      return false;
    }

    NetInfo.isConnected.fetch().done((isConnected) => {
      this.handleConnectivityChange(isConnected);
    });

    NetInfo.isConnected.addEventListener(
      'change',
      this.handleConnectivityChange.bind(this)
    )
  }
  handleConnectivityChange(isConnected) {
    this.setState({ isConnected: isConnected });
  }
  handleChangeTitle(text) {
    this.setState((prevState) => {
      prevState.rap.title = text;
      return prevState;
    });
  }
  async performRhymeRequest() {
    let lastLine = this.state.rap.lyrics.trim().split('\n').pop();
    let wordCandidates = lastLine.split(' ');
    let lastWord = wordCandidates.pop().trim();

    if (!lastWord || lastWord === '') {
      return;
    }

    let rhymes = await RPStorage.getRhymes({ term: lastWord });
    this.setState({ rhymeResult: rhymes, rhymeWord: lastWord });
  }
  handleChangeLyrics(text) {
    if (this.rhymeTimer != null) {
      clearTimeout(this.rhymeTimer);
      rhymeTimer = null;
    }

    this.rhymeTimer = setTimeout(
      this.performRhymeRequest.bind(this),
      1600
    )

    this.setState((prevState) => {
      prevState.rap.lyrics = text;
      return prevState;
    });
  }
  renderRhymeSuggestions() {
    if (this.state.rhymeResult.length > 0) {
      return (
        <ScrollView>
          <Text style={[GlobalStyles.white, GlobalStyles.smallText]}>
            {this.state.rhymeResult.map((x) => { return x.word_str }).join(', ')}
          </Text>
        </ScrollView>
      );
    }

    if (this.state.rhymeResult.length === 0 && this.state.rhymeWord !== '') {
    }

    return (
      <Text style={GlobalStyles.white}>
        Highlight any word to have rhymes appear for it.
        Or, the last word will automatically be looked up.
      </Text>
    )
  }
  renderRhymeBox() {
    if (!this.state.showRhymes) {
      return null;
    }

    headerText =
      this.state.rhymeWord === '' ?
      'RHYME SUGGESTIONS' :
      `RHYME SUGGESTIONS FOR "${this.state.rhymeWord.toUpperCase()}"`;

    return (
      <View style={styles.rhymeBox}>
        <Text style={[
          GlobalStyles.marginBottom,
          GlobalStyles.white
          ]}>
          {headerText}
        </Text>
        {this.renderRhymeSuggestions()}
      </View>
    );
  }
  render() {
    let connectionBar = null;
    if (!this.state.isConnected) {
      connectionBar = (
        <Text style={styles.connectionBar}>
          No Internet detected. Changes will be local only.
        </Text>
      )
    }

    return (
      <View style={{flex: 1}}>
        <View style={styles.topBar}>
          <RPTextInput
            style={styles.title}
            onChangeText={this.handleChangeTitle.bind(this)}
            value={this.state.rap.title}
          />
          <RPButton
            style={styles.saveButton}>
            <Text style={[styles.saveButtonText]}>
              Save
            </Text>
          </RPButton>
        </View>
        <View style={GlobalStyles.divider} />
        {connectionBar}
        <RPTextInput
          onChangeText={this.handleChangeLyrics.bind(this)}
          style={styles.lyrics}
          value={this.state.rap.lyrics}
          multiline={true}
          autoFocus={true}
        />
        {this.renderRhymeBox()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connectionBar: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: COLORS.RED,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  title: {
    flex: 1,
  },
  saveButton: {
    width: 80,
    height: 40
  },
  saveButtonText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    lineHeight: 20
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.FORM
  },
  lyrics: {
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'top',
    lineHeight: 16,
    padding: 8
  },
  rhymeBox: {
    flex: 0.5,
    padding: 12,
    backgroundColor: COLORS.BLUE,
  }
});

module.exports = Editor;
