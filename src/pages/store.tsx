import React from "react"

import ProductGrid from "../components/ProductGrid"
import ContextProvider from "../features/store/provider/ContextProvider"
import { Container } from "../utils/styles"

const CartPage = () => {
  return <div />
  return (
    <Container>
      <ContextProvider>
        <ProductGrid />
      </ContextProvider>
    </Container>
  )
}

export default CartPage
