const path = require(`path`);
const sharp = require("sharp");

sharp.cache(false);
sharp.simd(false);

//exports.createPages = ({ graphql, actions }) => {
//  const { createPage } = actions;
//  return graphql(`
//    {
//      allShopifyProduct {
//        edges {
//          node {
//            handle
//          }
//        }
//      }
//    }
//  `).then((result) => {
//    result.data.allShopifyProduct.edges.forEach(({ node }) => {
//      createPage({
//        path: `/product/${node.handle}/`,
//        component: path.resolve(`./src/components/ProductPage/index.tsx`),
//        context: {
//          // Data passed to context is available
//          // in page queries as GraphQL variables.
//          handle: node.handle,
//        },
//      });
//    });
//  });
//};
