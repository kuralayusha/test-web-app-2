import Link from 'next/link'
import useGameFilters from '../stores/gameModeStore'

function Home() {
  const { gameFilters, setGameFiltersTrue, setGameFiltersFalse } =
    useGameFilters((state: any) => state)

  console.log('home page rendered')
  console.log('gameFilters', gameFilters)
  return (
    <div>
      <Link
        href={{
          pathname: '/test/quick-test',
        }}
      >
        <button
          onClick={() => {
            setGameFiltersFalse()
          }}
        >
          quickGame
        </button>
      </Link>
      <Link href="/filters">
        <button
          onClick={() => {
            setGameFiltersTrue()
          }}
        >
          filters
        </button>
      </Link>
    </div>
  )
}

export default Home
