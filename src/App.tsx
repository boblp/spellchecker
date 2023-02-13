import { useState, useRef } from 'react'
import axios from 'axios'
import logo from './assets/outdefine_logo.svg'
import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL
  const input = useRef<HTMLInputElement>(null)
  const [formError, setFormError] = useState<Boolean>(false)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [responseError, setResponseError] = useState<String>('')
  const [response, setResponse] = useState<String>('')

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true)
    setResponseError('')
    setResponse('')

    e.preventDefault()

    if (input.current?.value === '') {
      setFormError(true)
      return
    } else {
      setFormError(false)
    }

    axios.get(`${apiUrl}spellcheck/${input.current?.value}`).then(({ data }) => {
      setResponse(JSON.stringify(data, null, 2))
    }).catch((err) => {
      setResponseError(err.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className="App">
      <div className="container">
        <img src={logo} alt="Outdefine Logo" />
        <h1>Take Home Assignment: <span className="highlight">Spellchecker</span></h1>
        <form id="spellcheck-form" onSubmit={handleSubmit}>
          <div className={`form-group word-input ${formError ? 'error' : ''}`}>
            <input type="text" ref={input} />
            { formError && <span className="error-msg">This field is required.</span> }
          </div>
          <input className="btn" type="submit" value="Submit" />
        </form>
        <div id="spellcheck-response">
          <h2>Response:</h2>
          <div className="response">
            { responseError && <h3>{ responseError }</h3> }
            { isLoading ? <h3>Loading...</h3> : <pre>{ response }</pre> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
