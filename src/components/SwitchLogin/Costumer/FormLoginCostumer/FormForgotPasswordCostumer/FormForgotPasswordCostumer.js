import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { forgot_password } from '../../../../../assets';
import {
  modifyEmail
} from '../../../../../store/actions/userCostumerActions';
import { AndroidBottomBar } from '../../../../common';
import styles from '../Styles';

class FormForgotPasswordCostumer extends Component {
  constructor(props) {
    super(props);

    this.emailRef = React.createRef();
    this.state = {
      emailError: '',
    };
  }

  renderBtnRegister() {
    /*if (this.props.forgotPasswordInProgress) {
      return <ActivityIndicator size="large" color={colors.PRIMARY} />;
    }*/
    return (
      <Button
        mode="contained"
        style={styles.button}
        icon="email"
        onPress={this.handleSubmit}>
        Enviar Instruções de Redefinição
      </Button>
    );
  }

  validateFields() {
    let isValid = true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.props.email) {
      this.setState({ emailError: 'Email inválido!' });
      isValid = false;
    } else if (!regex.test(this.props.email)) {
      this.setState({ emailError: 'Formato de email inválido!' });
      isValid = false;
    }

    return isValid;
  }

  handleSubmit = () => {
    if (this.validateFields()) {
      //this.props.onForgotPassword(this.props.email);
      console.log("Email enviado para redefinição de senha");
    }
  };

  render() {
    return (
      <AndroidBottomBar barColor="#000" backgroundColor="#FFF">
        {(insets) => (
          <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: insets.bottom + 20 }}>
            <LottieView
              source={forgot_password}
              autoPlay
              loop
              style={{
                width: '100%',
                height: 200,
              }}
            />
            <TextInput
              label="Email"
              returnKeyType="go"
              keyboardType="email-address"
              onSubmitEditing={this.handleSubmit}
              style={styles.input}
              value={this.props.email}
              textColor="#000"
              onChangeText={text => {
                this.setState({ emailError: '' });
                this.props.onModifyEmail(text);
              }}
              mode="outlined"
              theme={{
                colors: { primary: '#000000', onSurfaceVariant: '#999999' },
              }}
              error={!!this.state.emailError}
            />
            <HelperText type="error" visible={!!this.state.emailError}>
              {this.state.emailError}
            </HelperText>
            {this.renderBtnRegister()}
          </View>

        )}
      </AndroidBottomBar>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onModifyEmail: email => dispatch(modifyEmail(email)),
});

const mapStateToProps = state => ({
  email: state.userCostumerReducer.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormForgotPasswordCostumer);
