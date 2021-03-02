import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import StoreContext from "../../features/store/context/StoreContext"
import { Grid, Product, Title, PriceTag } from "./styles"
import { Img } from "../../utils/styles"

const ProductGrid = (): JSX.Element => {
  console.log({ test: useContext(StoreContext) })
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              title
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              variants {
                price
              }
            }
          }
        }
      }
    `
  )

  const getPrice = (price: string) =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : "EUR",
      minimumFractionDigits: 2,
      style: "currency",
    }).format(parseFloat(price ? price : "0"))

  return (
    <Grid>
      {allShopifyProduct.edges ? (
        allShopifyProduct.edges.map(
          ({
            node: {
              id,
              handle,
              title,
              images: [firstImage],
              variants: [firstVariant],
            },
          }: {
            node: {
              id: string
              handle: string
              title: string
              images: Array<any>
              variants: Array<any>
            }
          }) => (
            <Product key={id}>
              <Link to={`/product/${handle}/`}>
                {firstImage && firstImage.localFile && (
                  <Img
                    fluid={firstImage.localFile.childImageSharp.fluid}
                    alt={handle}
                  />
                )}
              </Link>
              <Title>{title}</Title>
              <PriceTag>{getPrice(firstVariant.price)}</PriceTag>
            </Product>
          )
        )
      ) : (
        <p>No Products found!</p>
      )}
    </Grid>
  )
}

export default ProductGrid
