export type InterestedProduct =
  | "Diagnostic Assessment"
  | "Pro"
  | "Max"
  | "Private Tuition"
  | "Group Tuition"
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
