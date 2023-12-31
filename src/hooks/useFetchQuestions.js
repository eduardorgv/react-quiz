import { useEffect, useReducer } from "react";

export const initialState = {
  questions: [],
  status: "loading", // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

const SECS_PER_QUESTION = 30;

export function reducer(state, action) {
  switch (action.type) {
    case "dataRecived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    };
    case "dataFail": {
        return {
          ...state,
          status: 'error'
        }
    };
    case "start": {
      return {
        ...state, 
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      }
    };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points
      }
    };
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    };
    case "finish": {
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore 
          ? state.points
          : state.highscore
      }
    };
    case "restart": {
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready'
      }
    };
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 
          ? 'finished' 
          : state.status
      }

    };
  }
  throw Error("Unknown action: " + action.type);
}
