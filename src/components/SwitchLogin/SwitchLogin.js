import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import {
  Platform,
  View
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../styles';
import { business_team } from '../../assets';
import NavigatorService from '../../services/NavigatorService';
import styles from './Styles';

export default class SwitchLogin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View style={{ flex: 1, backgroundColor: '#FFF' }}>

            {/* Conteúdo principal respeitando apenas o topo */}
            <View style={[styles.container, { flex: 1, paddingTop: insets.top }]}>
              <LottieView
                source={business_team}
                autoPlay
                loop
                style={{ width: '100%', height: 400 }}
              />
              <Button
                icon={() => <Icon name="smile-beam" size={20} color="#FFF" />}
                mode="contained"
                style={[styles.button, { backgroundColor: colors.CUSTOMER }]}
                textColor="#FFF"
                onPress={() => NavigatorService.navigate('FormLoginCostumer')}>
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

            {/* A BARRA AZUL - Ela usa o 'insets.bottom' para ter o tamanho EXATO dos botões */}
            {Platform.OS === 'android' && insets.bottom > 0 && (
              <View
                style={{
                  height: insets.bottom,
                  backgroundColor: "#000000",
                  width: '100%',
                }}
              />
            )}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}