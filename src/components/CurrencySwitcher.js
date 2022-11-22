import React from "react";
import "./CurrencySwitcher.css";

// Importing connect to map the state to props
import { connect } from "react-redux";

// Importing actions
import { selectCurrency } from "../actions";
import { toggleCurrency } from "../actions";

// Importing constants
import { GET_CURRENCIES } from "../queries";

// Importing the initialized function for querying
import queryFetch from "../api/queryFetch";

class CurrencySwitcher extends React.Component {
  state = { data: null };

  componentDidMount = async () => {
    const result = await queryFetch(GET_CURRENCIES);
    this.setState({ data: result.data });
  };

  renderCurrencies = () => {
    if (!this.state.data) return;
    return this.state.data.currencies.map((currency, id) => {
      return (
        <div
          className="currency-block"
          key={id}
          onClick={() => {
            this.props.selectCurrency(currency.symbol);
            this.props.toggleCurrency(false);
          }}
        >
          <div>{currency.symbol}</div>
          <div>{currency.label}</div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="curr">
        <div
          className={`currency-switcher ${
            this.props.currencyOpen ? "active" : ""
          }`}
        >
          {this.renderCurrencies()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    currencyOpen: state.currencyOpen,
  };
};

export default connect(mapStateToProps, { selectCurrency, toggleCurrency })(
  CurrencySwitcher
);
