import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Pagination } from "antd";

const pageSize = 20;
export const MainPage = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [paginatedPost, setPaginatedPost] = useState();
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const params = {
    size: 10,
    page: 100,
  };
  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "https://toko.ox-sys.com/variations",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("user")}`,
  //     },
  //     params: params,
  //   }).then((res) => {
  //     setPosts(res.data);
  //     console.log(res.data);
  //     setPaginatedPost(_(res.data).slice(0).take(pageSize).value());
  //   });
  // }, []);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await axios(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setPosts(response.data);
      setTotal(response.data.length);
      setPaginatedPost(_(response.data).slice(0).take(pageSize).value());
    };

    loadPosts();
  }, []);

  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);
  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);

  const handleShow = (current, pageSize) => {
    setPostPerPage(pageSize);
  };

  const itemREminder = (current, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return;
  };

  return (
    <div>
      <div className="App">
        {currentPosts.map((posts) => (
          <h3 key={<posts className="id"></posts>}>{posts.body}</h3>
        ))}
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={postPerPage}
          total={total}
          showQuickJumper
          showSizeJumper
          onShowSizeChange={handleShow}
          current={page}
          itemRender={itemREminder}
        />
      </div>
    </div>
  );
};
