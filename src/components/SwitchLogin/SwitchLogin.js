import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../styles';
import { business_team } from '../../assets';
import styles from './Styles';

export default class SwitchLogin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
        <View style={styles.container}>
          <LottieView
            source={business_team}
            autoPlay
            loop
            style={{
              width: '100%',
              height: 400,
            }}
          />
          <Button
            icon={() => <Icon name="smile-beam" size={20} color="#FFF" />}
            mode="contained"
            style={[styles.button, { backgroundColor: colors.CUSTOMER }]}
            textColor="#FFF"
            onPress={() => { }}>
            Sou Cliente
          </Button>
          <Button
            icon={() => <Icon name="id-card-alt" size={20} color="#FFF" />}
            mode="contained"
            style={[styles.button, { backgroundColor: colors.PROFESSIONAL }]}
            textColor="#FFF"
            onPress={() => { }}>
            Sou Profissional
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}