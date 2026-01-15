# Language Translation Tool

A React-based web application that allows users to translate text between languages using a local model (Gemma). It features dropdown menus to choose source and target languages, and displays the translated text dynamically.

## 🌐 Features

- **Multi-language Support**: Select from available languages using intuitive dropdown menus
- **Real-time Translation**: Enter text and get instant translations using a local model
- **Live Stream Parsing**: Handles response streams for efficient data processing
- **Error Handling**: Comprehensive error management for better user experience
- **Clean UI**: Professional interface built with Bootstrap and React-Bootstrap
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend Framework**: React
- **UI Library**: Bootstrap (React-Bootstrap)
- **HTTP Client**: Fetch API
- **Language Data**: LibreTranslate API (`https://libretranslate.com/languages`)
- **Translation Engine**: Local Ollama model (Gemma)
- **Build Tool**: Create React App

## 🔧 How It Works

1. **Language Loading**: Fetches available languages from LibreTranslate API
2. **User Input**: Users enter text and select source and target languages
3. **Translation Request**: Text is sent to the local translation endpoint via Ollama
4. **Stream Processing**: Response stream is parsed and displayed dynamically
5. **Result Display**: Translated text appears in real-time on the UI

## 📦 Installation & Usage

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Ollama with Gemma model installed and running locally

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/malak-khouja/language-translation-tool.git
cd language-translation-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start Ollama with the Gemma model:
```bash
ollama run gemma
```

4. Start the development server:
```bash
npm start
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## 🚀 Running the Application

### Development Mode
```bash
npm start
```
The app runs at [http://localhost:3000](http://localhost:3000) with hot reload enabled.

### Production Build
```bash
npm run build
```
Builds the app for production to the `build` folder.

### Running Tests
```bash
npm test
```
Launches the test runner in interactive watch mode.

## 📝 Usage Instructions

1. **Select Source Language**: Choose the language of the text you want to translate
2. **Select Target Language**: Choose the language you want to translate to
3. **Enter Text**: Type or paste the text in the input field
4. **Get Translation**: The translation appears automatically in the output area
5. **Copy Result**: You can copy the translated text to your clipboard

## ⚙️ Configuration

### API Endpoints
- **Language List**: `https://libretranslate.com/languages`
- **Translation Endpoint**: `http://localhost:11434/api/generate` (default Ollama endpoint)

Ensure your local Ollama server is running on the default port (11434) or update the endpoint configuration in the application.

## 📂 Project Structure

```
language-translation-tool/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   └── setupTests.js
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for bugs and feature requests.

## 📄 License

This project is open source and available under the MIT License.

## ❓ Troubleshooting

### Translation not working
- Ensure Ollama is running: `ollama list` to verify Gemma model is installed
- Check that the local endpoint is accessible
- Look for errors in the browser console

### Language dropdown empty
- Check internet connection (needed for LibreTranslate API)
- Verify CORS settings if using a remote API

### Slow translations
- Ensure your system has adequate resources for running the local model
- Consider using a machine with GPU acceleration for faster processing

## 📧 Contact & Support

For questions or support, please reach out through GitHub Issues or visit the project repository.

---

**Made with ❤️ for language lovers everywhere**
