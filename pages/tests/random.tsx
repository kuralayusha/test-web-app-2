import React from 'react'
import { useState } from 'react'
import useGameFilters from '../../stores/gameModeStore'
import useQuestionsData from '../../stores/allQuestionsDataStore'
import axios from 'axios'
import Link from 'next/link'
// import the css file

function QuickTest({ datas }: any) {
  const [questions, setQuestions] = useState<any>([])
  const [optionChosen, setOptionChosen] = useState<any>({})
  const [showScore, setShowScore] = useState<any>(false)
  const [score, setScore] = useState<any>(-1)
  const [loading, setLoading] = useState<any>(true)

  function handleSelectedOption(
    optionTitle: any,
    question: any,
    event: any
  ) {
    optionChosen[question] = optionTitle
    setOptionChosen(optionChosen)
    const optionsContainer: any = document.getElementById(
      question + 'options'
    )
    const optionsBtns = optionsContainer.childNodes
    for (let i = 0; i < optionsBtns.length; i++) {
      // console.log(optionsBtns[i].innerHTML, optionTitle)
      if (
        optionsBtns[i].classList.contains('active') &&
        optionsBtns[i].innerHTML !== optionTitle
      ) {
        optionsBtns[i].classList.remove('active')
      } else if (optionsBtns[i].innerHTML === optionTitle) {
        optionsBtns[i].classList.add('active')
      }
    }
    // console.log(optionsBtns)
    console.log({ optionChosen })
  }

  function handleCheck() {
    setShowScore(true)
    datas.results.forEach((question: any) => {
      const givenAnswer = optionChosen[question.question]
      const trueAnswer = question.correct_answer
      const optionsContainer: any = document.getElementById(
        question.question + 'options'
      )
      const optionsBtns = optionsContainer.childNodes
      if (givenAnswer === trueAnswer) {
        setScore((oldScore: any) =>
          oldScore === -1 ? 1 : oldScore + 1
        )
      }
      optionsBtns.forEach((button: any) => {
        if (button.innerHTML === trueAnswer) {
          button.classList.remove('active')
          button.classList.add('correct')
        } else if (button.innerHTML === givenAnswer) {
          button.classList.remove('active')
          button.classList.add('incorrect')
        } else {
          button.classList.add('disabled')
        }
      })
    })
  }

  console.log(datas.results)
  console.log('quick test page rendered')
  return (
    <div className="questions--container" id="style-1">
      {datas.results.map((q: any) => (
        <div className="questionBox" key={q.question} id={q.question}>
          <h3 className="question--title">{q.question}</h3>
          <div className="options" id={q.question + 'options'}>
            <button
              className="option--btn"
              onClick={(event) =>
                handleSelectedOption(q.options[0], q.question, event)
              }
            >
              {q.options[0]}
            </button>
            <button
              className="option--btn"
              onClick={(event) =>
                handleSelectedOption(q.options[1], q.question, event)
              }
            >
              {q.options[1]}
            </button>
            <button
              className="option--btn"
              onClick={(event) =>
                handleSelectedOption(q.options[2], q.question, event)
              }
            >
              {q.options[2]}
            </button>
            <button
              className="option--btn"
              onClick={(event) =>
                handleSelectedOption(q.options[3], q.question, event)
              }
            >
              {q.options[3]}
            </button>
          </div>
          <hr />
        </div>
      ))}
      <br />
      <div className="footer">
        {showScore && (
          <small className="score">
            You scored {score === -1 ? 0 : score}/
            {datas.results.length} correct answers
          </small>
        )}
        {showScore ? (
          <Link href="/">
            <button
              className="starter--btn"
              // onClick={handleNewGame}
            >
              New Game
            </button>
          </Link>
        ) : (
          <button
            className="starter--btn"
            onClick={() => handleCheck()}
          >
            Check Answer
          </button>
        )}
      </div>
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
