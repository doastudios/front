// Component
import React from "react"
import Villain from "villain-react"

// Css styles
import "villain-react/dist/style.css"

// Path of the comicbook archive, it can also be a file or blob
const url = "/magazines/MAG_1.pdf"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const workerUrl = "/vendor/worker-bundle.js"

export const Reader = () => {
  return <Villain source={url} />
}
