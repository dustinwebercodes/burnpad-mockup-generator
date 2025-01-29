import styled from 'styled-components';

const ColorPickerContainer = styled.div`
  width: 100%;
  max-width: 400px;
  
  h4 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    padding: 0 5px;

    @media (max-width: 768px) {
      text-align: left;
      margin-bottom: 0.8rem;
      font-size: 1rem;
    }
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  gap: 8px;
  width: 100%;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 8px;
  box-sizing: border-box;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(35px, 1fr));
    gap: 6px;
    padding: 0.75rem;
    width: calc(100% - 10px);
    margin: 0 auto;
  }
`;

const SwatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    gap: 3px;
  }
`;

const ColorSwatch = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.selected ? '#4299e1' : 'transparent'};
  border-radius: 6px;
  background-color: ${props => props.color};
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: all 0.2s ease;
  box-shadow: ${props => props.selected ? '0 0 0 2px #fff, 0 0 0 4px #4299e1' : '0 2px 4px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    border-width: 1.5px;
  }
`;

const ColorText = styled.span`
  font-size: 0.7rem;
  color: #4a5568;
  text-align: center;
  visibility: ${props => props.selected ? 'visible' : 'hidden'};
  height: 14px;

  @media (max-width: 768px) {
    font-size: 0.65rem;
    height: 12px;
  }
`;

// Vinyl color swatches
const vinylSwatches = [
  '#FFFFFF',    // White
  '#0D0D0D',    // Black (5% lighter)
  '#000080',    // Navy
  '#FF0000',    // Red
  '#D2B48C',    // Tan
  '#215E21',    // Hunter Green
  '#228B22',    // Forest Green
  '#800080',    // Purple
  '#808080',    // Grey
  '#4169E1',    // Royal Blue
  '#FFD700',    // Yellow
  '#8B4513'     // Brown
];

// Cordura color swatches
const corduraSwatches = [
  '#FFFFFF',    // White
  '#0D0D0D',    // Black (5% lighter)
  '#215E21',    // Hunter Green
  '#4169E1',    // Royal
  '#FF0000',    // Red
  '#000080',    // Navy
  '#8B4513'     // Brown
];

const ColorPicker = ({ selectedColor, onColorSelect, label }) => {
  // Choose color set based on label
  const colorSwatches = label.includes('Cordura') ? corduraSwatches : vinylSwatches;

  return (
    <ColorPickerContainer>
      <h4>{label === 'Base Color' ? 'Base Vinyl Color' : label}</h4>
      <ColorGrid>
        {colorSwatches.map((color, index) => (
          <SwatchContainer key={index}>
            <ColorSwatch
              color={color}
              selected={selectedColor === color}
              onClick={() => onColorSelect(color)}
              aria-label={`Select color ${color}`}
            />
            <ColorText selected={selectedColor === color}>
              {color === 'transparent' ? 'None' : color.toUpperCase()}
            </ColorText>
          </SwatchContainer>
        ))}
      </ColorGrid>
    </ColorPickerContainer>
  );
};

export default ColorPicker; 