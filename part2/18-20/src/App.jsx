import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const FindCountries = ({value, onChangeFilter}) => (
    <div>
        Find countries: <input value={value} onChange={onChangeFilter} />
    </div>
)

const CountriesList = ({data, onClickShow}) => {

    if (data.length === 1) {
        return (
            <CountryData country={data[0]}/>
        )
    }

    if (data.length === 0) {
        return (
            <p>No matches found. Try another filter.</p>
        )
    }

    if (data.length > 5) {
        return (
            <p>Too many matches. Specify another filter.</p>
        )
    }

    return (
        <div>
            {data.map((country) => <p key={country.name.common}>{country.name.common} <button onClick={() => onClickShow(country.name.common)}>Show</button></p>)}
        </div>
    )
}

const CountryData = ({country}) => {
    const Languages = ({list}) => {
        return (
            <div>
                <h3>Languages</h3>
                <ul>
                    {list.map((language) => <li key={language}>{language}</li>)}
                </ul>
            </div>
            
            
        )
    }
    return (
        <div>
            <h1>{country.name.common}</h1>
            <img src={country.flags.png} alt={country.flags.alt} />
            <p><b>Capital: </b>{country.capital}</p>
            <p><b>Region: </b>{country.region}</p>
            <p><b>Area: </b>{country.area}</p>
            <p><b>Population: </b>{country.population}</p>
            <Languages list={Object.values(country.languages)} />
        </div>
    )
}

function App() {
    const [filter, setFilter] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios.get(baseUrl)
        .then(response => {
            setCountries(response.data)
            // setFilteredContacts(response.data)
        })
    }, [])

    const handleFilterChange = (event) => {
        const filterValue = event.target.value
        setFilter(filterValue)
        setFilteredCountries(filterValue === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase())))
    }

    const handleOnClickShow = (countryName) => {
        setFilter(countryName)
        setFilteredCountries(countries.filter(country => country.name.common.includes(countryName)))
    }

    return (
        <div>

            <FindCountries value={filter} onChangeFilter={handleFilterChange} />
            <CountriesList data={filteredCountries} onClickShow={handleOnClickShow}/>

        </div>
    )
}

export default App
