import { useEffect, useState } from 'react'
import Select from 'react-select'

function App() {
  const [selectOptions, setSelectOptions] = useState([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')

  const getOptions = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const opt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    const res = await fetch(url, opt)
    const json = await res.json()

    // const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    const options = json.map((d) => ({
      value: d.id,
      label: d.name
    }))
    console.log(options)
    setSelectOptions(options)
  }

  const handleChange = (e) => {
    setId(e.value)
    setName(e.label)
  }

  useEffect(() => {
    const callOptions = async () => {
      await getOptions()
      console.log(selectOptions)
    }
    callOptions()
  }, [])

  return (
    <div>
      <Select options={selectOptions} onChange={(e) => handleChange(e)} />
      <p>
        You have selected <strong>{name}</strong> whose id is{' '}
        <strong>{id}</strong>
      </p>
    </div>
  )
}

export default App
