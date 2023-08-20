import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading", // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
};

function reducer(state, action) {
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
        status: "active"
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
    }
  }
  throw Error("Unknown action: " + action.type);
}

export function useFetchQuestions() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchQuestions = async () => {
        try {            
            const resp = await fetch("http://localhost:3000/questions");
            const data = await resp.json();
            dispatch({ type: "dataRecived", payload: data });
        } catch (error) {
            console.error(error)
            dispatch({ type: 'dataFail' })
        }
    };
    fetchQuestions();
  }, []);

  return { questions, status, index, answer, points, highscore, dispatch }
}
