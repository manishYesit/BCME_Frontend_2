const API_BASE_URL = process.env.PUBLIC_API_BASE_URL;

const apiEndpoints = {
  loginUser: `${API_BASE_URL}/auth/login`,

  //add_prfession
  getAllProfessions: `${API_BASE_URL}/tf_profession/getAllProfessions`,
  updateProfession: `${API_BASE_URL}/tf_profession/updateProfession`,
  deleteProfession: `${API_BASE_URL}/tf_profession/deleteProfession`,
  addProfession: `${API_BASE_URL}/tf_profession/addProfession`,
  clickTrackData: `${API_BASE_URL}/clicks_tracking/getAllData`,
  professionStatus: `${API_BASE_URL}/tf_profession/professionStatus`,

  //plrb_domain--
  getAllDomains: `${API_BASE_URL}/tf_plrb_domain/getAllDomains`,
  updateDomain: `${API_BASE_URL}/tf_plrb_domain/updateDomain`,
  deleteDomain: `${API_BASE_URL}/tf_plrb_domain/deleteDomain`,
  addDomain: `${API_BASE_URL}/tf_plrb_domain/addDomain`,
  domainStatus: `${API_BASE_URL}/tf_plrb_domain/domainStatus`,
  importPlrb: `${API_BASE_URL}/tf_plrb_domain/importPlrb`,

  getAllUsers: `${API_BASE_URL}/tf_user/getAllUsers`,
  updateUser: `${API_BASE_URL}/tf_user/updateUser`,
  deleteUser: `${API_BASE_URL}/tf_user/deleteUser`,
  addUser: `${API_BASE_URL}/tf_user/addUser`,
  getUserById: `${API_BASE_URL}/tf_user/getUserById`,

  //roof--
  getRoofData: `${API_BASE_URL}/tf_roof/getAllData`,
  updateRoofData: `${API_BASE_URL}/tf_roof/updateData`,
  deleteRoofData: `${API_BASE_URL}/tf_roof/deleteData`,
  addRoofData: `${API_BASE_URL}/tf_roof/addData`,
  roofDataStatusUpdate: `${API_BASE_URL}/tf_roof/roofStatus`,
  updateRoofCordinate: `${API_BASE_URL}/tf_roof/updateRoofCordinate`,
  uploadRoofImage: `${API_BASE_URL}/tf_roof/uploadRoofImage`,
  getRoofImage: `${API_BASE_URL}/tf_roof/getRoofImage`,

  //roof_code--
  roofCodeDataById: `${API_BASE_URL}/tf_roof_code/roofLink`,
  roofCodeAddLinkDataById: `${API_BASE_URL}/tf_roof_code/addLinkData`,
  roofCodeupdateLinkInformation: `${API_BASE_URL}/tf_roof_code/updateLinkInformation`,
  roofCodeTrashLinkId: `${API_BASE_URL}/tf_roof_code/trashLink`,
  roofLinkStatus: `${API_BASE_URL}/tf_roof_code/roofLinkStatus`,
  getStairIconData: `${API_BASE_URL}/tf_stair_icon/getAllData`,
  updateStairIconData: `${API_BASE_URL}/tf_stair_icon/updateData`,
  deleteStairIconData: `${API_BASE_URL}/tf_stair_icon/deleteData`,
  addStairIconData: `${API_BASE_URL}/tf_stair_icon/addData`,

  //roof_tools--
  getRoofToolsData: `${API_BASE_URL}/tf_roof_icon/getAllData`,
  addRoofToolsData: `${API_BASE_URL}/tf_roof_icon/addData`,
  updateRoofToolsData: `${API_BASE_URL}/tf_roof_icon/updateData`,
  deleteRoofToolsData: `${API_BASE_URL}/tf_roof_icon/deleteData`,

  //Stair------
  stairDataStatusUpdate: `${API_BASE_URL}/tf_stair/stairStatus`,
  getStairData: `${API_BASE_URL}/tf_stair/getAllData`,
  updateStairData: `${API_BASE_URL}/tf_stair/updateData`,
  deleteStairData: `${API_BASE_URL}/tf_stair/deleteData`,
  addStairData: `${API_BASE_URL}/tf_stair/addData`,
  uploadStairImage: `${API_BASE_URL}/tf_stair/uploadStairImage`,
  getStairImage: `${API_BASE_URL}/tf_stair/getStairImage`,
  updateStairCordinate: `${API_BASE_URL}/tf_stair/updateStairCordinate`,

  //Stair_code--
  stairCodeDataById: `${API_BASE_URL}/tf_stair_code/stairLink`,
  stairCodeAddLinkDataById: `${API_BASE_URL}/tf_stair_code/addStairLinkData`,
  stairCodeupdateLinkInformation: `${API_BASE_URL}/tf_stair_code/updateStairLinkInformation`,
  stairCodeTrashLinkId: `${API_BASE_URL}/tf_stair_code/trashStairLink`,
  stairLinkStatus: `${API_BASE_URL}/tf_stair_code/stairLinkStatus`,

  //stair_tools--
  getStairToolsData: `${API_BASE_URL}/tf_stair_icon/getAllData`,
  addStairToolsData: `${API_BASE_URL}/tf_stair_icon/addData`,
  updateStairToolsData: `${API_BASE_URL}/tf_stair_icon/updateData`,
  deleteStairToolsData: `${API_BASE_URL}/tf_stair_icon/deleteData`,

  getTransactions: `${API_BASE_URL}/tf_transaction/getAllData`,
  getAllSettings: `${API_BASE_URL}/tf_setting/getAllSettings`,
  getAskCodeData: `${API_BASE_URL}/tf_ask_code/getAllData`,
  changePassword: `${API_BASE_URL}/auth/changePassword`,

  //faq--
  addFAQData: `${API_BASE_URL}/tbl_faq_title/addData`,
  getFAQData: `${API_BASE_URL}/tbl_faq_title/getAllData`,
  deleteFAQData: `${API_BASE_URL}/tbl_faq_title/deleteData`,

  //faq_view_list--
  getFAQ_Details: `${API_BASE_URL}/tf_faq/faq_details`,
  register_FAQ: `${API_BASE_URL}/tf_faq/register_faq`,
  Update_FAQ: `${API_BASE_URL}/tf_faq/update_faq`,
  Delete_FAQ: `${API_BASE_URL}/tf_faq/delete_faq`,

  //contact_query--
  getContact_Details: `${API_BASE_URL}/tf_contact/getAllData`,
  get_Queries_Chat: `${API_BASE_URL}/tf_contact/get_queries`,
  send_QueryMessage: `${API_BASE_URL}/tf_contact/saveMessage`,
};

export default apiEndpoints;
