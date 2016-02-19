import React, {
  Component, TextInput, StyleSheet, Text, View, Alert, BackAndroid, Platform,
  ScrollView, NetInfo, TouchableWithoutFeedback, Animated, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuid from 'uuid';

import Home from './Home';
import Launch from './Launch';
import RPRouter from '../lib/RPRouter';
import RPStorage from '../lib/RPStorage';
import API from '../lib/API';
import RPTextInput from './RPTextInput';
import RPButton from './RPButton';
import RPLink from './RPLink';
import {COLORS} from '../constants/Colors';
import {GlobalStyles} from '../constants/GlobalStyles';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

let RHYME_BOX_HEIGHT = deviceHeight * 0.25;
let RHYME_BOX_COLLAPSED_HEIGHT = 50;

export default class Editor extends Component {
  constructor(props, context) {
    super(props, context);
    this.rhymeTimer = null;
    this.state = {
      rap: props.rap,
      showRhymes: true,
      rhymeResult: [],
      rhymeWord: '',
      isLoadingRhymes: false,
      isConnected: false,
      isSaving: false,
      errorMessage: '',
      rhymeBoxHeight: new Animated.Value(RHYME_BOX_HEIGHT),
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
        this.handlePressBack();
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

    if (!lastWord || lastWord === '' || !this.state.showRhymes) {
      return;
    }

    this.setState({ isLoadingRhymes: true });
    let rhymes = await RPStorage.getRhymes({ term: lastWord });
    this.setState({
      rhymeResult: rhymes,
      rhymeWord: lastWord,
      isLoadingRhymes: true
    });
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
  handlePressBack() {
    this.props.dashboard.loadRaps();
    this.props.navigator.pop();
  }
  handlePressToggleRhymes() {
    this.setState((prevState) => {
      return { showRhymes: !prevState.showRhymes };
    }, this.animateRhymeBox);
  }
  animateRhymeBox() {
    if (this.state.showRhymes) {
      this.performRhymeRequest();
      Animated.spring(
        this.state.rhymeBoxHeight,
        {
          toValue: RHYME_BOX_HEIGHT,
          friction: 6,
        }
      ).start();
      return;
    }

    Animated.spring(
      this.state.rhymeBoxHeight,
      {
        toValue: RHYME_BOX_COLLAPSED_HEIGHT,
        friction: 6,
      }
    ).start();
  }
  validate() {
    if (this.state.rap.lyrics.length <= 0) {
      this.setState({ validationMessage: 'Please add some lyrics.' });
      return false;
    }
    if (this.state.rap.title.length <= 0) {
      this.setState({ validationMessage: 'Please add a title.' });
      return false;
    }
    this.setState({ validationMessage: null });
    return true;
  }
  async handlePressSave() {
    let isNew = this.state.rap.id == null;
    let rapData = {};

    if (!this.validate()) {
      return;
    }

    Object.assign(rapData, this.state.rap);

    if (this.state.isConnected) {
      this.setState({ isSaving: true });
      try {
        await RPStorage.saveRap({ rap: rapData });
        this.setState({
          rap: rapData,
          isSaving: false
        }, this.showSuccessSave);
      }
      catch (error) {
        this.setState({
          errorMessage: 'Could not save. Try again later.' ,
          isSaving: false
        });
      }
      return;
    }

    if (isNew) {
      rapData.id = uuid.v1();
      rapData.isLocal = true;
    }

    this.setState({ isSaving: true });
    try {
      await RPStorage.saveLocalRap({ rap: rapData });
      this.setState({
        rap: rapData,
        isSaving: false
      }, this.showSuccessSave);
    }
    catch (error) {
      this.setState({
        errorMessage: 'Could not save.' ,
        isSaving: false
      });
    }
  }
  showSuccessSave() {
    this.props.dashboard.loadRaps();

    if (this.state.isConnected) {
      Alert.alert('Your changes were synced to RapPad.');
      return;
    }

    Alert.alert('Your changes were saved to your phone.');
  }
  renderRhymeSuggestions() {
    if (this.state.rhymeResult.length > 0) {
      return (
        <ScrollView>
          <Text style={[GlobalStyles.white, GlobalStyles.smallText]}>
            {this.state.rhymeResult.map ((x) => { return x.word_str }).join(', ')}
          </Text>
        </ScrollView>
      );
    }

    if (this.state.rhymeResult.length === 0 && this.state.rhymeWord !== '') {
      return (
        <Text style={GlobalStyles.white}>
          This word was not found in our rhyming dictionary.
        </Text>
      )
    }

    return (
      <Text style={GlobalStyles.white}>
        Highlight any word to have rhymes appear for it.
        Or, the last word will automatically be looked up.
      </Text>
    )
  }
  renderRhymeBox() {
    let animStyle = {};
    let truncatedWord = this.state.rhymeWord.length > 15 ?
      `${this.state.rhymeWord.substring(0, 15).toUpperCase()}...` :
      this.state.rhymeWord.toUpperCase()

    headerText =
      this.state.rhymeWord === '' ?
      'RHYME SUGGESTIONS' :
      `RHYME SUGGESTIONS FOR "${truncatedWord}"`;
    if (!this.state.showRhymes) {
      headerText = 'CLICK TO ENABLE RHYME SUGGESTIONS';
    }

    animStyle = {
      height: this.state.rhymeBoxHeight
    };

    return (
      <Animated.View style={[styles.rhymeBox, animStyle]}>
        <TouchableWithoutFeedback
          onPress={this.handlePressToggleRhymes.bind(this)}>
          <Text style={[GlobalStyles.marginBottom, GlobalStyles.white]}>
            {headerText}
            {' '}
            <Icon
              name={this.state.showRhymes ? 'chevron-down' : 'chevron-up'}
              size={20}
              color={COLORS.WHITE}
            />
          </Text>
        </TouchableWithoutFeedback>
        {this.state.showRhymes ? this.renderRhymeSuggestions() : null}
      </Animated.View>
    );
  }
  render() {
    let connectionBar = null;
    let backButtonIOS = null;
    let errorMessage = null;
    let validationMessage = null;

    if (!this.state.isConnected) {
      connectionBar = (
        <Text style={styles.errorBar}>
          No Internet detected. Changes will save to phone.
        </Text>
      )
    }

    if (Platform.OS === 'ios') {
      backButtonIOS = (
        <RPLink
          onPress={this.handlePressBack.bind(this)}
          style={styles.iosBack}>
          <Text>
            <Icon name="chevron-left" size={20} color={COLORS.YELLOW} />
          </Text>
        </RPLink>
      )
    }

    if (this.state.errorMessage) {
      errorMessage = (
        <Text style={styles.errorBar}>
          {this.state.errorMessage}
        </Text>
      );
    }

    if (this.state.validationMessage) {
      validationMessage = (
        <Text style={styles.errorBar}>
          {this.state.validationMessage}
        </Text>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View style={styles.topBar}>
          {backButtonIOS}
          <RPTextInput
            style={styles.title}
            onChangeText={this.handleChangeTitle.bind(this)}
            value={this.state.rap.title}
          />
          <RPButton
            style={styles.saveButton}
            disabled={this.state.isSaving}
            onPress={this.handlePressSave.bind(this)}>
            <Text style={[styles.saveButtonText]}>
              Save
            </Text>
          </RPButton>
        </View>
        <View style={GlobalStyles.divider} />
        {connectionBar}
        {validationMessage}
        {errorMessage}
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
  errorBar: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: COLORS.RED,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  iosBack: {
    height: 40,
    lineHeight: 30,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.FORM
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
    height: RHYME_BOX_HEIGHT,
    padding: 12,
    backgroundColor: COLORS.BLUE,
  }
});

module.exports = Editor;
