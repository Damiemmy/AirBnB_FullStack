import React from 'react'
import Select from 'react-select'
import useCountries from '@/hooks/useCountries'


const SelectCountry = ({value,onChange}) => {
    const{getAll}=useCountries()
  return (
    <div>
      <Select
        isClearable
        placeholder='Anywhere'
        options={getAll()}
        value={value}
        onChange={(value)=>onChange(value)}
      />
    </div>
  )
}

export default SelectCountry
