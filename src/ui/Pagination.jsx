import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE, POST_SIZE } from "../helper/constans";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Button } from "react-bootstrap";
export default function Pagination({ count, page = 1 }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let p;
  if (page === 1) p = PAGE_SIZE;
  else p = POST_SIZE;

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / p);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div>
      <p>
        Showning <span>{(currentPage - 1) * p + 1}</span> to{" "}
        <span>{currentPage === pageCount ? count : currentPage * p}</span> of{" "}
        <span> {count} </span>
        results
      </p>
      <div className="d-flex gap-2">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          size="sm"
          variant="secondary"
        >
          <div className="d-flex gap-1 align-items-center ">
            <HiChevronLeft size={18} /> <span>Previous</span>
          </div>
        </Button>

        <Button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          size="sm"
          variant="secondary"
        >
          <div className="d-flex gap-1 align-items-center ">
            <span>Next</span>
            <HiChevronRight size={18} />
          </div>
        </Button>
      </div>
    </div>
  );
}
