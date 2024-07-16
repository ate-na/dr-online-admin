export enum provideTagsType {
  location = "location",
  category = "category",
  admin = "admin",
  patient = "patient",
  therapist = "therapist",
  therapistSchedule = "therapistSchedule",
  orders = "orders",
}
export const provideTags: provideTagsType[] = [
  provideTagsType.location,
  provideTagsType.category,
  provideTagsType.admin,
  provideTagsType.patient,
  provideTagsType.orders,
];
