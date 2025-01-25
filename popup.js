// document.addEventListener("DOMContentLoaded", () => {
//     const tabList = document.getElementById("tabList");
  
//     // Query all open tabs
//     chrome.tabs.query({}, (tabs) => {
//       tabs.forEach((tab) => {
//         const listItem = document.createElement("li");
//         listItem.textContent = tab.title; // Get the tab's title
//         tabList.appendChild(listItem);
//       });
//     });
//   });

  
document.addEventListener("DOMContentLoaded", async () => {
  const tabListElement = document.getElementById("tabList");

  // Fetch tabs and add them to the popup
  chrome.tabs.query({}, (tabs) => {
    const tabData = tabs.map((tab) => ({
      title: tab.title,
      url: tab.url,
    }));

    // Display the tabs in the popup
    tabData.forEach((tab) => {
      const li = document.createElement("li");
      li.textContent = tab.title;
      tabListElement.appendChild(li);
    });

    // Save tab data to a JSON file
    saveTabDataToFile(tabData);
  });

  // Save the tab data as JSON
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

async function summarizeTabData(tabData) {
  const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
  const endpoint = "https://api.openai.com/v1/chat/completions";

  // Prepare the API request payload
  const messages = [
    { role: "system", content: "You are a helpful assistant that summarizes tab titles." },
    { role: "user", content: `Summarize the following tab titles: ${JSON.stringify(tabData)}` },
  ];

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // You can replace this with a different model if needed
        messages: messages,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content; // Extract summarized text
  } catch (error) {
    console.error("Error fetching GPT summary:", error);
    return "Error summarizing tab titles.";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const tabListElement = document.getElementById("tabList");

  // Fetch tabs and summarize their titles
  chrome.tabs.query({}, async (tabs) => {
    const tabData = tabs.map((tab) => ({
      title: tab.title,
      url: tab.url,
    }));

    // Show original tab titles
    tabData.forEach((tab) => {
      const li = document.createElement("li");
      li.textContent = tab.title;
      tabListElement.appendChild(li);
    });

    // Summarize tab titles with GPT
    const summary = await summarizeTabData(tabData);

    // Display the summary
    const summaryElement = document.createElement("p");
    summaryElement.textContent = `Summary: ${summary}`;
    document.body.appendChild(summaryElement);
  });
});