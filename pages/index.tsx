import Link from 'next/link'
import useGameFilters from '../stores/gameModeStore'

function Home() {
  const { gameFilters, setGameFiltersTrue, setGameFiltersFalse } =
    useGameFilters((state: any) => state)

  console.log('home page rendered')
  console.log('gameFilters', gameFilters)
  return (
    <div className="home--container">
      <h1>Welcome to my test web</h1>
      <ul>
        <li>
          Hi there! On this website you can have fun with questions
          that can improve your general knowledge.
        </li>
        <li>There are two game modes: quick game and filtered.</li>
        <li>
          Quick game is a game that has random category, random
          difficulty and 10 questions.
        </li>
        <li>
          Filtered is a game where you can choose the number of
          questions, the category of the questions and the difficulty
          of the questions. İf you don't choose any of them, the game
          will be randomised.
        </li>
      </ul>
      <button
        className="starter--btn"
        onClick={() => {
          setGameFiltersFalse()
        }}
      >
        <Link
          className="button--link"
          href={{
            pathname: '/test/quick-test',
          }}
        >
          Quick Test
        </Link>
      </button>
      <button
        className="starter--btn"
        onClick={() => {
          setGameFiltersTrue()
        }}
      >
        <Link className="button--link" href="/filters">
          Filter Settings
        </Link>
      </button>
    </div>
  )
}

export default Home
