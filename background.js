
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarizeTabs") {

        const apiKey = "API_KEY"; // Replace with your real API key
        const endpoint = "https://api.openai.com/v1/chat/completions";

        const tabInfo = request.data.map(tab => `- ${tab.title} (${tab.url})`).join("\n");

        const messages = [
            { role: "system", content: "You are a helpful assistant that summarizes tab titles." },
            { role: "user", content: `hello gpt` }  //enter your prompt here
            // { role: "user", content: `Summarize the following tabs:\n${tabInfo}` }

        ];

        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                max_tokens: 100
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("GPT API Response:", data); // Log full response

            // ✅ Handle potential errors in response
            if (!data.choices || data.choices.length === 0) {
                console.error("GPT Error: No valid response from API.");
                sendResponse({ summary: "Error: No valid response from GPT." });
                return;
            }

            // ✅ Extract the summarized text
            sendResponse({ summary: data.choices[0].message.content });
        })
        .catch(error => {
            console.error("API Fetch Error:", error);
            sendResponse({ summary: "Error summarizing tab titles." });
        });

        return true; // Keep sendResponse async
    }
});
