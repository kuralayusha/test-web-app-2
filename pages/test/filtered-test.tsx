import useFilters from '../../stores/filtersStore'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import filters from '../filters'

function FilteredTest({ datas }: any) {
  const [questions, setQuestions] = useState<any>([])
  const [optionChosen, setOptionChosen] = useState<any>({})
  const [showScore, setShowScore] = useState<any>(false)
  const [score, setScore] = useState<any>(-1)
  const [loading, setLoading] = useState<any>(true)

  const {
    filters,
    setNumberFilter,
    setCategoryFilter,
    setDifficultyFilter,
    setFiltersDefault,
  } = useFilters((state: any) => state)

  // the old style part

  const myApi = `https://opentdb.com/api.php?amount=${filters.number}${filters.category}${filters.difficulty}&type=multiple`

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch(myApi)
      const data = await res.json()
      const datawithoptions = getOptions(data.results)
      datawithoptions.forEach((q: any) => {
        q.correct_answer = q.correct_answer.replaceAll('&#039;', "'")
        q.incorrect_answers = q.incorrect_answers.map((i: any) =>
          i.replaceAll('&#039;', "'")
        )
        q.question = q.question.replaceAll('&#039;', "'")
      })
      datawithoptions.forEach((q: any) => {
        q.correct_answer = q.correct_answer.replaceAll('&quot;', `"`)
        q.incorrect_answers = q.incorrect_answers.map((i: any) =>
          i.replaceAll('&quot;', `"`)
        )
        q.question = q.question.replaceAll('&quot;', `"`)
      })
      setLoading(false)
      setQuestions(datawithoptions)
      console.log({ datawithoptions })
    }
    getQuestion()
  }, [])

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
        // console.log({options})
        // console.log({randomArr})
        // console.log({question.options})
      }
      return randomArr
    })
    return arr
  }

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
  }

  function handleCheck() {
    setShowScore(true)
    questions.forEach((question: any) => {
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
        }
      })
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  console.log('filtered test page rendered')
  console.log(filters)

  // if u can this is for the sew style (server side rendering)

  // function handleSelectedOption(
  //   optionTitle: any,
  //   question: any,
  //   event: any
  // ) {
  //   optionChosen[question] = optionTitle
  //   setOptionChosen(optionChosen)
  //   const optionsContainer: any = document.getElementById(
  //     question + 'options'
  //   )
  //   const optionsBtns = optionsContainer.childNodes
  //   for (let i = 0; i < optionsBtns.length; i++) {
  //     // console.log(optionsBtns[i].innerHTML, optionTitle)
  //     if (
  //       optionsBtns[i].classList.contains('active') &&
  //       optionsBtns[i].innerHTML !== optionTitle
  //     ) {
  //       optionsBtns[i].classList.remove('active')
  //     } else if (optionsBtns[i].innerHTML === optionTitle) {
  //       optionsBtns[i].classList.add('active')
  //     }
  //   }
  //   // console.log(optionsBtns)
  //   console.log({ optionChosen })
  // }

  // function handleCheck() {
  //   setShowScore(true)
  //   datas.results.forEach((question: any) => {
  //     const givenAnswer = optionChosen[question.question]
  //     const trueAnswer = question.correct_answer
  //     const optionsContainer: any = document.getElementById(
  //       question.question + 'options'
  //     )
  //     const optionsBtns = optionsContainer.childNodes
  //     if (givenAnswer === trueAnswer) {
  //       setScore((oldScore: any) =>
  //         oldScore === -1 ? 1 : oldScore + 1
  //       )
  //     }
  //     optionsBtns.forEach((button: any) => {
  //       if (button.innerHTML === trueAnswer) {
  //         button.classList.remove('active')
  //         button.classList.add('correct')
  //       } else if (button.innerHTML === givenAnswer) {
  //         button.classList.remove('active')
  //         button.classList.add('incorrect')
  //       }
  //     })
  //   })
  // }

  // console.log(datas.results)

  return (
    <div className="questions--container" id="style-1">
      <div className="questions--box">
        {questions.map((q: any) => (
          <div className="questions" key={q.question} id={q.question}>
            <div className="questions--info">
              <h4>Category / {q.category}</h4>
              <h4>Difficulty / {q.difficulty}</h4>
            </div>
            <h3 className="question--title">{q.question}</h3>
            <div className="options" id={q.question + 'options'}>
              <button
                className="start--btn"
                onClick={(event) =>
                  handleSelectedOption(
                    q.options[0],
                    q.question,
                    event
                  )
                }
              >
                {q.options[0]}
              </button>
              <button
                className="start--btn"
                onClick={(event) =>
                  handleSelectedOption(
                    q.options[1],
                    q.question,
                    event
                  )
                }
              >
                {q.options[1]}
              </button>
              <button
                className="start--btn"
                onClick={(event) =>
                  handleSelectedOption(
                    q.options[2],
                    q.question,
                    event
                  )
                }
              >
                {q.options[2]}
              </button>
              <button
                className="start--btn"
                onClick={(event) =>
                  handleSelectedOption(
                    q.options[3],
                    q.question,
                    event
                  )
                }
              >
                {q.options[3]}
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <br />
      <div className="solutions">
        {showScore && (
          <small className="score">
            You scored {score === -1 ? 0 : score}/{filters.number}{' '}
            correct answers
          </small>
        )}
        {showScore ? (
          <Link href="/">
            <button
              className="start--btn"
              // onClick={handleNewGame}
            >
              New Game
            </button>
          </Link>
        ) : (
          <button
            className="start--btn"
            onClick={() => handleCheck()}
          >
            Check Answer
          </button>
        )}
      </div>
    </div>

    // new type rendering
    // <div className="questions--container" id="style-1">
    //   <div className="questions--box">
    //     {datas.results.map((q: any) => (
    //       <div className="questions" key={q.question} id={q.question}>
    //         <div className="questions--info">
    //           <h4>Category / {q.category}</h4>
    //           <h4>Difficulty / {q.difficulty}</h4>
    //         </div>
    //         <h3 className="question--title">{q.question}</h3>
    //         <div className="options" id={q.question + 'options'}>
    //           <button
    //             className="start--btn"
    //             onClick={(event) =>
    //               handleSelectedOption(
    //                 q.options[0],
    //                 q.question,
    //                 event
    //               )
    //             }
    //           >
    //             {q.options[0]}
    //           </button>
    //           <button
    //             className="start--btn"
    //             onClick={(event) =>
    //               handleSelectedOption(
    //                 q.options[1],
    //                 q.question,
    //                 event
    //               )
    //             }
    //           >
    //             {q.options[1]}
    //           </button>
    //           <button
    //             className="start--btn"
    //             onClick={(event) =>
    //               handleSelectedOption(
    //                 q.options[2],
    //                 q.question,
    //                 event
    //               )
    //             }
    //           >
    //             {q.options[2]}
    //           </button>
    //           <button
    //             className="start--btn"
    //             onClick={(event) =>
    //               handleSelectedOption(
    //                 q.options[3],
    //                 q.question,
    //                 event
    //               )
    //             }
    //           >
    //             {q.options[3]}
    //           </button>
    //         </div>
    //         <hr />
    //       </div>
    //     ))}
    //   </div>
    //   <br />
    //   <div className="solutions">
    //     {showScore && (
    //       <small className="score">
    //         You scored {score === -1 ? 0 : score}/
    //         {datas.results.length} correct answers
    //       </small>
    //     )}
    //     {showScore ? (
    //       <Link href="/">
    //         <button
    //           className="start--btn"
    //           // onClick={handleNewGame}
    //         >
    //           New Game
    //         </button>
    //       </Link>
    //     ) : (
    //       <button
    //         className="start--btn"
    //         onClick={() => handleCheck()}
    //       >
    //         Check Answer
    //       </button>
    //     )}
    //   </div>
    // </div>
  )
}

// this is the function that will be rendered on the server

// export async function getServerSideProps() {
//   // fetch data from external API with axios includes category, difficulty, type

//   const res = await axios.get(
//     `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`
//   )

//   const data = await res.data
//   const datawithoptions = getOptions(data.results)
//   function getOptions(arr: any) {
//     arr.forEach((question: any) => {
//       const options = [
//         question.correct_answer,
//         ...question.incorrect_answers,
//       ]
//       let randomArr = []
//       while (options.length > 0) {
//         const randomIndex = Math.floor(Math.random() * options.length)
//         randomArr.push(options[randomIndex])
//         options.splice(randomIndex, 1)
//         question.options = randomArr
//       }
//       return randomArr
//     })
//     return arr
//   }
//   let datas = { ...data, results: datawithoptions }
//   return {
//     props: {
//       datas,
//     },
//   }
// }

export default FilteredTest
