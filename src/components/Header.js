import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gastos: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { gastos } = this.state;
    return (
      <div>
        <p data-testid="email-field">
          Usuário:
          {' '}
          {email}
        </p>
        <p data-testid="total-field">
          Gastos Totais:
          {' '}
          <span data-testid="header-currency-field">BRL</span>
          {' '}
          {gastos}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
