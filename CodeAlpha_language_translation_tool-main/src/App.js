import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";

function App() {
  const [Languages, setLanguage] = useState([]);
  const [texte, setTexte] = useState("");
  const [nativeLang, setNativeLang] = useState('Translate from');
  const [nativeCode, setNativeCode] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [translatedLang, setTranslatedLang] = useState('Translate to');
  const [translatedCode, setTranslatedCode] = useState("");

  useEffect(() => {
    fetch('https://libretranslate.com/languages')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setLanguage(data);
      });
  },[]);

  const translateText = async () => {
  if (!texte || !nativeCode || !translatedCode) {
    alert("Please enter text and select both languages.");
    return;
  }

  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3:1b",
        prompt: `donner moi juste la traductin sans aucun autre mot en ${translatedLang} de : ${texte}`,
        stream: true
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Translation error:", errorData);
      alert("Translation failed: " + errorData.error);
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let output = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter(Boolean);

      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            output += parsed.response;
          }
        } catch (err) {
          console.warn("Failed to parse line:", line);
        }
      }
    }

    setTranslatedText(output.trim());
    console.log("Translated text:", output.trim());

  } catch (error) {
    console.error("Network error:", error);
    alert("Something went wrong with the translation request.");
  }
    
};

  

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <p>
              <strong>Language Translation Tool</strong>
            </p>
          </Col>
        </Row>

        <p>
          <Row>
            <Col>
              <DropdownButton id="dropdown-basic-button" title={nativeLang}>
                {Languages.map((Language) => (
                    <Dropdown.Item 
                      href={`#/action-${Language.code}`}
                      key={Language.code}
                      onClick={() => {
                        setNativeLang(Language.name);
                        setNativeCode(Language.code);
                        console.log("Selected:", Language.name, Language.code);
                      }
                    }>{Language.name}</Dropdown.Item>
                  ))
                }
              </DropdownButton>
            </Col>
            <Col>
              <DropdownButton id="dropdown-basic-button" title={translatedLang}>
                {Languages.map((Language) => (
                    <Dropdown.Item 
                      href={`#/action-${Language.code}`}
                      key={Language.code}
                      onClick={() => {
                        setTranslatedLang(Language.name);
                        setTranslatedCode(Language.code);
                        console.log("Selected:", Language.name, Language.code);
                      }}
                      >{Language.name}</Dropdown.Item>
                  ))
                }
              </DropdownButton>
            </Col>
          </Row>
        </p>

        <p>
          <Row>
            <Col>
              <>
                <Form.Control 
                  type="text" 
                  placeholder="write text"
                  value={texte}
                  onChange={(e) => {
                    setTexte(e.target.value);
                    console.log(e.target.value)
                  }}
                />
              </>
            </Col>
          </Row>
        </p>
        <p>
          <Row>
            <Col>
              <Button variant="primary" onClick={translateText} >Translate</Button>
            </Col>
          </Row>
        </p>
        <p>
          <Row>
            <div><strong>Traduction :</strong> {translatedText}</div>
          </Row>
        </p>
      </Container>
    </div>
  );
}

export default App;
