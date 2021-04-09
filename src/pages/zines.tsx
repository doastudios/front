import { graphql } from "gatsby"
import React from "react"

import Magzine from "../components/Magzine"
import { Container } from "../utils/styles"

const Zines = ({ data: { Magazine } }: any) => {
  return (
    <div className="container overflow-hidden full-bleed ">
      {Magazine.map((each: any) => (
        <div> each </div>
      ))}
    </div>
  )
}

// export const query = graphql`
//   query {
//     Magazine {
//       id
//     }
//   }
// `

export default Zines
