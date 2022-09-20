const FormSelect = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <select
        id={name}
        className='form-select form-select-sm mb-5 bg-gray'
        style={{ background: '#f0f4f8' }}
      >
        <option value='wiuwiu.de'>wiuwiu.de</option>
      </select>
    </div>
  )
}

export default FormSelect
