import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const GET_GREETING = gql`
  query GetArticles {
    articles {
      id
      title
    }
  }
`;

function Articles(): ReactJSXElement {
  const { loading, error, data } = useQuery(GET_GREETING);

  if (loading) {
    return (
      <div className="mx-auto my-64 text-6xl text-gray-800">
        Akku ist Vollstaendig aufgeladet
      </div>
    );
  }

  return (
    <div>
      {error ? (
        <div className="mx-auto my-64 text-6xl text-red-500">{error}</div>
      ) : (
        <span />
      )}
      {data.articles.forEach((each: { title: string }) => {
        return <div className="text-xl upper">{each.title}</div>;
      })}
    </div>
  );
}

export default Articles;
