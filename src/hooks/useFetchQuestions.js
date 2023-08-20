import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading", // 'loading', 'error', 'ready', 'active', 'finished'
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
    }
  }
  throw Error("Unknown action: " + action.type);
}

export function useFetchQuestions() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchQuestions = async () => {
        try {            
            const resp = await fetch("http://localhost:3000/questions");
            const data = await resp.json();
            console.log(data);
            dispatch({ type: "dataRecived", payload: data });
        } catch (error) {
            console.error(error)
            dispatch({ type: 'dataFail' })
        }
    };
    fetchQuestions();
  }, []);

  return { questions, status }
}
