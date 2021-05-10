import React, { useContext } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

import StoreContext from "../../features/store/context/StoreContext";
import { Grid, Product, Title, PriceTag } from "./styles";
import { Img } from "../../utils/styles";
import Layout from "../../layouts";

const ProductGrid = (): JSX.Element => {
  console.log({ test: useContext(StoreContext) });
  const {
    store: { checkout },
  } = useContext(StoreContext);

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
  );

  const getPrice = (price: string) =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : "EUR",
      minimumFractionDigits: 2,
      style: "currency",
    }).format(parseFloat(price ? price : "0"));

  return (
    <div className="bg-thicc-eggplant px-16 py-8 rounded-t-3xl">
      <h1 className="text-4xl pb-8 text-cyan tracking-narrow font-black italic uppercase">
        Products
      </h1>
      <Grid>
        {allShopifyProduct.edges ? (
          [
            ...allShopifyProduct.edges,
            ...allShopifyProduct.edges,
            ...allShopifyProduct.edges,
            ...allShopifyProduct.edges,
            ...allShopifyProduct.edges,
            ...allShopifyProduct.edges,
            ...allShopifyProduct.edges,
            ...allShopifyProduct.edges,
            ...allShopifyProduct.edges,
          ].map(
            ({
              node: {
                id,
                handle,
                title,
                description,
                images: [firstImage],
                variants: [firstVariant],
              },
            }: {
              node: {
                id: string;
                handle: string;
                description: string;
                title: string;
                images: Array<any>;
                variants: Array<any>;
              };
            }) => (
              <Product key={id}>
                <Link to={`/product/${handle}/`}>
                  {firstImage && firstImage.localFile && (
                    <Img
                      fluid={firstImage.localFile.childImageSharp.fluid}
                      className="rounded-t-3xl"
                      alt={handle}
                    />
                  )}
                  <div></div>
                </Link>
                <div className="bg-cyan w-full text-center py-4 rounded-t-3xl text-white">
                  {title}
                </div>
                <div className="">{description}</div>
                <PriceTag>{getPrice(firstVariant.price)}</PriceTag>
              </Product>
            )
          )
        ) : (
          <p>No Products found!</p>
        )}
      </Grid>
    </div>
  );
};

export default ProductGrid;
