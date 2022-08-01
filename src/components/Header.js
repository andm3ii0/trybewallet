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
    const { email, expenses } = this.props;
    const { gastos } = this.state;
    let gastosValor = 0;
    expenses.map((expense) => expense.value * expense.exchangeRates[expense.currency].ask)
      .forEach((valor) => { gastosValor += valor; });
    return (
      <div>
        <p data-testid="email-field">
          Usuário:
          {' '}
          {email}
        </p>
        <div>
          Gastos Totais:
          {' '}
          <span data-testid="header-currency-field">BRL</span>
          {' '}
          <p data-testid="total-field">{(gastos + gastosValor).toFixed(2)}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
