import { Link } from "@remix-run/react";

const buildLink = (path: string, page: number) =>
  path.replace("[page]", page.toString());

interface NumberProps {
  page: number;
  currentPage: number;
  path: string;
  position: string;
}

const Number = ({ page, currentPage, path, position }: NumberProps) => {
  return (
    <li
      key={`position-${position}`}
      className={`${page === currentPage ? "flex items-center justify-center font-bold bg-black text-white min-h-10 min-w-10" : ""} ${position} pagination-item`}
    >
      <Link to={buildLink(path, page)} prefetch="viewport">
        {page}
      </Link>
    </li>
  );
};

interface PaginationProps {
  start: number;
  limit: number;
  total: number;
  path: string;
}

const Pagination = ({ start, limit, total, path }: PaginationProps) => {
  const numberOfPages = Math.ceil(total / limit);
  const currentPage = Math.floor(start / limit) + 1 || 1;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < numberOfPages;

  const marginPagesDisplayed = 2;
  const pageRangeDisplayed = 3;

  const leftSide = pageRangeDisplayed / 2;
  const rightSide = pageRangeDisplayed - leftSide;
  const items = [];

  for (let index = 0; index < numberOfPages; index++) {
    const page = index + 1;

    // Left-side pages (within the margin)
    if (page <= marginPagesDisplayed) {
      items.push(
        <Number
          key={`page-${page}`}
          page={page}
          currentPage={currentPage}
          path={path}
          position="lead"
        />,
      );
      continue;
    }

    // Right-side pages (within the margin from the end)
    if (page > numberOfPages - marginPagesDisplayed) {
      items.push(
        <Number
          key={`page-${page}`}
          page={page}
          currentPage={currentPage}
          path={path}
          position="tail"
        />,
      );
      continue;
    }

    // Central range around the current page
    if (page >= currentPage - leftSide && page <= currentPage + rightSide) {
      items.push(
        <Number
          key={`page-${page}`}
          page={page}
          currentPage={currentPage}
          path={path}
          position="center"
        />,
      );
      continue;
    }

    // Insert a single break if necessary
    if (
      items[items.length - 1]?.key !== "break-left" &&
      page < currentPage - leftSide
    ) {
      items.push(
        <li key="break-left" className="pagination-item">
          ...
        </li>,
      );
    } else if (
      items[items.length - 1]?.key !== "break-right" &&
      page > currentPage + rightSide
    ) {
      items.push(
        <li key="break-right" className="pagination-item">
          ...
        </li>,
      );
    }
  }

  return numberOfPages > 1 ? (
    <div className="w-full flex justify-center pt-3 pb-8">
      <ul className="flex items-center gap-8">
        {hasPrevious ? (
          <li key={`pagination-previous`}>
            <Link
              to={buildLink(path, currentPage - 1)}
              prefetch="viewport"
              className="flex items-center justify-center bg-black text-white px-4 min-h-10"
            >
              ← <span>previous</span>
            </Link>
          </li>
        ) : null}
        {items}
        {hasNext ? (
          <li key={`pagination-next`}>
            <Link
              to={buildLink(path, currentPage + 1)}
              prefetch="viewport"
              className="flex items-center justify-center bg-black text-white px-4 min-h-10"
            >
              <span>next</span> →
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  ) : null;
};

export default Pagination;
