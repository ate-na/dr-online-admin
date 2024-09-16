import { Grid } from "@mui/material";
import Modal from "../../../components/kits/Modal";
import { TCreateTherapistForm, TCreateTherapistSchedule } from "./index.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTherapistScheduleForm } from "./index.contant";
import TextField from "../../../components/kits/TextField";
import { useEffect } from "react";
import { getDaysOfWeekTransalate } from "../../../utils/getEnumTransformer";
import { useGetLocationsQuery } from "../../../api/location";
import Select from "../../../components/kits/Select";

const CreateTherapistSchedule: TCreateTherapistSchedule = ({
  open = false,
  handleClose,
  therapist,
  dayOfWeek,
}) => {
  const { control, setValue } = useForm<TCreateTherapistForm>({
    resolver: zodResolver(createTherapistScheduleForm),
  });

  const { data: locations } = useGetLocationsQuery("limit-10000");

  useEffect(() => {
    if (therapist) {
      setValue("therapist", `${therapist?.firstName} ${therapist?.lastName}`);
    }
    if (dayOfWeek) {
      setValue("day", getDaysOfWeekTransalate(+dayOfWeek));
    }
  }, [therapist]);

  const LOCATION_SELECT_OPTIONS = locations?.content.map((e) => ({
    label: e.address,
    value: e.id,
  }));

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title="فرم افزودن آیتم جدید به چارت رزرو"
      >
        <form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                control={control}
                name="day"
                disabled={true}
                helperText=""
                label="هفته"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                control={control}
                name="therapist"
                disabled={true}
                helperText=""
                label="پزشک"
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                control={control}
                name="location"
                selectLabel="آدرس محل برگزاری"
                items={LOCATION_SELECT_OPTIONS || []}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                control={control}
                name="room"
                helperText=""
                label="اتاق"
              />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={12}>
              {/* <TimePicker
                control={control}
                name="time"
                label="disabled"
                disabled
              /> */}
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  );
};
export default CreateTherapistSchedule;
