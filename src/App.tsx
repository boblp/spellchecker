import { useState, useRef } from 'react'
import logo from './assets/outdefine_logo.svg'
import './App.css'

function App() {
  const input = useRef<HTMLInputElement>(null)
  const [formError, setFormError] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (input.current?.value === '') {
      setFormError(true)
    } else {
      setFormError(false)
    }
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
            <pre>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
