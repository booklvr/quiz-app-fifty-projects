import React, { useState, useRef, useEffect, Fragment } from 'react'

const QUIZ_DATA = [
  {
    question: 'Which language runs in a web browser?',
    a: 'Java',
    b: 'C',
    c: 'Python',
    d: 'JavaScript',
    correct: 'd',
  },
  {
    question: 'What does CSS stand for?',
    a: 'Central Style Sheets',
    b: 'Cascading Style Sheets',
    c: 'Cascading Simple Sheets',
    d: 'Cars SUVs Sailboats',
    correct: 'b',
  },
  {
    question: 'What does HTML stand for?',
    a: 'Hypertext Markup Language',
    b: 'Hypertext Markdown Language',
    c: 'Hyperloop Machine Language',
    d: 'Helicopters Terminals Motorboats Lamborginis',
    correct: 'a',
  },
  {
    question: 'What year was JavaScript launched?',
    a: '1996',
    b: '1995',
    c: '1994',
    d: 'none of the above',
    correct: 'b',
  },
]

const QuizApp = () => {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [submitAnswer, setSubmitAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const itemEls = useRef(new Array())

  const handleSubmitEvent = (e) => {
    if (submitAnswer) {
      if (QUIZ_DATA[questionIndex].correct === submitAnswer) {
        setScore(() => score + 1)
      }

      if (questionIndex < QUIZ_DATA.length - 1) {
        setQuestionIndex(() => questionIndex + 1)
      } else {
        setGameOver(true)
      }

      setSubmitAnswer('')
    }
  }

  const handleQuestionChoice = (e) => {
    setSubmitAnswer(e.target.value)
  }

  useEffect(() => {
    itemEls.current.forEach((el) => {
      if (el) {
        el.checked = false
      }
    })
  }, [questionIndex])

  return (
    <div className='quiz-container' id='quiz'>
      {gameOver ? (
        <Fragment>
          <h2>
            You answered {score}/{QUIZ_DATA.length} questions correctly
          </h2>
          <button
            onClick={() => {
              setQuestionIndex(0)
              setScore(0)
              setSubmitAnswer('')
              setGameOver(false)
            }}
          >
            Reload
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <div className='quiz-header'>
            <h2 id='question'>{QUIZ_DATA[questionIndex].question}</h2>
            <ul>
              {Object.keys(QUIZ_DATA[questionIndex])
                .slice(1, -1)
                .map((key, index) => (
                  <li key={index}>
                    <input
                      ref={(element) => itemEls.current.push(element)}
                      type='radio'
                      name='answer'
                      value={key}
                      id={QUIZ_DATA[questionIndex][key]}
                      className='answer'
                      onChange={(e) => handleQuestionChoice(e)}
                    />
                    <label htmlFor={key}>{QUIZ_DATA[questionIndex][key]}</label>
                  </li>
                ))}
            </ul>
          </div>
          <button id='submit' onClick={(e) => handleSubmitEvent(e)}>
            Submit
          </button>
        </Fragment>
      )}
    </div>
  )
}

export default QuizApp
