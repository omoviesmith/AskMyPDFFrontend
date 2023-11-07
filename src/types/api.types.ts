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

export interface IUploadDocumentResponse {
  "Created a new collection ": string;
  "Created a new collection": string;
  answer: string;
}

export interface ISummarizeResponse {
  answer: string;
}
