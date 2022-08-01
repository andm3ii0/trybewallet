import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { addMoedas } from '../redux/actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      edit: '0',
    };
  }

  componentDidMount() {
    const { addMoedas: addMoedasAction } = this.props;
    addMoedasAction('https://economia.awesomeapi.com.br/json/all');
  }

  onEditButtonClick = ({ target }) => {
    const { value } = target;
    this.setState({ editing: true, edit: value });
  }

  editFalse = () => {
    this.setState({ editing: false });
  }

  render() {
    const { editing, edit } = this.state;
    return (
      <div>
        <Header />
        <WalletForm editing={ editing } editId={ edit } editFalse={ this.editFalse } />
        <Table onEditButtonClick={ this.onEditButtonClick } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addMoedas: (endPoint) => dispatch(addMoedas(endPoint)),
});

Wallet.propTypes = {
  addMoedas: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
