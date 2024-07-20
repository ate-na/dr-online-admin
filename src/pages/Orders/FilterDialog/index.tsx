import { useForm } from "react-hook-form";
import Select from "../../../components/kits/Select";
import { TFilerDialog, TFilterForm } from "./index.types";
import { OrderStatus } from "../../../types/order.modal";
import { orderStatusTranslate } from "../../../utils/getEnumTransformer";
import Modal from "../../../components/kits/Modal";
import Button from "../../../components/kits/Button";
import { useSearchParams } from "react-router-dom";
import { prepareSearchParamsData } from "../../../utils/searchParamsData";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterFormValidation } from "./index.contant";

const FilterDialog: TFilerDialog = ({ open = false, handleClose }) => {
  const [searchParams] = useSearchParams();
  const { control, handleSubmit } = useForm<TFilterForm>({
    values: { status: searchParams.get("status") || undefined },
    resolver: zodResolver(filterFormValidation),
  });

  const [_, setSearchParams] = useSearchParams("");
  const onSubmit = handleSubmit(
    (value) => {
      console.log("value is", value);
      setSearchParams(() => prepareSearchParamsData(value));
      handleClose();
    },
    (err) => {
      toast.error(err.root?.message as string);
    }
  );
  return (
    <Modal open={open} handleClose={handleClose} title="جستجوی جدول">
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", gap: 10, flexDirection: "column" }}
      >
        <Select
          control={control}
          items={[
            OrderStatus.Cancel,
            OrderStatus.Done,
            OrderStatus.Pending,
          ].map((e) => ({ label: orderStatusTranslate(e), value: e }))}
          name="status"
          selectLabel="وضعیت"
        />
        <Button type="submit">جستجو</Button>
      </form>
    </Modal>
  );
};
export default FilterDialog;
