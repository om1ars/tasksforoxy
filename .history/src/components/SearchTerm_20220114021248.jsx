import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
const pageSize = 20;

export const MainPage = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [paginatedPost, setPaginatedPost] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const params = {
    size: 10,
    page: 2,
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
      console.log(res.data);
      setPaginatedPost(_(res.data).slice(0).take(pageSize).value());
    });
  }, []);

  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  const pagination = (num) => {
    setCurrentPage(num);
    const startIndex = (num - 1) * pageSize;
    const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
    setPaginatedPost(paginatedPost);
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
                {posts?.items?.map((post, i) => (
                  <tr key={i}>
                    <td>{post.id}</td>
                    <td>{post.userId}</td>
                    <td>{post.title}</td>
                    <td style={{ textAlign: "center" }}>Something</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <nav
          className="d-flex justify-content-center"
          style={{ position: "fixed", bottom: 0, left: "5%" }}
        >
          <ul className="pagination">
            {pages.map((page) => (
              <li
                className={`${
                  page === currentPage ? "page-item active" : "page-item"
                }`}
              >
                <p className="page-link" onClick={() => pagination(page)}>
                  {page}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
