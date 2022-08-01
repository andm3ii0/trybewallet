import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDespesa } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      valor: '',
      descricao: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  onButtonClick = () => {
    const { addNewExpense, alimentacao } = this.props;
    const { valor, descricao, moeda, pagamento, tag, id } = this.state;
    const newObj = {
      value: valor,
      id,
      currency: moeda,
      method: pagamento,
      tag,
      description: descricao,
    };
    addNewExpense(newObj);
    this.setState((prevState) => ({ id: prevState.id + 1,
      descricao: '',
      valor: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      tag: alimentacao }));
  }

  render() {
    const { currencies, alimentacao } = this.props;
    const { descricao, valor, tag, pagamento, moeda } = this.state;
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
            onChange={ this.onInputChange }
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
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          {' '}
          <select
            name="moeda"
            value={ moeda }
            data-testid="currency-input"
            id="moeda"
            onChange={ this.onInputChange }
          >
            {currencies.map((moedas) => (
              <option
                key={ moedas }
                value={ moedas }
              >
                {moedas}
              </option>))}
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de Pagamento:
          {' '}
          <select
            name="pagamento"
            value={ pagamento }
            data-testid="method-input"
            id="pagamento"
            onChange={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          {' '}
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            id="tag"
            onChange={ this.onInputChange }
          >
            <option value={ alimentacao }>{alimentacao}</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.onButtonClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });
const mapDispatchToProps = (dispatch) => ({
  addNewExpense: (obj) => dispatch(addDespesa('https://economia.awesomeapi.com.br/json/all', obj)),
  alimentacao: 'Alimentação',
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addNewExpense: PropTypes.func.isRequired,
  alimentacao: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
