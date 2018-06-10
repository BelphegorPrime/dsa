export default (talentList, fight) => {
  Object.keys(talentList).forEach(
    talent =>
      fight[talent] ? Object.assign(talentList[talent], fight[talent]) : null
  );
  return talentList;
};
