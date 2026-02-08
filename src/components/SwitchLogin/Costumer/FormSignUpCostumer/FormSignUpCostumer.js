import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { styleinput } from '../../../../../styles';
import { create_user_costumer } from '../../../../assets';
import {
  createUserCostumer,
  modifyEmail,
  modifyName,
  modifyPassword,
} from '../../../../store/actions/userCostumerActions';
import { AndroidBottomBar } from '../../../common';
import styles from './Styles';

class FormSignUpCostumer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: 'eye-off',
      iconPassword: true,
      nameError: '',
      emailError: '',
      passwordError: '',
    };

    this.btnRegisterRef = React.createRef();
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      iconPassword: !prevState.iconPassword,
    }));
  }

  renderBtnRegister() {
    /*if (this.props.registrationInProgress) {
      return <ActivityIndicator size="large" color={colors.PRIMARY} />;
    }*/
    return (
      <Button
        ref={this.btnRegisterRef}
        mode="contained"
        icon="account-plus"
        style={styles.button}
        onPress={this.handleSubmit}>
        Cadastrar
      </Button>
    );
  }

  validateFields() {
    let isValid = true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.props.name || this.props.name.length < 3) {
      this.setState({ nameError: 'O nome deve ter pelo menos 3 caracteres!' });
      isValid = false;
    }

    if (!this.props.email || !this.props.email.includes('@')) {
      this.setState({ emailError: 'Digite um e-mail válido!' });
      isValid = false;
    } else if (!regex.test(this.props.email)) {
      this.setState({ emailError: 'Formato de e-mail inválido!' });
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
      //this.props.onCreateUser(this.props);
      console.log("Cadastro realizado com sucesso");
    }
  };

  render() {
    return (
      <AndroidBottomBar barColor="#000" backgroundColor="#FFF">
        {(insets) => (
          <View style={{ flex: 1, paddingBottom: insets.bottom + 20 }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80}
              style={{ flex: 1 }}>
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <View style={styles.container}>
                  <LottieView
                    source={create_user_costumer}
                    autoPlay
                    loop
                    style={{ width: '100%', height: 250 }}
                  />
                  <TextInput
                    autoFocus
                    ref={this.nameRef}
                    label="Nome"
                    returnKeyType="next"
                    onSubmitEditing={() => this.emailRef.current?.focus()}
                    style={styles.input}
                    value={this.props.name}
                    textColor="#000"
                    error={!!this.state.nameError}
                    onChangeText={text => {
                      this.setState({ nameError: '' });
                      this.props.onModifyName(text);
                    }}
                    mode="outlined"
                    theme={{
                      colors: { primary: '#000000', onSurfaceVariant: '#999999' },
                    }}
                  />
                  <HelperText style={styleinput.helperText} type="error" visible={!!this.state.nameError}>{this.state.nameError}</HelperText>
                  <TextInput
                    ref={this.emailRef}
                    label="Email"
                    returnKeyType="next"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordRef.current?.focus()}
                    style={styles.input}
                    value={this.props.email}
                    textColor="#000"
                    error={!!this.state.emailError}
                    onChangeText={text => {
                      this.setState({ emailError: '' });
                      this.props.onModifyEmail(text);
                    }}
                    mode="outlined"
                    theme={{
                      colors: { primary: '#000000', onSurfaceVariant: '#999999' },
                    }}
                  />
                  <HelperText style={styleinput.helperText} type="error" visible={!!this.state.emailError}>{this.state.emailError}</HelperText>
                  <TextInput
                    ref={this.passwordRef}
                    label="Senha"
                    returnKeyType="go"
                    style={styles.input}
                    onSubmitEditing={this.handleSubmit}
                    value={this.props.password}
                    textColor="#000"
                    onChangeText={text => {
                      this.setState({ passwordError: '' });
                      this.props.onModifyPassword(text);
                    }}
                    mode="outlined"
                    error={!!this.state.passwordError}
                    theme={{
                      colors: { primary: '#000000', onSurfaceVariant: '#999999' },
                    }}
                    secureTextEntry={this.state.iconPassword}
                    right={
                      <TextInput.Icon
                        icon={this.state.icon}
                        onPress={() => this.changeIcon()}
                      />
                    }
                  />
                  <HelperText style={[styleinput.helperText, { marginBottom: 10 }]} type="error" visible={!!this.state.passwordError}>{this.state.passwordError}</HelperText>
                  {this.renderBtnRegister()}
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        )
        }
      </AndroidBottomBar>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onModifyName: name => dispatch(modifyName(name)),
  onModifyEmail: email => dispatch(modifyEmail(email)),
  onModifyPassword: password => dispatch(modifyPassword(password)),
  onCreateUser: user => dispatch(createUserCostumer(user)),
});

const mapStateToProps = state => ({
  //registrationInProgress: state.userReducer.registrationInProgress,
  name: state.userCostumerReducer.name,
  email: state.userCostumerReducer.email,
  password: state.userCostumerReducer.password,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSignUpCostumer);
