import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
export default function SearchTopics() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");

  // Filtering and Pagination
  const [searchParam, setSearchParam] = useSearchParams();

  function handleSearch(e) {
    e.preventDefault();
    if (searchParam.get("page")) {
      searchParam.set("page", 1);
    }
    searchParam.set("search", search);
    searchParam.set("level", level);
    setSearchParam(searchParam);
  }

  return (
    <div>
      <form
        className="d-flex gap-2 align-items-center justify-content-center"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ height: "35px" }}
        />
        <input
          className="form-check-input"
          type="radio"
          id="easy"
          name="level"
          value="easy"
          onChange={(e) => setLevel(e.target.value)}
        />

        <label htmlFor="easy" className="">
          easy
        </label>
        <input
          className="form-check-input"
          type="radio"
          id="medium"
          name="level"
          value="medium"
          onChange={(e) => setLevel(e.target.value)}
        />

        <label className="" htmlFor="medium">
          medium
        </label>
        <input
          className="form-check-input"
          type="radio"
          id="hard"
          name="level"
          value="hard"
          onChange={(e) => setLevel(e.target.value)}
        />

        <label className="" htmlFor="hard">
          hard
        </label>
        <input
          className="form-check-input"
          type="radio"
          id="all"
          name="level"
          value="all"
          onChange={(e) => setLevel(e.target.value)}
        />

        <label className="" htmlFor="hard">
          all
        </label>
        <button
          className="btn btn-primary"
          style={{ height: "35px" }}
          onClick={handleSearch}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}
