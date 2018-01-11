import React, { Component } from 'react';
import './CurrencyWidget.css';

const API = 'https://api.fixer.io/latest';

class CurrencyWidget extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pairs: [
        {
          from: 'USD',
          to: 'EUR'
        },
        {
          from: 'EUR',
          to: 'DKK'
        }
      ],
      activePairIndex: 0,
      rates: {},
      amount: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.getCurrencyByPairIndex(this.state.activePairIndex);
  }

  handleChange(event) {
    this.setState({activePairIndex: event.target.value});
    this.getCurrencyByPairIndex(event.target.value);
  }

  handleInput(event) {
    this.setState({amount: event.target.value});
  }

  getCurrencyByPairIndex(index) {
    let query = `${API}?base=${this.state.pairs[index].from}&symbols=${this.state.pairs[index].to}`;
    fetch(query).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({rates: data.rates});
    });
  }

  render() {
    const select = (
      <select onChange={ this.handleChange } value={ this.state.activePairIndex }>
        { this.state.pairs.map((item, index) => {
          return (<option value={ index } key={ index }>{ item.from }/{item.to}</option>);
        }) }
      </select>
    );
    const input = (
      <input onChange={ this.handleInput }
             value={ this.state.amount }
             placeholder="Please type an amount.."
             type="number"
             step="0.01"
             min="0.01"/>);

    const rate = this.state.rates[this.state.pairs[this.state.activePairIndex].to];
    const result = rate ? (rate * this.state.amount).toFixed(2) : 0;

    return (
      <div className="CurrencyWidget">
        <header className="CurrencyWidget-header">
          <h1 className="CurrencyWidget-title">Currency Widget</h1>
        </header>
        <div className="CurrencyWidget-content">
          <div>{ select }</div>
          <div>{ input }</div>
          <div>{ result }</div>
        </div>
      </div>
    );
  }
}

export default CurrencyWidget;
