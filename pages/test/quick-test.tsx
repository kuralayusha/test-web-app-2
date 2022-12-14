import React from 'react'
import useGameFilters from '../../stores/gameMode'
import useQuestionsData from '../../stores/AllQuestionsData'
import axios from 'axios'

function QuickTest({ datas }: any) {
  console.log(datas.results)
  console.log('quick test page rendered')
  return (
    <div className="questions--container" id="style-1">
      <div className="questions--box">
        {datas.results.map((q: any) => (
          <div className="questions" key={q.question} id={q.question}>
            <div className="questions--info">
              <h4>Category / {q.category}</h4>
              <h4>Difficulty / {q.difficulty}</h4>
            </div>
            <h3 className="question--title">{q.question}</h3>
            <div className="options" id={q.question + 'options'}>
              <button
                className="start--btn"
                // onClick={(event) =>
                //   handleSelectedOption(q.options[0], q.question, event)
                // }
              >
                {q.options[0]}
              </button>
              <button
                className="start--btn"
                // onClick={(event) =>
                //   handleSelectedOption(q.options[1], q.question, event)
                // }
              >
                {q.options[1]}
              </button>
              <button
                className="start--btn"
                // onClick={(event) =>
                //   handleSelectedOption(q.options[2], q.question, event)
                // }
              >
                {q.options[2]}
              </button>
              <button
                className="start--btn"
                // onClick={(event) =>
                //   handleSelectedOption(q.options[3], q.question, event)
                // }
              >
                {q.options[3]}
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <br />
      {/* <div className="solutions">
        {showScore && (
          <small className="score">
            You scored {score === -1 ? 0 : score}/{data.number}{' '}
            correct answers
          </small>
        )}
        {showScore ? (
          <button className="start--btn" onClick={handleNewGame}>
            New Game
          </button>
        ) : (
          <button
            className="start--btn"
            onClick={() => handleCheck()}
          >
            Check Answer
          </button>
        )}
      </div> */}
    </div>
  )
}

export async function getServerSideProps() {
  // fetch data from external API
  const res = await axios.get(
    `https://opentdb.com/api.php?amount=10&type=multiple`
  )
  const data = await res.data
  const datawithoptions = getOptions(data.results)
  function getOptions(arr: any) {
    arr.forEach((question: any) => {
      const options = [
        question.correct_answer,
        ...question.incorrect_answers,
      ]
      let randomArr = []
      while (options.length > 0) {
        const randomIndex = Math.floor(Math.random() * options.length)
        randomArr.push(options[randomIndex])
        options.splice(randomIndex, 1)
        question.options = randomArr
      }
      return randomArr
    })
    return arr
  }
  let datas = { ...data, results: datawithoptions }
  return {
    props: {
      datas,
    },
  }
}

export default QuickTest
