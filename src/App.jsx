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
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
}

export default App;
