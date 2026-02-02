import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login_worker } from '../../../../assets';
import styles from './Styles';

class FormLoginCostumer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: 'eye-off',
      iconPassword: true,
      emailError: '',
      passwordError: '',
    };

    this.passwordRef = React.createRef();
    this.btnLoginRef = React.createRef();
  }

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      iconPassword: !prevState.iconPassword,
    }));
  }

  renderBtnLogin() {
    if (this.props.loginInProgress) {
      return (
        <ActivityIndicator
          style={{ marginBottom: 10 }}
          size="large"
          color={colors.PRIMARY}
        />
      );
    }
    return (
      <Button
        ref={this.btnLoginRef}
        mode="contained"
        style={styles.button}
        icon="login"
        textColor="#FFF"
        onPress={this.handleSubmit}>
        Login
      </Button>
    );
  }

  renderBtnGoogle() {
    if (this.props.loginGoogleInProgress) {
      return <ActivityIndicator size="large" color="#FF0000" />;
    }
    return (
      <Button
        icon={() => <Icon name="google" size={20} color="#FFF" />}
        mode="contained"
        style={styles.googleButton}
        textColor="#FFF"
        onPress={() => { }}>
        Login com Google
      </Button>
    );
  }

  validateFields() {
    let isValid = true;

    if (!this.props.email || !this.props.email.includes('@')) {
      this.setState({ emailError: 'Digite um e-mail válido!' });
      isValid = false;
    }

    if (!this.props.password || this.props.password.length < 6) {
      this.setState({ passwordError: 'A senha deve ter pelo menos 6 caracteres!' });
      isValid = false;
    }

    return isValid;
  }

  handleSubmit = () => {
    if (this.validateFields()) {
      // this.props.onAuthUserEmail(this.props);
      console.log("Login autorizado");
    }
  };

  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <KeyboardAvoidingView
              // No Android, "height" é o que costuma dar esse efeito de subir o bloco todo
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <LottieView
                source={login_worker}
                speed={1.2}
                autoPlay
                loop
                style={{ width: '100%', height: 250 }}
              />

              {/* O SEGREDO: Remova o justifyContent: 'center' do Styles.js e use padding aqui */}
              <View style={{
                flex: 1,
                paddingHorizontal: 20,
                paddingTop: 20, // Ajuste para a Lottie não colar no topo
                paddingBottom: insets.bottom + 20
              }}>



                {/* Envolvendo os inputs para garantir que subam juntos */}
                <View>
                  <TextInput
                    label="Email"
                    value={this.props.email}
                    returnKeyType="next"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordRef.current?.focus()}
                    mode="outlined"
                    error={!!this.state.emailError}
                    theme={{ colors: { primary: '#000' } }}
                    onChangeText={text => {
                      this.setState({ emailError: '' });

                      if (this.props.onEmailChange) {
                        this.props.onEmailChange(text);
                      }
                    }}
                  />
                  <HelperText type="error" visible={!!this.state.emailError}>
                    {this.state.emailError}
                  </HelperText>

                  <TextInput
                    label="Senha"
                    value={this.props.password}
                    ref={this.passwordRef}
                    secureTextEntry={this.state.iconPassword}
                    mode="outlined"
                    error={!!this.state.passwordError}
                    theme={{ colors: { primary: '#000' } }}
                    right={<TextInput.Icon icon={this.state.icon} onPress={() => this.changeIcon()} />}
                    onChangeText={text => {
                      this.setState({ passwordError: '' });

                      if (this.props.onPasswordChange) {
                        this.props.onPasswordChange(text);
                      }
                    }}
                  />
                  <HelperText type="error" visible={!!this.state.passwordError}>
                    {this.state.passwordError}
                  </HelperText>
                </View>

                <TouchableOpacity
                  style={{ marginBottom: 20, alignItems: 'center' }}
                  onPress={() => NavigationService.navigate('FormForgotPassword')}>
                  <Text>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                {this.renderBtnLogin()}
                <View style={{ height: 10 }} />
                {this.renderBtnGoogle()}

                <TouchableOpacity
                  onPress={() => NavigationService.navigate('FormSignUp')}
                  style={{ marginTop: 'auto', marginBottom: 20 }}
                >
                  <Text style={styles.signUpText}>Não tem uma conta? Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            {/* Barra preta fixa que não é empurrada pelo teclado */}
            {!this.state.isKeyboardVisible && (
              <View style={{ height: insets.bottom, backgroundColor: '#000' }} />
            )}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

export default FormLoginCostumer;