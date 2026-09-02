import countries from 'world-countries'

const formatedCountries = countries.map ((country)=>({
    value: country.cca2,
    label: country.name.common
}))
const useCountries=()=>{
    const getAll = () =>formatedCountries

    const getByValue=()=>{
        return formatedCountries.find((item)=> item.value === value);
    }
    return{
        getAll,
        getByValue
    }
}

export default useCountries;