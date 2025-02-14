import { useState } from 'react'
import styled from 'styled-components'
import ColorPicker from './components/ColorPicker'
import BurnPadPreview from './components/BurnPadPreview'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import './App.css'

const AppContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
`;

const ControlPanel = styled.div`
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    max-width: 100%;
    order: 2;
    padding: 0;
    align-items: center;
  }
`;

const Section = styled.section`
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;

  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    text-align: left;
    padding: 0 5px;
  }

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
    width: 100%;
  }
`;

const FileUpload = styled.div`
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 2px dashed #cbd5e0;
    border-radius: 6px;
    background-color: #f8fafc;
    cursor: pointer;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:hover {
      border-color: #718096;
      background-color: #edf2f7;
    }

    @media (max-width: 768px) {
      padding: 0.75rem;
    }
  }
`;

const PreviewSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 0;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    order: 1; // Move preview above controls on mobile
  }
`;

const PreviewWrapper = styled.div`
  width: 100%;
  max-width: 740px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    transform: none;
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.8rem;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  background-color: white;
  color: #000000;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0.75rem;
    width: calc(100% - 10px);
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  background-color: #000000;
  color: white;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  box-sizing: border-box;

  &:hover {
    background-color: #333333;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 16px;
    width: calc(100% - 10px);
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  gap: 8px;
  max-width: 400px;
  padding: 0.5rem;
  background-color: #f8fafc;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, 40px);
    justify-content: center;
    max-width: 100%;
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  max-width: 740px;
  margin: 0 auto;
  position: relative;
  background-color: white;

  @media (max-width: 768px) {
    width: auto;
    min-width: 740px;
  }
`;

const Instructions = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #4a5568;
  text-align: left;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: 1rem auto 0;
    padding: 0.75rem;
    font-size: 0.85rem;
    width: calc(100% - 10px);
  }

  h3 {
    color: #2c3e50;
    font-size: 1rem;
    margin-bottom: 0.75rem;
    text-align: left;

    @media (max-width: 768px) {
      margin-bottom: 0.5rem;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }

  li {
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    position: relative;
    text-align: left;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #4299e1;
    }

    @media (max-width: 768px) {
      margin-bottom: 0.4rem;
    }
  }

  .note {
    margin-top: 0.75rem;
    font-style: italic;
    font-size: 0.85rem;
    text-align: left;

    @media (max-width: 768px) {
      margin-top: 0.5rem;
      font-size: 0.8rem;
    }
  }
`;

function App() {
  // Burn Pad states
  const [corduraColor, setCorduraColor] = useState('#FFFFFF')
  const [baseColor, setBaseColor] = useState('#FFFFFF')
  const [burnPadLogo, setBurnPadLogo] = useState(null)
  
  // Seat states
  const [wearLeatherColor, setWearLeatherColor] = useState('#FFFFFF')
  const [seatColor, setSeatColor] = useState('#FFFFFF')
  const [pipingColor, setPipingColor] = useState('#FFFFFF')
  const [accentColor, setAccentColor] = useState('#FFFFFF')
  const [seatLogo, setSeatLogo] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [title, setTitle] = useState('')

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setBurnPadLogo(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const generatePDF = async () => {
    if (isGenerating) return;
    
    try {
      setIsGenerating(true);
      
      // Create a timestamp for unique filenames
      const timestamp = new Date().getTime();
      
      const previewElement = document.querySelector('.preview-container');
      
      if (!previewElement) {
        console.error('Preview element not found');
        return;
      }

      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: true,
        imageTimeout: 0,
        removeContainer: false, // Changed to false to prevent DOM manipulation
        allowTaint: true,
        width: previewElement.offsetWidth + 4,
        height: previewElement.offsetHeight + 4,
        x: -2,
        y: -2
      });

      // Create PDF with A4 landscape
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // A4 dimensions
      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 20;

      // Calculate image dimensions
      const maxWidth = pageWidth - (margin * 2);
      const maxHeight = pageHeight - (margin * 2);
      
      const imgRatio = canvas.width / canvas.height;
      let finalWidth = maxWidth;
      let finalHeight = maxWidth / imgRatio;

      if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = maxHeight * imgRatio;
      }

      // Center the image
      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      // Add title if provided
      if (title) {
        pdf.setFontSize(16);
        const titleWidth = pdf.getStringUnitWidth(title) * 16 / pdf.internal.scaleFactor;
        const titleX = (pageWidth - titleWidth) / 2;
        pdf.text(title, titleX, margin - 10);
      }

      pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', x, y, finalWidth, finalHeight);

      // Add specs at bottom
      pdf.setFontSize(10);
      let specs = `Date: ${new Date().toLocaleDateString()}`;
      if (corduraColor !== 'transparent') {
        specs += `  |  Cordura: ${corduraColor.toUpperCase()}`;
      }
      if (baseColor !== 'transparent') {
        specs += `  |  Base: ${baseColor.toUpperCase()}`;
      }

      const textWidth = pdf.getStringUnitWidth(specs) * 10 / pdf.internal.scaleFactor;
      const textX = (pageWidth - textWidth) / 2;
      pdf.text(specs, textX, pageHeight - 10);

      // Save the PDF locally with timestamp to ensure unique filenames
      pdf.save(`${title || 'burnpad'}-mockup-${timestamp}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
      // Clean up any canvas elements that might have been created
      const canvasElements = document.querySelectorAll('canvas');
      canvasElements.forEach(canvas => {
        if (canvas.parentNode && !canvas.parentNode.classList.contains('preview-container')) {
          canvas.parentNode.removeChild(canvas);
        }
      });
    }
  }

  return (
    <AppContainer>
      <MainContent>
        <TopSection>
          <ControlPanel>
            <Section>
              <h3>Upload Logo</h3>
              <FileUpload>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </FileUpload>
            </Section>

            <Section>
              <ColorPicker
                label="Cordura Color"
                selectedColor={corduraColor}
                onColorSelect={setCorduraColor}
              />
            </Section>

            <Section>
              <ColorPicker
                label="Base Color"
                selectedColor={baseColor}
                onColorSelect={setBaseColor}
              />
            </Section>

            <Input
              type="text"
              placeholder="Enter mockup title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Button 
              onClick={generatePDF} 
              disabled={isGenerating}
              style={{ opacity: isGenerating ? 0.7 : 1 }}
            >
              {isGenerating ? 'Generating...' : 'Generate PDF'}
            </Button>

            <Instructions>
              <h3>Quick Guide</h3>
              <ul>
                <li>Select colors for each section using the color swatches</li>
                <li>Upload your logo if desired</li>
                <li>Add a title for your mockup (optional)</li>
                <li>Click Generate PDF to create your mockup</li>
              </ul>
              <div className="note">
                Note: For best results, use a .PNG file with a transparent background for your logo.
              </div>
            </Instructions>
          </ControlPanel>

          <PreviewSection>
            <PreviewWrapper>
              <BurnPadPreview
                corduraColor={corduraColor}
                baseColor={baseColor}
                logo={burnPadLogo}
              />
            </PreviewWrapper>
          </PreviewSection>
        </TopSection>
      </MainContent>
    </AppContainer>
  )
}

export default App
