import {
  Error,
  FinishedScreen,
  Header,
  Loader,
  Main,
  NextButton,
  Progress,
  Question,
  StartScreen,
  Timer,
} from "./components";
import { useFetchQuestions } from "./hooks/useFetchQuestions";

function App() {
  const { questions, status, index, answer, points, highscore, secondsRemaining, dispatch } = useFetchQuestions();
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress 
              index={index} 
              numQuestions={numQuestions} 
              points={points} 
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              questionObj={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton 
                dispatch={dispatch} 
                answer={answer} 
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}
        {status === 'finished' && (
          <FinishedScreen 
            points={points} 
            maxPossiblePoints={maxPossiblePoints} 
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
