import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      descricao: '',
      valor: 0,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  render() {
    const { currencies } = this.props;
    const { descricao, valor } = this.state;
    console.log(currencies);
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          {' '}
          <input
            data-testid="value-input"
            id="valor"
            name="valor"
            value={ valor }
            type="number"
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          {' '}
          <input
            data-testid="description-input"
            id="descricao"
            name="descricao"
            value={ descricao }
            type="text"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          {' '}
          <select data-testid="currency-input">
            {currencies.map((moeda) => (
              <option
                key={ moeda }
                value={ moeda }
              >
                {moeda}
              </option>))}
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de Pagamento:
          {' '}
          <select data-testid="method-input" id="pagamento">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          {' '}
          <select data-testid="tag-input" id="tag">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
