import * as React from "react";

const ListArticles = ({ articles }) => {
  const [lsArticles, setLsArticles] = React.useState([]);

  React.useEffect(() => {
    setLsArticles(articles);
  }, [articles]);

  return (
    <>
      <ul>
        {lsArticles?.map((a, index) => {
          return (
            <ol key={index}>
              {a.title}, {a.upvotes}, {a.date}
            </ol>
          );
        })}
      </ul>
    </>
  );
};

export default ListArticles;
