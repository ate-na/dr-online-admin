import { useForm } from "react-hook-form";
import { useGetAllPatientQuery } from "../../../api/patients";
import { useGetAllTherapistQuery } from "../../../api/therapist";
import { useTherapistScheduleQuery } from "../../../api/therapistSchedule";
import FlexBox from "../../../components/kits/FlexBox";
import Modal from "../../../components/kits/Modal";
import Select from "../../../components/kits/Select";
import { TCreateOrder, TCreateOrderForm } from "./index.types";
import Button from "../../../components/kits/Button";
import { useEffect } from "react";
import { createFormValidation } from "./index.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDaysOfWeekTransalate } from "../../../utils/getEnumTransformer";

const CreateOrder: TCreateOrder = ({ open = false, handleClose }) => {
  const { control, getValues, handleSubmit, watch } = useForm<TCreateOrderForm>(
    { resolver: zodResolver(createFormValidation) }
  );
  const therapistId = watch("therapist");
  const patientId = watch("patient");
  const schedule_day = watch("day");

  const { data: therapits } = useGetAllTherapistQuery("limit=10000");
  const { data: patients } = useGetAllPatientQuery("limit=5000");
  const { data: schedules } = useTherapistScheduleQuery(
    therapistId || undefined,
    {
      skip: !therapistId,
      refetchOnMountOrArgChange: true,
    }
  );

  const PATIENT_SELECT_OPTIONS =
    patients?.content.map((e: any) => ({
      label: `${e.firstName} ${e.lastName}`,
      value: e.id,
    })) || [];

  const THERAPIST_SELECT_OPTIONS =
    therapits?.content.map((e) => ({
      label: `${e.firstName} ${e.lastName}`,
      value: e.id,
    })) || [];

  console.log("therapist", schedules);

  const THERAPIST_SCHEDULE_DAY_SELECT_OPTIONS = schedules?.content.reduce(
    (pre: any[], current) => {
      const index = pre.findIndex((el: any) => el.value === current.day);
      if (index < 0) {
        pre.push({
          value: current.day,
          label: getDaysOfWeekTransalate(current.day),
        });
      }
      return pre;
    },
    []
  );

  const TIME_SELECT_OPTIONS = schedules?.content
    .filter((el) => el.day === schedule_day)
    .map((el) => ({ label: `${el.startHour}_${el.endHour}`, value: el.id }));

  const onSubmitHandler = handleSubmit((value) => {});
  return (
    <Modal width="30%" open={open} handleClose={handleClose} title="رزرو جدید">
      <form onSubmit={onSubmitHandler}>
        <FlexBox gap={2}>
          <Select
            items={PATIENT_SELECT_OPTIONS}
            name="patient"
            control={control}
            selectLabel="بیمار"
          />
          <Select
            items={THERAPIST_SELECT_OPTIONS}
            name="therapist"
            selectLabel="پزشک"
            control={control}
          />
        </FlexBox>
        <FlexBox gap={2}>
          <Select
            items={THERAPIST_SCHEDULE_DAY_SELECT_OPTIONS || []}
            name="day"
            control={control}
            selectLabel="روز هفته"
            disabled={!therapistId || !patientId}
          />
          <Select
            items={TIME_SELECT_OPTIONS || []}
            name="time"
            selectLabel="بازه زمانی"
            control={control}
            disabled={!schedule_day}
          />
        </FlexBox>

        <Button type="submit"></Button>
      </form>
    </Modal>
  );
};
export default CreateOrder;
