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
    size: 20,
    page: 15,
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://toko.ox-sys.com/variations",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
      params: params,
    }).then((res) => {
      setPosts(res.data);
      setPaginatedPost(_(res.data).slice(0).take(pageSize).value());
    });
  }, []);

  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = posts.items;

  console.log(currentPosts);

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
        {!paginatedPost ? (
          "Loading..."
        ) : (
          <div className="table-container">
            <div
              className="input-container"
              style={{
                paddingRight: 50,
                paddingLeft: 50,
                paddingTop: 30,
                paddingBottom: 15,
              }}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                type="text"
                placeholder="search"
              />
            </div>
            <table className="table ">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>ID</th>
                  <th style={{ width: "15%" }}>USER</th>
                  <th style={{ width: "30%", textAlign: "center" }}>Title</th>
                  <th style={{ width: "30%", textAlign: "center" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {/*{paginatedPost*/}
                {/*  .filter((val) => {*/}
                {/*    if (search === "") {*/}
                {/*      return val;*/}
                {/*    } else if (*/}
                {/*      val.title*/}
                {/*        .toLowerCase()*/}
                {/*        .includes(search.toLocaleLowerCase())*/}
                {/*    ) {*/}
                {/*      return val;*/}
                {/*    }*/}
                {/*  })*/}
                {currentPosts.filter((val) => {
                  if(search === '') return val

                  else if(val.product  || val.supplier  || val.properties.map((d) => d.value))
                }).map((post, i) => (
                  <tr key={i}>
                    <td>{post.product}</td>
                    <td>{post.supplier}</td>
                    <td>{post.properties.map((d) => d.value)}</td>
                    <td style={{ textAlign: "center" }}>{post.productProperties.map((v) => v.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={postPerPage}
          total={total}
          showQuickJumper
          showSizeJumper
          onShowSizeChange={handleShow}
          current={page}
        />
      </div>
    </div>
  );
};
