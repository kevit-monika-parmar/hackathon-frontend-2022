import { BASE_URL, BOT_URLS } from "../constants/urlConstants";
import ApiService from "./ApiService";

const botApiService = {
  getBotConversations: () =>
    ApiService.postData(`${BASE_URL}${BOT_URLS.CONVERSATIONS}`, null),
  activitySend: (data, id) =>
    ApiService.postData(
      `${BASE_URL}${BOT_URLS.CONVERSATIONS}${id}/activities`,
      data
    ),
};

export default botApiService;
