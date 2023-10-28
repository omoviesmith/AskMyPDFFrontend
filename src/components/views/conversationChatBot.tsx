import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

//
import { RiSendPlaneFill } from "react-icons/ri";
import { GoThumbsup, GoThumbsdown, GoCopy } from "react-icons/go";

//
import copyTextToClipboard from "../../utils/clipboard";
import dayjs from "dayjs";

//
const MAX_LENGTH = 2000;

/**
 *
 */
export default function CoversationChatBot() {
  const { t } = useTranslation();

  //
  const [question, setQuestion] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [conversation, setConversation] = useState<any[]>([]);

  //
  const messageListRef = useRef<HTMLDivElement>(null);

  //
  function handleKeyUpInput(key: string) {
    if (key !== "Enter") return;

    askQuestion();
  }

  //
  function askQuestion() {
    setConversation((prev) => [
      ...prev,
      // Question from user
      {
        id: Date.now().toString(),
        bot: false,
        message: question,
        createdAt: Date.now(),
      },
      // Answer from bot
      {
        id: Date.now().toString() + Math.random(),
        bot: true,
        message: "This is the reply from the bot",
        createdAt: Date.now(),
      },
    ]);

    setQuestion("");
  }

  //
  async function copyBotResponse(message: string) {
    await copyTextToClipboard(message);
  }

  // Scrolling to bottom of message list
  useEffect(() => {
    const elementToScroll = document?.getElementById?.("my-outlet-item");

    //
    if (!elementToScroll) return;
    if (!messageListRef.current) return;

    // Scroll to top of reposnse
    // const height =
    //   messageListRef.current.offsetHeight -
    //     (messageListRef.current.lastElementChild?.clientHeight ?? 0) -
    //     10 ?? 0;

    // Scroll to bottom of response
    const height = messageListRef.current.offsetHeight ?? 0;

    //
    setTimeout(() => {
      document
        .getElementById("my-outlet-item")
        ?.scrollTo({ top: height, behavior: "smooth" });
    }, 120);
  }, [conversation]);

  //
  return (
    <div className="relative flex h-full flex-grow flex-col">
      <div className="flex flex-grow flex-col gap-5" ref={messageListRef}>
        {conversation.map((conv) => (
          <div key={conv.id}>
            <div
              className={classNames(
                "flex gap-2",
                conv.bot ? "justify-start" : "justify-end",
              )}
            >
              <div
                className={classNames(
                  "mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-red-800",
                  { "order-1": !conv.bot },
                )}
              />
              <div className="w-full max-w-xl cursor-default rounded-lg border border-gray-100 bg-white px-5 py-3 shadow-sm">
                <p className="text-md">{conv.message}</p>

                {conv.bot && (
                  <div className="mt-5 flex justify-end gap-3 text-gray-500">
                    <button onClick={() => copyBotResponse(conv.message)}>
                      <GoCopy size={20} />
                    </button>

                    <button>
                      <GoThumbsup size={20} />
                    </button>

                    <button>
                      <GoThumbsdown size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p
              className={classNames(
                "mt-[6px] text-xs",
                conv.bot ? "ml-12" : "mr-12 text-right",
              )}
            >
              {dayjs(conv.createdAt).format("hh:mm A")}
            </p>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 flex w-full gap-3 bg-gray-100 pb-5 pt-3">
        <div className="flex w-full flex-col">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyUp={(e) => handleKeyUpInput(e.key)}
            placeholder={t("conversation.askQuestion")}
            className="h-12 w-full rounded-full border border-gray-200 bg-white px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div
            className={classNames(
              "mr-3 mt-[2px] text-right text-xs font-semibold",
              question.length > MAX_LENGTH ? "text-red-500" : "text-gray-500",
            )}
          >
            <span>
              {question.length} / {MAX_LENGTH}
            </span>
          </div>
        </div>

        <button
          onClick={() => askQuestion()}
          disabled={!question.length || question.length > MAX_LENGTH}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 p-2 text-gray-100 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <RiSendPlaneFill size={28} className="-ml-[2px] mt-[2px]" />
        </button>
      </div>
    </div>
  );
}