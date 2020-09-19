import { Fight, TalentList } from "../types";

export default (talentList: TalentList, fight: Fight): TalentList => {
  if (talentList) {
    Object.keys(talentList).forEach(talent =>
      fight[talent] ? { ...talentList[talent], ...fight[talent] } : null
    );
  }
  return talentList;
};
