/* eslint-disable react/button-has-type */
import '../App.css';
import ReactDOMServer from 'react-dom/server';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
// eslint-disable-next-line import/no-extraneous-dependencies
import { saveAs } from 'file-saver';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// eslint-disable-next-line react/prop-types
function CustomHeading({ level, children }) {
  const Heading = `h${level}`;
  let color = 'inherit';

  if (level === 1) {
    color = 'blue';
  } else if (level === 2) {
    color = 'green';
  }

  return <Heading style={{ color }}>{children}</Heading>;
}

function App() {
  const [text, setText] = useState(() => {
    const storedText = localStorage.getItem('slidesText');
    // eslint-disable-next-line no-unneeded-ternary
    return storedText ? storedText : `# Hacker Slides
  ### Hack together simple slides
  
  ---
  
  ## The Basics
  
  - Separate slides using  on a blank line
  - Write github flavored markdown
  - Click 'Present' (top right) when you're ready to talk
  
  --
  
  ## Quick tips
  
  - There is also a speaker view, with notes - press '
  - Press '' with focus on the presentation for shortcuts
  - <em>You can use html when necessary</em>
  - Share the 'Present' URL with anyone you like!
  
  Note:
  - Anything after  will only appear here
  
  --
  
  ## Learn more
  
  - [RevealJS Demo/Manual](http://lab.hakim.se/reveal-js)
  - [RevealJS Project/README](https://github.com/hakimel/reveal.js)
  - [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown)
  `;
  });
  const [slides, setSlides] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [hasThreeHyphens, setHasThreeHyphens] = useState(false);

  useEffect(() => {
    localStorage.setItem('slidesText', text);
    const updatedSlides = text.split(/---|\n---|--|\n--/).map((slide) => slide.trim()).filter((slide) => slide !== '');
    setSlides(updatedSlides);
    setCurrentSlide(0);
  }, [text]);

  const handleLeftPresentation = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleRightPresentation = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  const openPresentation = () => {
    const slidesHTML = slides
      .map((slide) => `
        <div>
          <div class="slide-content">
            ${ReactDOMServer.renderToString(<ReactMarkdown>{slide}</ReactMarkdown>)}
          </div>
        </div>
      `)
      .join('');

    // Store the slides HTML in local storage
    localStorage.setItem('slidesHTML', slidesHTML);

    // Open the presentation window
    const presentationWindow = window.open('', '_self');
    if (presentationWindow) {
      const storedSlidesHTML = localStorage.getItem('slidesHTML');

      presentationWindow.document.write(`
        <html>
          <head>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel/slick/slick.css" />
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel/slick/slick-theme.css" />
            <style>
              body { margin: 0; }
              .slick-next {
                right: 17px;
                position: fixed
            }
              .slick-list{
                height:auto
              }
              .slick-next:before {
                background: black;
              }
              .slick-slide {  height: 88%; display: flex; align-items: center; justify-content: center; font-size: 26px }
              .slide-content { width: 100%; max-width: 800px; margin: 0 auto; text-align: center; }
              
              .slide-content h1 { color: blue; }
              .slide-content h2 { color: green; }
              .slide-content p { color: red; }
            </style>
          </head>
          <body>
            <div class="slick-slider">
              ${storedSlidesHTML}
            </div>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/slick-carousel/slick/slick.min.js"></script>
            <script>
              $(document).ready(function() {
                $('.slick-slider').slick({
                  dots: true,
                  infinite: true,
                  speed: 450,
                  slidesToShow: 1,
                  slidesToScroll: 1
                });
              });
            </script>
          </body>
        </html>
      `);
      presentationWindow.document.close();
    }
  };
  const downloadSlides = () => {
    const fileName = 'slides.md';
    const fileContent = slides.join('\n---\n');
    const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, fileName);
  };

  return (
    <>
      {' '}

      <div style={{ display: 'flex', height: '100%' }}>
        <button disabled={slides.length === 0} onClick={openPresentation}>Present</button>
        <div style={{ width: '50%', boxSizing: 'border-box' }}>
          <h1 className="headings" style={{ textAlign: 'center' }}>Your plain text</h1>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Enter plain text here..."
            style={{
              width: '97%', height: '84%', border: 'none', outline: 'none', resize: 'none',
            }}
          />
        </div>
        <div style={{ width: '50%', boxSizing: 'border-box', overflow: 'auto' }}>
          <div
            style={{
              width: '98%',
              minHeight: '100%',
              borderRadius: '4px',
              backgroundColor: 'black',
              // padding: '6px',
              position: 'relative',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="control-icon" onClick={handleLeftPresentation} />
              <FontAwesomeIcon icon={faArrowRight} className="control-icon" onClick={handleRightPresentation} />
            </div>
            <h1 className="headings" style={{ textAlign: 'center', color: 'white' }}>Your MarkDown</h1>
            {slides.length > 0 ? (
              <div
                style={{
                  width: '100%',
                  wordWrap: 'break-word',
                  color: 'white',
                  minHeight: '89vh',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="container" style={{ textAlign: 'center', width: '88%' }}>
                  <ReactMarkdown components={{ h1: CustomHeading, h2: CustomHeading }}>
                    {slides[currentSlide]}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  wordWrap: 'break-word',
                  color: 'white',
                  minHeight: '89vh',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#999',
                  }}
                >
                  Your Markdown content here...
                </span>
              </div>
            )}
          </div>
        </div>
        <button disabled={slides.length === 0} style={{ width: '72px' }} onClick={downloadSlides}>
          <FontAwesomeIcon icon={faDownload} />
          {' '}
          Download Slides
        </button>
      </div>
    </>
  );
}

export default App;
