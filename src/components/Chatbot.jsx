import "../style/chatbot.css";
import ChatBot from "react-simple-chatbot";
import { GoDotFill } from "react-icons/go";
import { IoChatbubble } from "react-icons/io5";
import { useEffect } from "react";

function Header() {
  return (
    <div style={{ padding: "10px 16px" }}>
      <div style={{ fontSize: 14, color: "#e0e0e0" }}>Chatting with</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          color: "#fff",
          fontSize: 16,
        }}
      >
        John Rick
        <GoDotFill color="#4caf50" size={16} style={{ marginLeft: 6 }} />
      </div>
    </div>
  );
}

export default function Chatbot() {
  useEffect(() => {
    let observer = null;
    let messageContainer = null;
    let resizeHandler = null;

    // Helper: scroll to bottom
    const scrollToBottom = () => {
      if (messageContainer) {
        if ("scrollBehavior" in document.documentElement.style) {
          messageContainer.scrollTo({
            top: messageContainer.scrollHeight,
            behavior: "smooth",
          });
        } else {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      }
    };

    // Mutation observer callback
    const onMutation = (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          scrollToBottom();
        }
      });
    };

    // Resize handler
    resizeHandler = () => {
      scrollToBottom();
    };

    // Wait for the chatbot to mount
    const interval = setInterval(() => {
      messageContainer = document.querySelector(".rsc-content");
      if (messageContainer) {
        observer = new window.MutationObserver(onMutation);
        observer.observe(messageContainer, { childList: true });
        window.addEventListener("resize", resizeHandler);
        clearInterval(interval);
      }
    }, 300);

    // Cleanup
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", resizeHandler);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <ChatBot
        triggerIcon={<IoChatbubble size={24} />}
        headerTitle={<Header />}
        steps={[
          {
            id: "hello-world",
            message: "Hello, I'm here. What can I help you with?",
            trigger: "user-input",
          },
          {
            id: "user-input",
            user: true,
            trigger: "options",
          },
          {
            id: "options",
            options: [
              { value: "price", label: "What is the price?", trigger: "price" },
              {
                value: "availability",
                label: "Is it in stock?",
                trigger: "availability",
              },
              {
                value: "features",
                label: "Tell me about the features",
                trigger: "features",
              },
            ],
          },
          {
            id: "price",
            message:
              "The price is shown on the product page. Do you have another question?",
            trigger: "user-input",
          },
          {
            id: "availability",
            message:
              "You can see the stock status under the product title. Anything else?",
            trigger: "user-input",
          },
          {
            id: "features",
            message:
              "This product has excellent features! Would you like to know more?",
            trigger: "user-input",
          },
        ]}
        floating={true}
      />
    </>
  );
}
