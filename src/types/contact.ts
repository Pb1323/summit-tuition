export type InterestedProduct =
  | "Diagnostic Assessment"
  | "Weekly Mock Club"
  | "Practice Paper Simulator"
  | "Private Tuition"
  | "Group Tuition"
  | "Complete 11+ Programme"
  | "Holiday Booster"
  | "Not sure yet";

export interface EnquiryPayload {
  parentName: string;
  email: string;
  phone: string;
  childYearGroup: string;
  targetSchool: string;
  interestedProduct: InterestedProduct;
  message: string;
  consent: boolean;
}
