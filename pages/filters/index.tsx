import Link from 'next/link'

function filters() {
  console.log('filters page rendered')
  return (
    <div>
      <h1>Filters page</h1>
      <Link href="./test/filtered-test">
        <button>start test</button>
      </Link>
    </div>
  )
}

export default filters
