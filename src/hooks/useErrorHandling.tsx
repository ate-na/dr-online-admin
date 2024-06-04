import { useEffect } from "react";
import toast from "react-hot-toast";

const useErrorHandling = ({
  isSuccess,
  isError,
  errorMessage = "با شکت مواجه شده است",
}: {
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}) => {
  useEffect(() => {
    if (isSuccess) {
      toast.success("با موفقیت انجام شده است");
    } else if (isError) {
      toast.error(errorMessage);
    }
  }, [isSuccess, isError]);
};
export default useErrorHandling;
