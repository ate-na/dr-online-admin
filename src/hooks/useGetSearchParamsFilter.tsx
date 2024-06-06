import { useSearchParams } from "react-router-dom";
import {
  getSearchParamsFilters,
  prepareObjectSearchParamsFilters,
} from "../utils/searchParamsData";

export interface IUserGetSearchParamsFilter {
  isObject?: boolean;
}

const useGetSearchParamsFilter = (props: IUserGetSearchParamsFilter) => {
  const [searchParams, _] = useSearchParams();

  return props.isObject
    ? getSearchParamsFilters(searchParams)
    : prepareObjectSearchParamsFilters(searchParams);
};
export default useGetSearchParamsFilter;
