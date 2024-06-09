import { useEffect } from "react";
import toast from "react-hot-toast";

const useErrorHandling = ({
  isSuccess,
  isError,
  errorMessage = "با شکت مواجه شده است",
  isLoading,
}: {
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  isLoading?: boolean;
}) => {
  useEffect(() => {
    console.log("call2222ed", isError, isSuccess);
    if (isSuccess) {
      toast.success("با موفقیت انجام شده است");
    } else if (isError) {
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, isLoading]);
};
export default useErrorHandling;
