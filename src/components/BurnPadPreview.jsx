import styled from 'styled-components';

// Function to darken or lighten a hex color by percentage
const adjustColor = (hex, percent, lighten = false) => {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  if (lighten) {
    // Add the percentage of the remaining distance to white
    r = Math.min(255, r + Math.floor((255 - r) * (percent / 100)));
    g = Math.min(255, g + Math.floor((255 - g) * (percent / 100)));
    b = Math.min(255, b + Math.floor((255 - b) * (percent / 100)));
  } else {
    // Darken each component
    r = Math.floor(r * (1 - percent / 100));
    g = Math.floor(g * (1 - percent / 100));
    b = Math.floor(b * (1 - percent / 100));
  }

  // Convert back to hex
  const adjustedHex = '#' + 
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0');

  return adjustedHex;
};

// Function to get stitch color
const getStitchColor = (color) => {
  // If it's our slightly lighter black (#0D0D0D), lighten by 15%
  if (color === '#0D0D0D') {
    return adjustColor(color, 15, true);
  }
  // For all other colors, darken by 10%
  return adjustColor(color, 10, false);
};

const PreviewContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: white;
  aspect-ratio: 740 / 775; // Maintain the original aspect ratio
`;

const CorduraSection = styled.div`
  width: 100%;
  height: 58%; // 450px / 775px ≈ 58%
  position: relative;
  background-color: ${props => props.color};
  border: 2px solid ${props => getStitchColor(props.color)};
  border-radius: 5px 5px 0 0;
  
  @media (max-width: 768px) {
    width: 740px;
    height: 450px;
  }
`;

const CorduraLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 2px dashed ${props => getStitchColor(props.color)};
  }

  &::before {
    left: 30px;
  }

  &::after {
    right: 30px;
  }
`;

const BaseSection = styled.div`
  width: 100%;
  height: 42%; // 325px / 775px ≈ 42%
  position: relative;
  background-color: ${props => props.color};
  border: 2px solid ${props => getStitchColor(props.color)};
`;

const DashedLines = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  right: 30px;
  bottom: 30px;
  border: 2px dashed ${props => getStitchColor(props.color)};

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 2px dashed ${props => getStitchColor(props.color)};
  }

  &::before {
    left: -2px;
  }

  &::after {
    right: -2px;
  }
`;

const HorizontalLines = styled.div`
  position: absolute;
  top: 0;
  left: 30px;
  right: 30px;
  bottom: 0;

  /* First line 30px below top stitch line */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    border-top: 2px dashed ${props => getStitchColor(props.color)};
  }

  /* Middle line */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 150px;
    border-top: 2px dashed ${props => getStitchColor(props.color)};
  }
`;

const LastHorizontalLine = styled.div`
  position: absolute;
  left: 30px;
  right: 30px;
  top: 240px;
  border-top: 2px dashed ${props => getStitchColor(props.color)};
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const BurnPadPreview = ({ corduraColor, baseColor, logo }) => {
  return (
    <PreviewContainer className="preview-container">
      <CorduraSection color={corduraColor}>
        <CorduraLines color={corduraColor} />
      </CorduraSection>
      <BaseSection color={baseColor}>
        <DashedLines color={baseColor} />
        <HorizontalLines color={baseColor} />
        <LastHorizontalLine color={baseColor} />
        {logo && (
          <LogoContainer>
            <img src={logo} alt="Custom logo" />
          </LogoContainer>
        )}
      </BaseSection>
    </PreviewContainer>
  );
};

export default BurnPadPreview; 