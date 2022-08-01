import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  onDeleteButtonClick = ({ target }) => {
    const { value } = target;
    const { deleteExpenseAction } = this.props;
    console.log(value);
    deleteExpenseAction(parseInt(value, 10));
  }

  render() {
    const { expenses, onEditButtonClick } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.sort((a, b) => {
              if (a.id < b.id) {
                return -1;
              }
              return true;
            }).map((expense, index) => (
              <tr key={ index }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask
                  * expense.value).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    value={ index }
                    data-testid="delete-btn"
                    type="button"
                    onClick={ this.onDeleteButtonClick }
                  >
                    Deletar
                  </button>
                  <button
                    value={ index }
                    data-testid="edit-btn"
                    type="button"
                    onClick={ onEditButtonClick }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (index) => dispatch(deleteExpense(index)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseAction: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
