import classNames from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

//
import { BsFillChatDotsFill, BsChatLeftDotsFill } from "react-icons/bs";

//
import axiosInstance from "../../utils/axios";
import { snakeCaseToTitleCase } from "../../utils/helper";

/**
 *
 */
export default function ConversationList() {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  //
  const [conversationItems, setConversationItems] = useState<string[]>([]);

  //
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosInstance.post("/list_documents");
      const newData = result.data ?? [];

      // If no converation goto new conversation page
      if (!newData.length) navigate("/file-upload");

      // Set list of conversation
      setConversationItems(newData);

      // Navigate to conversation details
      navigate(`/conversations/${newData[0]}`);
    },
    onError: () => {
      // navigate("/file-upload");
    },
  });

  //
  const conversationId = params.id ?? "";

  //
  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  return (
    <div className="min-w-[369px] border-r border-gray-200 bg-gray-50">
      <div className="sticky top-0 h-14 w-full border-b border-gray-200 bg-white px-3 py-4">
        <p>Ask My Document</p>
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
                conversationId?.toLowerCase() === item?.toLowerCase()
                  ? "border border-primary bg-primary/50 shadow"
                  : "border border-gray-100 bg-white shadow-sm hover:bg-gray-200 hover:shadow",
              )}
              to={`/conversations/${item}`}
            >
              <BsChatLeftDotsFill size={14} className="flex-shrink-0" />
              <p className="overflow-hidden text-ellipsis">
                {snakeCaseToTitleCase(item)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
