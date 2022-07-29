import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { addMoedas } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { addMoedas: addMoedasAction } = this.props;
    addMoedasAction('https://economia.awesomeapi.com.br/json/all');
  }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
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
