import { useForm } from "react-hook-form";
import { useGetAllPatientQuery } from "../../../api/patients";
import { useGetAllTherapistQuery } from "../../../api/therapist";
import { useTherapistScheduleQuery } from "../../../api/therapistSchedule";
import Modal from "../../../components/kits/Modal";
import Select from "../../../components/kits/Select";
import { TCreateOrder, TCreateOrderForm } from "./index.types";
import Button from "../../../components/kits/Button";
import { createFormValidation } from "./index.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getDaysOfWeekTransalate,
  TherapistScheduleTypeTranslate,
} from "../../../utils/getEnumTransformer";
import {
  useCreateOrderMutation,
  useGetReservationDateBaseTherapistQuery,
} from "../../../api/orders";
import { useGetCategoriesQuery } from "../../../api/categories";
import { useCallback, useEffect, useMemo } from "react";
import TextField from "../../../components/kits/TextField";
import { Grid } from "@mui/material";
import { ICreateOrder } from "../../../types/order.modal";
import useErrorHandling from "../../../hooks/useErrorHandling";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IError } from "../../../types/base.modal";

const CreateOrder: TCreateOrder = ({ open = false, handleClose }) => {
  const { control, handleSubmit, watch, setValue, reset } =
    useForm<TCreateOrderForm>({
      resolver: zodResolver(createFormValidation),
    });

  const therapistId = watch("therapist");
  const patientId = watch("patient");
  const watchedDay = watch("day");
  const watchedTime = watch("time");
  const watchedDate = watch("date");

  const { data: therapits } = useGetAllTherapistQuery("limit=10000");
  const { data: patients } = useGetAllPatientQuery("limit=5000");
  const { data: schedules } = useTherapistScheduleQuery(
    therapistId || undefined,
    {
      skip: !therapistId,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: reserveTimes } = useGetReservationDateBaseTherapistQuery(
    { time: watchedTime, day: watchedDay, therapistId: therapistId },
    {
      skip: !therapistId || !watchedTime || !watchedDay,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: categories } = useGetCategoriesQuery("limit=5000", {
    skip: !watchedDate,
  });
  const [onSubmit, submitData] = useCreateOrderMutation();

  const currentSchadule = useMemo(() => {
    if (!watchedDay || !watchedTime) return;
    return schedules?.content.find(
      (e) =>
        e.startHour === watchedTime.split("_")[0] &&
        e.endHour === watchedTime.split("_")[1] &&
        e.day === watchedDay
    );
  }, [watchedTime, watchedDay]);

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
    .filter((el) => el.day === watchedDay)
    .map((el) => ({
      label: `${el.startHour}_${el.endHour}`,
      value: `${el.startHour}_${el.endHour}`,
    }));

  const DATE_SELECT_OPTIONS = reserveTimes?.dates?.map((el) => ({
    label: el,
    value: el,
  }));

  const CATEGORIES_SELECT_OPTIONS = categories?.content.map((el) => ({
    label: el.faName,
    value: el.id,
  }));

  const SELECT_TYPE_OPTIONS: any = watchedTime
    ? schedules?.content
        .filter(
          (el) =>
            el.startHour === watchedTime?.split("_")[0] &&
            el.endHour === watchedTime?.split("_")[1]
        )
        .map((e) => ({
          label: TherapistScheduleTypeTranslate(e.type),
          value: e.type,
        }))
    : [];

  useEffect(() => {
    if (currentSchadule) {
      setValue("room", currentSchadule.room);
      setValue("location", currentSchadule.location.address);
    } else {
      setValue("room", "");
      setValue("location", "");
    }
  }, [currentSchadule]);

  const onSubmitHandler = handleSubmit(
    (value) => {
      console.log("the value is", value);
      const [startHour, endHour] = value.time.split("_");
      const selected_schedule = schedules?.content.find(
        (e) => e.startHour === startHour && e.endHour === endHour
      );
      // if (!selected_schedule) toast.error("");

      const body: ICreateOrder = {
        ...value,
        location: selected_schedule?.location?.id as number,
        room: selected_schedule?.room as number,
        startHour,
        endHour,
      };
      onSubmit(body);
      reset();
      handleClose();

      console.log("the body is", body);
    },
    (error) => {}
  );

  useErrorHandling({
    isError: submitData.isError,
    isSuccess: submitData.isSuccess,
    errorMessage: ((submitData.error as FetchBaseQueryError)?.data as IError)
      ?.message,
  });

  return (
    <Modal width="30%" open={open} handleClose={handleClose} title="رزرو جدید">
      <form onSubmit={onSubmitHandler}>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={6}>
            <Select
              items={PATIENT_SELECT_OPTIONS}
              name="patient"
              control={control}
              selectLabel="بیمار"
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              items={THERAPIST_SELECT_OPTIONS}
              name="therapist"
              selectLabel="پزشک"
              control={control}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              items={THERAPIST_SCHEDULE_DAY_SELECT_OPTIONS || []}
              name="day"
              control={control}
              selectLabel="روز هفته"
              disabled={!therapistId || !patientId}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              items={TIME_SELECT_OPTIONS || []}
              name="time"
              selectLabel="بازه زمانی"
              control={control}
              disabled={!watchedDay}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              items={DATE_SELECT_OPTIONS || []}
              name="date"
              control={control}
              selectLabel="تاریخ برگزاری"
              disabled={!watchedTime || DATE_SELECT_OPTIONS?.length === 0}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              items={CATEGORIES_SELECT_OPTIONS || []}
              name="categories"
              selectLabel="زمینه های تخصصی"
              control={control}
              disabled={!watchedTime || CATEGORIES_SELECT_OPTIONS?.length === 0}
              multiple={true}
              defaultValue={[]}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              items={SELECT_TYPE_OPTIONS || []}
              name="type"
              selectLabel="شیوه برگزاری"
              control={control}
              disabled={!watchedTime || SELECT_TYPE_OPTIONS?.length === 0}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              control={control}
              name="room"
              label="اتاق"
              helperText=""
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              control={control}
              name="location"
              label="محل برگزاری"
              helperText=""
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <Button type="submit">دریافت نوبت</Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};
export default CreateOrder;
