# Tab Summarizer Chrome Extension

## Overview

This Chrome extension extracts the titles of all open tabs in the browser, organizes them, and uses OpenAI's GPT API to generate concise summaries of each tab's content. The summaries and original titles are displayed in the popup for quick and easy reference.

## Features

- **Tab Title Extraction**: Gathers the titles of all open browser tabs.
- **Summarization with GPT**: Uses OpenAI's API to generate summaries of the tab content.
- **User-Friendly Interface**: Displays original titles and summaries in a clean, responsive popup.
- **Dynamic Popup Resizing**: Adjusts the popup size to fit content while preventing overly long rows.

## Installation

1. Clone or download the repository.
2. Navigate to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click on **Load unpacked** and select the folder containing the extension files.
5. The extension will appear in the toolbar. Pin it for easy access.

## Usage

1. Click on the extension icon in the toolbar to open the popup.
2. The popup will display the titles of all open tabs.
3. If connected to the GPT API, the extension will also display summaries of each tab’s content.

## File Structure
my-chrome-extension/  
├── manifest.json   # Metadata for the Chrome extension  
├── popup.html      # HTML layout for the popup  
├── popup.css       # Stylesheet for the popup  
├── popup.js        # Core logic for tab extraction and GPT API integration  
└── icons/          # Folder for extension icons   


## Configuration

### OpenAI API Key

To enable GPT summarization, you need an OpenAI API key:

1. Sign up at [OpenAI](https://platform.openai.com/).
2. Go to the **API Keys** page and generate a key.
3. Add your API key to `popup.js` in the following line:
   ```javascript
   const apiKey = "YOUR_API_KEY";

