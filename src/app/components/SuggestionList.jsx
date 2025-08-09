'use client'
import React from 'react'

function SuggestionList({ datakey, suggestion, highlighttext, onsuggestionclick, setsuggestion }) {
  const gethighlight = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return parts.map((val, index) => {
      return (<span key={index}>
        {val.toLowerCase() === highlight.toLowerCase() ? <b>{val}</b> : val}
      </span>)
    })
  }
  return (
    <div >
      {suggestion.map((Item, index) => {
        const curritem = datakey ? Item[datakey] : Item;
        return <li className='bg-gray-200 m-1 rounded text-lg font-medium hover:bg-green-100' key={index}
          onClick={() => {
            setsuggestion([]);
            onsuggestionclick(curritem);
          }}
        >
          {gethighlight(curritem, highlighttext)}
        </li>
      })}
    </div>
  )
}

export default SuggestionList
