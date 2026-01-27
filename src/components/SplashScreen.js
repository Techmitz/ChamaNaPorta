import b64 from 'base-64';
import Constants from 'expo-constants';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { logo } from '../imgs';
import store from '../services/AsyncStorage';
import navigationService from '../services/NavigatorService';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLogged: false,
      checkCompleted: false,
      saveProfile: false,
    };
  }

  componentDidMount() {
    //this.configureGoogleSignin();

    //this.checkUserLogin();
    setTimeout(() => navigationService.reset('SwitchLogin'), 1500);
  }

  async checkUserLogin() {
    try {
      await this.autoLogin();

      const isUserLoggedd = await store.get('userLogged');
      this.setState({
        isUserLogged: isUserLoggedd !== null && isUserLoggedd === true,
      });

      const emailUserLogged = await store.get('emailUserLogged');

      if (emailUserLogged) {
        const emailB64 = b64.encode(emailUserLogged);

        try {
          // Usando a API modular do Firebase
          const snapshot = await database.ref(`/users/${emailB64}/saveProfile`).once("value");
          const saveProfile = snapshot.val();

          this.setState(
            {
              saveProfile,
              checkCompleted: true,
            },
            () => {
              setTimeout(() => {
                this.navigateBasedOnLogin();
              }, 2000);
            },
          );
        } catch (error) {
          toastr.showToast(`Erro ao buscar perfil: ${error}`, ERROR);
          this.setState({ checkCompleted: true }, () =>
            this.navigateBasedOnLogin(),
          );
        }
      } else {
        this.setState({ checkCompleted: true }, () => {
          setTimeout(() => {
            this.navigateBasedOnLogin();
          }, 2000);
        });
      }
    } catch (error) {
      toastr.showToast(`Erro ao verificar login: ${error}`, ERROR);
      this.setState({ checkCompleted: true }, () => {
        setTimeout(() => {
          this.navigateBasedOnLogin();
        }, 2000);
      });
    }
  }

  async autoLogin() {
    const credentials = await store.get('credentials');
    if (credentials) {
      await auth.signInWithEmailAndPassword(credentials.email, credentials.password);

      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado");

      await user.getIdToken(true);
    }
  }

  navigateBasedOnLogin() {
    if (this.state.checkCompleted) {
      if (this.state.isUserLogged) {
        if (this.state.saveProfile) {
          navigationService.reset('Main');
        } else {
          navigationService.reset('FormProfile');
        }
      } else {
        navigationService.reset('FormLogin');
      }
    } else {
      setTimeout(() => this.navigateBasedOnLogin(), 100);
    }
  }

  render() {
    return (
      <View style={styles.splashContainer}>
        <Image source={logo} style={styles.splashImage} />
        <Text style={styles.splashText}>
          © {new Date().getFullYear()} Chama Na Porta
        </Text>
        <Text style={styles.splashText}>
          v{Constants.expoConfig?.version || '1.0.0'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  splashImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  splashText: {
    fontSize: 16,
    color: '#000000',
  },
});
