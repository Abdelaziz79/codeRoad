import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTopicsNames } from "../explanation/useTopicsNames";
export default function SearchTopics() {
  const [level, setLevel] = useState("all");
  const { isLoading, topicsNames } = useTopicsNames();
  const [topicName, setTopicName] = useState("all");

  const [searchParam, setSearchParam] = useSearchParams();

  function handleSearch(e) {
    e.preventDefault();

    searchParam.set("topic", topicName);
    searchParam.set("level", level);
    setSearchParam(searchParam);
    window.location.reload();
  }

  if (topicsNames === "There is no topics to Represent") return null;
  return (
    <div>
      <form
        className="d-flex gap-2 align-items-center justify-content-center"
        onSubmit={handleSearch}
      >
        <select
          disabled={isLoading}
          id="topic"
          className="form-select "
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        >
          <option value="all">All</option>
          {topicsNames?.map((e) => (
            <option key={e.name} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
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
