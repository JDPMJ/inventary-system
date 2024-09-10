import { ChangeEvent, useState } from "react"

const NumberInput = () => {
  const [value, setValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value
      inputValue = inputValue.replace(/\./g, '').replace(/,/g, '.')
      if (!isNaN(parseFloat(inputValue)) && inputValue !== '') {
          let parts = inputValue.split('.')
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
          setValue(parts.join(','))
      } else {
          setValue(inputValue)
      }
  }

  return (
    <input
      type="text"
      value={value}
      className="form-control"
      onChange={handleChange}
      placeholder="Ingresa un número"
    />
  )
}

export default NumberInput