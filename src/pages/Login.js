import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      buttonDisabled: true,
      passwordValidation: false,
      emailValidation: false,
      loggedIn: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const qtdCaracteresSenha = 6;

    if (name === 'email') {
      if (value.includes('@')
      && value.includes('.com')) {
        this.setState({ emailValidation: true });
      } else {
        this.setState({ emailValidation: false });
      }
    }
    if (name === 'senha') {
      if (value.length >= qtdCaracteresSenha) {
        this.setState({ passwordValidation: true });
      } else {
        this.setState({ passwordValidation: false });
      }
    }

    this.setState((prevState) => ({ [name]: value,
      buttonDisabled: !(prevState.passwordValidation && prevState.emailValidation) }));
  }

  onButtonClick = () => {
    const { addEmail: addEmailAction } = this.props;
    const { email } = this.state;
    this.setState({ loggedIn: true });
    addEmailAction(email);
  }

  render() {
    const { email, senha, buttonDisabled, loggedIn } = this.state;
    return (
      <div className="login">
        <p className="loginTitle">Tybe Wallet</p>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            id="email"
            name="email"
            placeholder="Digite seu E-mail"
            value={ email }
            type="email"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="senha">
          <input
            data-testid="password-input"
            id="senha"
            name="senha"
            placeholder="Digite sua Senha"
            value={ senha }
            type="password"
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.onButtonClick }
        >
          Entrar
        </button>
        {loggedIn && <Redirect to="/carteira" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
