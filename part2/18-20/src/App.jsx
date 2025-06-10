import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const FindCountries = ({value, onChangeFilter}) => (
    <div>
        Find countries: <input value={value} onChange={onChangeFilter} />
    </div>
)

const CountriesList = ({data, onClickShow, weather}) => {
    if (data.length === 1) {
        return <CountryData country={data[0]} weather={weather} />
    }
    if (data.length === 0) {
        return <p>No matches found. Try another filter.</p>
    }
    if (data.length > 5) {
        return <p>Too many matches. Specify another filter.</p>
    }
    return (
        <div>
            {data.map((country) => <p key={country.name.common}>{country.name.common} <button onClick={() => onClickShow(country.name.common)}>Show</button></p>)}
        </div>
    )
}

const CountryData = ({country, weather}) => {
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
            <h2>Weather in {country.capital}</h2>
            {weather &&
                <>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
                <p><b>Temperature: </b>{weather.main.temp}° Celsius</p>
                <p><b>Wind: </b>{weather.wind.speed} m/s</p>
                </>
            }
        </div>
    )
}

function App() {
    const [filter, setFilter] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])
    const [countries, setCountries] = useState([])
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios.get(baseUrl)
        .then(response => {
            setCountries(response.data)
        })
    }, [])

    useEffect(() => {
        if (filteredCountries.length === 1) {
            const country = filteredCountries[0]
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
        }
    }, [filteredCountries])

    const handleFilterChange = (event) => {
        const filterValue = event.target.value
        setFilter(filterValue)
        setFilteredCountries(filterValue === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase())))
    }

    const handleOnClickShow = (countryName) => {
        setFilteredCountries(countries.filter(country => country.name.common.includes(countryName)))
    }

    return (
        <div>
            <FindCountries value={filter} onChangeFilter={handleFilterChange} />
            <CountriesList data={filteredCountries} onClickShow={handleOnClickShow} weather={weather}/>
        </div>
    )
}

export default App