import { useSearchParams } from "react-router-dom";
import { getSearchParamsFilters } from "../utils/searchParamsData";

const useGetSearchParamsFilter = () => {
  const [searchParams, _] = useSearchParams();

  return getSearchParamsFilters(searchParams);
};
export default useGetSearchParamsFilter;
