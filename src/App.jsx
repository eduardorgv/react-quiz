import { Error, Header, Loader, Main, StartScreen } from "./components"
import { useFetchQuestions } from "./hooks/useFetchQuestions";

function App() {
  const { questions, status } = useFetchQuestions();
  const numQuestions = questions.length;

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  )
}

export default App
