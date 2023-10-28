import { useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

//
import CoversationChatBot from "../../components/views/conversationChatBot";
import ConversationSummary from "../../components/views/conversationSummary";

/**
 *
 */
export default function ConverstaionDetailPage() {
  const { t } = useTranslation();

  //
  const [activeTab, setActiveTab] = useState<"chatbot" | "summary">("chatbot");

  //
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-12 w-full flex-shrink-0 justify-between">
        <div
          className={classNames(
            "flex h-full w-full cursor-pointer items-center justify-center border-b border-gray-200 text-center",
            activeTab === "chatbot"
              ? "bg-primary/50 font-semibold"
              : "bg-gray-200",
          )}
          onClick={() => setActiveTab("chatbot")}
        >
          {t("conversation.chatbot")}
        </div>

        <div
          className={classNames(
            "flex h-full w-full cursor-pointer items-center justify-center border-b border-gray-200 text-center",
            activeTab === "summary"
              ? "bg-primary/50 font-semibold"
              : "bg-gray-200",
          )}
          onClick={() => setActiveTab("summary")}
        >
          {t("conversation.summary")}
        </div>
      </div>

      {/* Content of different tabs */}
      <div className="flex-grow px-2 pt-2 md:px-5 md:pt-5 lg:px-10">
        {activeTab === "chatbot" && <CoversationChatBot />}
        {activeTab === "summary" && <ConversationSummary />}
      </div>
    </div>
  );
}
