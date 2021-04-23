import React, { useState } from "react"
import Ticker from "react-ticker"

export const MultiTicker = ({ text, count }) => {
  console.log(new Array(count))
  const [{ directions, speeds }, setState] = useState({
    directions: Array(count)
      .fill()
      .map(() => (Math.random() * 10 > 5 ? "toLeft" : "toRight")),
    speeds: Array(count)
      .fill()
      .map(() => Math.random() * 100),
  })
  let i = 0
  return (
    <div className="bg-hurt-ur-eyes full-bleed">
      {Array.from({ length: count }, (_, k) => {
        i++
        return (
          <div key={k}>
            <Ticker speed={speeds[i]} mode={"chain"} direction={directions[i]}>
              {() => (
                <div className="text-2xl text-white bg-hurt-ur-eyes ">
                  <h1 className="px-3"> {text} </h1>
                </div>
              )}
            </Ticker>
          </div>
        )
      })}
    </div>
  )
}