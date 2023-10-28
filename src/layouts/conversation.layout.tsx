import { Outlet } from "react-router-dom";

//
import Header from "../components/app/header";
import ConversationList from "../components/views/conversationList";

/**
 *
 */
export default function ConversationLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ConversationList />

      <div className="flex w-full flex-col">
        <Header />

        <div
          id="my-outlet-item"
          className="h-auto w-full flex-grow overflow-y-auto bg-gray-100"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
