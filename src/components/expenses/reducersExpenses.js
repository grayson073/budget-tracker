import { CATEGORY_LOAD, CATEGORY_ADD } from '../categories/reducers';
export const EXPENSE_ADD = 'EXPENSE_ADD';
export const EXPENSE_UPDATE = 'EXPENSE_UPDATE';
export const EXPENSE_REMOVE = 'EXPENSE_REMOVE';

export const getExpenses = state => state.expenses;
export const getExpensesById = (categoryKey, state) => getExpenses(state)[categoryKey];

export function expenses(state = [], { type, payload }) {
  switch(type) {
    case CATEGORY_LOAD:
      return payload.reduce((map, category) => {
        map[category.key] = category.expenses;
        return map;
      }, {});
    case CATEGORY_ADD: {
      return {
        ...state,
        [payload.key]: []
      };
    }
    case EXPENSE_ADD:
      console.log('PAYLOAD', payload);
      console.log('STATE', state);

      return {
        ...state,
        [payload.categoryId]: [
          ...state[payload.categoryId],
          payload
        ]
      };
    case EXPENSE_UPDATE:
      return {
        ...state,
        [payload.categoryId]: state[payload.categoryId].map(expense => expense.key === payload.key ? payload : expense)
      };

    case EXPENSE_REMOVE:
      return {
        ...state,
        [payload.categoryId]: state[payload.categoryId].filter(expense => expense.key !== payload.key)
      };
    default:
      return state;
  }
}
