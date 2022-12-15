import Link from 'next/link'
import useGameFilters from '../stores/gameModeStore'

function Home() {
  const { gameFilters, setGameFiltersTrue, setGameFiltersFalse } =
    useGameFilters((state: any) => state)

  console.log('home page rendered')
  console.log('gameFilters', gameFilters)
  return (
    <div className="home--container">
      <h1>Welcome !</h1>
      <ul>
        <li>
          Hi there! On this website you can have fun with questions
          that can improve your general knowledge.
        </li>
        <li>
          There are two test modes: Quick Tests and Filtered Tests.
        </li>
        <li>
          Quick test has random category, random difficulty and 10
          questions.
        </li>
        <li>
          Filtered is a test type where you can choose the number of
          questions, the category and the difficulty. If you don't
          choose any of them, the test will be randomised.
        </li>
      </ul>
      <div className="home--btns">
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
    </div>
  )
}

export default Home
