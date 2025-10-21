<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![License][license-shield]][license-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<div align="center">
  <h1>Example Google Sheets Integration</h1>
  
  <p>
    Google Apps Script integration to automatically log incoming SMS messages to Google Sheets
    <br />
    <br />
    <a href="#-about-the-project"><strong>About The Project</strong></a>
    ·
    <a href="#-getting-started"><strong>Getting Started</strong></a>
    ·
    <a href="#-usage"><strong>Usage</strong></a>
    ·
    <a href="#-contributing"><strong>Contributing</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
- [🌐 About The Project](#-about-the-project)
  - [🛠️ Built With](#️-built-with)
- [🚀 Getting Started](#-getting-started)
  - [📋 Prerequisites](#-prerequisites)
  - [⚙️ Installation](#️-installation)
- [💻 Usage](#-usage)
  - [📨 Webhook Payload Structure](#-webhook-payload-structure)
  - [🔧 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)


<!-- ABOUT THE PROJECT -->
## 🌐 About The Project

This project provides a Google Apps Script integration for SMSGate that automatically logs incoming SMS messages to a Google Sheet. When SMS messages are received through the app, a webhook is sent to this script which parses the message data and appends it to your Google Sheet with the following columns:

- **Timestamp**: When the message was received
- **From**: The phone number that sent the message  
- **Message**: The SMS message content
- **DeviceID**: The device ID
- **MessageID**: The unique message ID

### 🛠️ Built With

- [Google Apps Script](https://developers.google.com/apps-script)
- [Google Sheets](https://sheets.google.com)

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- GETTING STARTED -->
## 🚀 Getting Started

Follow these instructions to set up the SMSGate Google Sheets integration.

### 📋 Prerequisites

- A Google account
- Access to Google Sheets
- An SMSGate app on your phone

### ⚙️ Installation

1. **Create a new Google Sheet**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Name the spreadsheet "SMS Messages" or your preferred name
   - Rename the first sheet to "Messages" (this is required by the script)
   - Add the following headers to row 1:

     ```
     Timestamp | From | Message | DeviceID | MessageID
     ```

2. **Open the Apps Script Editor**
   - In your Google Sheet, click on `Extensions` > `Apps Script`
   - This will open the Apps Script editor in a new tab

3. **Deploy the Script**
   - Remove any existing code in the editor
   - Copy the code from [`code.gs`](code.gs) and paste it into the Apps Script editor
   - Click the "Save project" icon (floppy disk)

4. **Deploy the Web App**
   - Click on "Deploy" > "New deployment"
   - Click on the "Select type" dropdown and choose "Web app"
   - Under "Execute as", select "Me (your account)"
   - Under "Who has access", select "Anyone"
   - Click "Deploy"
   - Authorize the script when prompted (you may need to select your Google account)
   - Copy the "Web app URL", e.g.

     ```
     https://script.google.com/macros/s/AKfycbx.../exec
     ```

5. **Configure sms-gate.app Webhook**
   - [Register a new webhook](https://docs.sms-gate.app/features/webhooks/#step-2-register-your-webhook-endpoint) with the URL from step 4

6. **Test the Setup**
   - Send a test SMS message to your phone
   - Check your Google Sheet - the message should appear automatically
   - Verify all columns are populated correctly

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- USAGE EXAMPLES -->
## 💻 Usage

### 📨 Webhook Payload Structure

The script expects webhook payloads from SMSGate in the following format:

```json
{
  "deviceId": "your-device-id",
  "payload": {
    "messageId": "unique-message-id",
    "message": "Hello, this is a test message",
    "phoneNumber": "+1234567890",
    "receivedAt": "2024-12-01T10:30:00Z"
  }
}
```

### 🔧 Troubleshooting

- **Sheet not found**: Ensure your sheet is named exactly "Messages"
- **Data not appearing**: Check that your webhook URL is correct and accessible
- **Authorization errors**: Re-deploy the web app with proper permissions
- **Column mismatch**: Verify your headers match exactly: "Timestamp", "From", "Message", "DeviceID", "MessageID"
- **Duplicate messages in sheet**: If you notice the same SMS message being logged multiple times, this occurs because Google Apps Script returns a 302 redirect for POST requests. SMSGate retries webhook delivery on non-2xx responses. To fix:
    - Option 1: Set "Retry count" to 1 in SMSGate settings ([Settings → Webhooks → Retry count](https://docs.sms-gate.app/features/webhooks/#step-5-receive-the-payload))
    - Option 2: Implement deduplication in your Apps Script using the unique `messageId` from the webhook payload

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- CONTRIBUTING -->
## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- LICENSE -->
## 📜 License

Distributed under the Apache License 2.0. See `LICENSE` for more information.

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge
[license-url]: https://opensource.org/licenses/Apache-2.0
[forks-shield]: https://img.shields.io/github/forks/android-sms-gateway/example-webhooks-google-sheets.svg?style=for-the-badge
[forks-url]: https://github.com/android-sms-gateway/example-webhooks-google-sheets/network/members
[stars-shield]: https://img.shields.io/github/stars/android-sms-gateway/example-webhooks-google-sheets.svg?style=for-the-badge
[stars-url]: https://github.com/android-sms-gateway/example-webhooks-google-sheets/stargazers
[issues-shield]: https://img.shields.io/github/issues/android-sms-gateway/example-webhooks-google-sheets.svg?style=for-the-badge
[issues-url]: https://github.com/android-sms-gateway/example-webhooks-google-sheets/issues
