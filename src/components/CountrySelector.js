import React, { useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CountrySelector = ({ country, setCountry }) => {
    const [value, setValue] = useState(null);
    const options = countryList().getData();

    const changeHandler = value => {
        setValue(value);
        setCountry(value.value);
    };
    // ...

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialCountry = searchParams.get('country');

    useEffect(() => {
        if (initialCountry) {
            setValue(options.find(option => option.value === initialCountry));
            setCountry(initialCountry);
        }
    }, [initialCountry, options, setCountry]);

    // ...
    return (
        <Select
            className="navbar-country-select"
            options={options}
            value={value}
            onChange={changeHandler}
            defaultValue={options.find(option => option.value === country)}
            placeholder={country}
            styles={{
                background: 'transparent',
                control: (provided, state) => ({
                    ...provided,
                    width: '200px',
                    borderRadius: '4px',
                    boxShadow: state.isFocused ? '0 0 0 2px #007bff' : 'none',
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#007bff' : 'white',
                    color: state.isSelected ? 'white' : 'black',
                }),
                hover: (provided, state) => ({
                    backgroundColor: '#007bff',
                    color: 'white',
                    cursor: 'pointer',
                }),
            }}
        />
    );
};

export default CountrySelector;
