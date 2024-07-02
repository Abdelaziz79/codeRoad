import Box from "../../ui/Box";
import TableComp from "./TableComp";

import { Spinner } from "react-bootstrap";
import { HiListBullet, HiOutlineSquares2X2 } from "react-icons/hi2";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import SearchTopics from "./SearchTopics";
import { useVerifiedTopics } from "./useVerifiedTopics";

export default function TheTopicsList() {
  const { isLoading, topics } = useVerifiedTopics();
  const [table, setTable] = useLocalStorageState(true, "table");
  if (isLoading) {
    return <Spinner />;
  }
  if (topics === "there is no Lessons to represint")
    return <p>No topics found</p>;
  return (
    <>
      <h3>Topics</h3>
      <hr />

      <div className=" d-flex gap-3 justify-content-end align-items-center my-3  ">
        <SearchTopics />
        <span className="">view</span>
        <span onClick={() => setTable((show) => !show)} className="pointer">
          {table ? (
            <HiOutlineSquares2X2 size={25} />
          ) : (
            <HiListBullet size={25} />
          )}
        </span>
      </div>
      {!table ? (
        <div className="d-flex gap-3 flex-wrap">
          {topics?.map((explanation) => (
            <Box key={explanation.id} item={explanation} />
          ))}
        </div>
      ) : (
        <div>
          <TableComp explanations={topics} />
        </div>
      )}
    </>
  );
}
