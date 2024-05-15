import msg from "../data/message";

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url.includes("canva.com")) {
    return;
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ["content_script.js"],
  });
});

const onTabUpdated = (tabId) => {
  return new Promise((resolve, reject) => {
    const listener = (updatedTabId, changeInfo, tab) => {
      if (tabId === updatedTabId && changeInfo.status === "complete") {
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    };
    chrome.tabs.onUpdated.addListener(listener);
  });
};

chrome.runtime.onMessage.addListener((message, sender, reply) => {
  const handleMessage = async () => {
    if (
      message.from !== msg.contentScript &&
      message.action !== msg.openNewTab
    ) {
      return;
    }
    console.log(message);
    try {
      const tab = await chrome.tabs.create({ url: "index.html" });
      await onTabUpdated(tab.id);
      await chrome.tabs.sendMessage(tab.id, {
        from: msg.background,
        action: msg.displayData,
        data: message.data,
      });
      reply({ status: "completed" });
    } catch (error) {
      console.log(error);
    }
  };
  handleMessage();
  return true;
});
