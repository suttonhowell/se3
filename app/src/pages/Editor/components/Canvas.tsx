import { Box, Button } from '@mui/material';
import { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { selectElement } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';
import { Activity } from './Activity';
// import { Activity } from './Activity';

const getMousePosition = (
  e: React.MouseEvent<SVGElement, MouseEvent>,
  canvasRef: SVGSVGElement
) => {
  const CTM = canvasRef.getCTM() as DOMMatrix;
  return {
    x: (e.clientX - CTM.e) / CTM.a,
    y: (e.clientY - CTM.f) / CTM.d,
  };
};

export const Canvas = () => {
  const { graph, selectedElement, offset } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();
  const canvasRef = useRef<SVGSVGElement>(null);
  const selectedRef = useRef<SVGRectElement>(null);

  const drag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (selectedElement && selectedRef.current && offset) {
      e.preventDefault();
      const { x, y } = getMousePosition(e, canvasRef.current as SVGSVGElement);
      selectedRef.current.setAttributeNS(null, 'x', (x - offset.x).toString());
      selectedRef.current.setAttributeNS(null, 'y', (y - offset.y).toString());
    }
  };

  // Deselects an element if the canvas is clicked or the mouse click ends
  const handleOnMouseUp = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (selectedElement) {
      dispatch(selectElement(null));
    }
    console.log(selectedRef.current);
  };

  const resetSystem = async () => {
    await window.darkMode.system();
  };
  const getThemeMode = async () => {
    const mode = await window.darkMode.get();
    console.log(mode);
  };
  const toggleMode = async () => {
    await window.darkMode.toggle();
  };
  console.log('canvas rerendered');
  return (
    <>
      <Box>
        <Button onClick={() => getThemeMode()}>Get theme mode</Button>
        <Button onClick={() => toggleMode()}>Toggle dark mode</Button>
        <Button onClick={() => resetSystem()}>Reset to system</Button>

        <Button component={RouterLink} variant="contained" to="/">
          Go to frontpage
        </Button>
      </Box>
      <svg
        onMouseUp={handleOnMouseUp}
        onMouseMove={drag}
        id="canvas"
        ref={canvasRef}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        {graph &&
          graph.activies.map((activity) => (
            <Activity
              key={activity.aid}
              ref={selectedElement == activity.aid ? selectedRef : null}
              canvasRef={canvasRef}
              {...activity}
            />
          ))}
      </svg>
    </>
  );
};
