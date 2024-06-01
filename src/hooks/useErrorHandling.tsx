import { useEffect } from "react";
import toast from "react-hot-toast";

const useErrorHandling = ({
  isSuccess,
  isError,
}: {
  isSuccess: boolean;
  isError: boolean;
}) => {
  useEffect(() => {
    if (isSuccess) {
      toast.success("با موفقیت انجام شده است");
    } else if (isError) {
      toast.error("با شکت مواجه شده است");
    }
  }, [isSuccess, isError]);
};
export default useErrorHandling;
