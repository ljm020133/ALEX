document.addEventListener("DOMContentLoaded", () => {
  const tabListElement = document.getElementById("tabList");
  const summarizeButton = document.getElementById("summarize-btn");
  const summaryElement = document.getElementById("summary");

  // Fetch and display tab titles when the popup opens
  chrome.tabs.query({}, (tabs) => {
      const tabData = tabs.map(tab => ({
          title: tab.title,
          url: tab.url
      }));

      // Display the tab titles in the popup
      tabData.forEach(tab => {
          const li = document.createElement("li");
          li.textContent = tab.title;
          tabListElement.appendChild(li);
      });

      // Store the tab data for later use (e.g., summarization)
      summarizeButton.dataset.tabData = JSON.stringify(tabData);
  });

  // Handle click event for the "Summarize Tabs" button
  summarizeButton.addEventListener("click", () => {
      const tabData = JSON.parse(summarizeButton.dataset.tabData);

      // Send tab data to background script for summarization
      chrome.runtime.sendMessage({ action: "summarizeTabs", data: tabData }, (response) => {
          if (response && response.summary) {
              summaryElement.textContent = response.summary;
          } else {
              summaryElement.textContent = "Failed to summarize.";
          }
      });
  });

  // Function to save tab data as a JSON file
  function saveTabDataToFile(data) {
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      // Create a temporary download link
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "tabData.json";
      document.body.appendChild(downloadLink);

      // Automatically click the link to download the file
      downloadLink.click();
      document.body.removeChild(downloadLink);

      URL.revokeObjectURL(url); // Clean up the URL object
  }
});
