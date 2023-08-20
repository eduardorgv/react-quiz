import { useReducer } from "react";

const MINIMUM_DEPOSIT_AMOUNT = 500;
const DEPOSIT_AMOUNT = 150;
const WITHDRAW_AMOUNT = 50;
const LOAN_AMOUNT = 5000;

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "openAccount": {
            return {
                ...state,
                isActive: true,
                balance: MINIMUM_DEPOSIT_AMOUNT
            }
        };
        case "closeAccount": {
            return {
                ...initialState
            }
        };
        case "deposit": {
            return {
                ...state,
                balance: state.balance + action.payload
            }
        };
        case "withdraw": {
            return {
                ...state,
                balance: state.balance - action.payload
            }
        };
        case "requestLoan": {
            const loanRequested = state.loan === 0;

            return {
                ...state,
                balance: loanRequested
                    ? state.balance + action.payload
                    : state.balance,
                loan: loanRequested 
                    ? action.payload 
                    : state.loan
            }
        };
        case "payLoan": {
            const loanRequested = state.loan === 0;

            return {
                ...state,
                balance: loanRequested
                    ? state.balance
                    : state.balance - action.payload,
                loan: loanRequested
                    ? state.loan
                    : 0
            }
        }
    }
    throw Error("Unknown action: " + action.type);
}

export const BankAccount = () => {
  const [{ balance, loan, isActive }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App" style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({ type: 'openAccount' })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'deposit', payload: DEPOSIT_AMOUNT })} disabled={!isActive}>
          Deposit { DEPOSIT_AMOUNT }
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "withdraw", payload: WITHDRAW_AMOUNT })} disabled={!isActive}>
          Withdraw { WITHDRAW_AMOUNT }
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'requestLoan', payload: LOAN_AMOUNT })} disabled={!isActive}>
          Request a loan of { LOAN_AMOUNT }
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'payLoan', payload: LOAN_AMOUNT })} disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: 'closeAccount' })} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
};
