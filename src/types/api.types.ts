export interface IApiChatItem {
  query: string;
  response: string;
}

export interface IApiChatHistoryResponse {
  chat_history: IApiChatItem[];
}

export interface IApiAskQuestionResponse {
  question: string;
  answer: string;
}
