'use client'
import React from 'react'
import AutoComplete from './components/AutoComplete'
function page() {
  // const staticData = [
  //   "apple",
  //   "banana",
  //   "berrl",
  //   "orange",
  //   "grape",
  //   "mango",
  //   "melon",
  //   "berry",
  //   "peach",
  //   "cherry",
  //   "plum",
  // ];
  const fetchsuggestion = async (query) => {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    if (!response.ok) {
      throw new Error("Network error occurred");
    }
    const result = await response.json();
    return result.recipes;
  }
  return (
    <>
      <h1 className='text-5xl font-bold text-black flex items-center justify-center m-3'>AutoSuggestion/TypeAhead</h1>
      <AutoComplete
        placeholder={"Enter recepie"}
        fetchsuggestion={fetchsuggestion}
        datakey={"name"}
        onchange={(input) => { }}
        onBlur={(e) => { }}
        onFocus={(e) => { }}
        // staticdata={staticdata}
        customloading={<>Loading...</>}
      ></AutoComplete>
    </>
  )
}

export default page
