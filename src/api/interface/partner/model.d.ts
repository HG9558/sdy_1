declare namespace partnerAPI {
  export interface queryVenturePlanPicData {
    venturePlanPic: string;
    defineIndustryPic: string;
  }

  export interface queryVenturePlanPicType {
    msg: string;
    code: number;
    data: queryVenturePlanPicData;
  }
}