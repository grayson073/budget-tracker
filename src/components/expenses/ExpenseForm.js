import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExpenseForm extends Component {

  state = {
    key: '',
    name: '',
    price: ''
  };

  static propTypes = {
    expense: PropTypes.object,
    onCancel: PropTypes.func
  };

  componentDidMount() {
    const { expense } = this.props;
    if(!expense) return;

    this.setState(expense);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };


  render() {
    const { key, name, price } = this.state;
    const { onCancel } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>
        Expense:&nbsp;
            <input name="name" value={name} onChange={this.handleChange}></input>
          </label>
        </p>
        <p>
          <label>
        Amount:&nbsp;
            <input name="price" value={price} type="number" onChange={this.handleChange}></input>
          </label>
        </p>
        <p>
          <button type="submit">{ key ? 'Update' : 'Add' }</button>
          {key && <button type="button" onClick={onCancel}>Cancel</button>}
        </p>
      </form>
    );
  }
}
