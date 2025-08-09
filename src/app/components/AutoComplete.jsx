'use client'
import React, { useCallback, useEffect, useState } from 'react'
import SuggestionList from './SuggestionList';
import { debounce } from 'lodash';
function AutoComplete({ placeholder,
  fetchsuggestion,
  datakey,
  onchange,
  onBlur,
  onFocus, staticdata, customloading }) {
  const [inputvalue, setinputvalue] = useState("");
  const [suggestion, setsuggestion] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  console.log(suggestion);
  const handlechange = (e) => {
    setinputvalue(e.target.value);
  }
  const getsuggestion = async (quesry) => {
    setloading(true);
    seterror(null);
    try {
      let result;
      if (staticdata) {
        result = staticdata.filter((item) => {
          return item.toLowerCase().includes(quesry.toLowerCase());
        });
      } else if (fetchsuggestion) {
        result = await fetchsuggestion(quesry);
      }
      setsuggestion(result);
    } catch (error) {
      seterror("Error occured");
      setsuggestion([]);
    } finally {
      setloading(false);
    }
  }
  const getsuggestionsdebounced = useCallback(debounce(getsuggestion, 300), [])
  const onsuggestionclick = (currsuggestion) => {
    setsuggestion([]);
    setinputvalue(currsuggestion);
  }
  useEffect(() => {
    if (inputvalue.length > 1) {
      getsuggestionsdebounced(inputvalue)
    } else {
      setsuggestion([]);
    }
  }, [inputvalue])
  return (
    <div className='w-full  text-center  mt-5'>
      <input className='border-2 border-black w-1/4 h-[5vh] p-2 text-xl font-medium' type="text" placeholder={placeholder}
        value={inputvalue}
        onChange={(e) => {
          handlechange(e);
        }}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <br />
      {(Array.isArray(suggestion) && suggestion.length > 0 || error || loading) && (
        <div className='w-full flex items-center justify-center m-1'>
          <ul className='bg-gray-100 w-1/2 shadow-xl shadow-gray-400 overflow-y-auto h-[20vh]'>
            {error && (<div>{error}</div>)}
            {loading && (<div>{customloading}</div>)}
            <SuggestionList
              datakey={datakey}
              suggestion={suggestion}
              highlighttext={inputvalue}
              onsuggestionclick={onsuggestionclick}
              setsuggestion={setsuggestion}
            ></SuggestionList>
          </ul>
        </div>
      )}
    </div>
  )
}

export default AutoComplete
