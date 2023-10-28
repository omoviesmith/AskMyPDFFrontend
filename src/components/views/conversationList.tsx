import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

//
import { BsFillChatDotsFill, BsChatLeftDotsFill } from "react-icons/bs";

/**
 *
 */
export default function ConversationList() {
  const { t } = useTranslation();
  const params = useParams();

  //
  const conversationId = +(params.conversationId ?? "");

  //
  const conversationItems = [
    { title: "Test", id: 1 },
    { title: "Again", id: 2 },
    { title: "Another", id: 3 },
  ];

  //
  return (
    <div className="min-w-[369px] border-r border-gray-200 bg-gray-50">
      <div className="sticky top-0 h-14 w-full border-b border-gray-200 bg-white px-3 py-4">
        <p>Ask Your PDF</p>
      </div>

      <div className="h-full overflow-y-auto px-3 pb-20 pt-5">
        {/* New conversation */}
        <div className="mb-5 flex justify-center">
          <a
            href="/file-upload"
            className="flex items-center gap-3 rounded-md bg-gray-900 px-6 py-3 text-sm text-gray-100 shadow transition-all duration-300 hover:scale-105"
          >
            <BsFillChatDotsFill />
            <p>{t("conversation.new")}</p>
          </a>
        </div>

        {/* Existing conversation history */}
        <div className="flex flex-col gap-2">
          {conversationItems.map((item, index) => (
            <Link
              key={index}
              className={classNames(
                "flex items-center gap-3 rounded px-2 py-2 md:px-4 md:py-3",
                conversationId === item.id
                  ? "bg-primary/50 border-primary border shadow"
                  : "border border-gray-100 bg-white shadow-sm hover:bg-gray-200 hover:shadow",
              )}
              to={`/conversations/${item.id}`}
            >
              <BsChatLeftDotsFill size={14} className="flex-shrink-0" />
              <p className="overflow-hidden text-ellipsis">{item.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}