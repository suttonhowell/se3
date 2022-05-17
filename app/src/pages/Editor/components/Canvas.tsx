import { Button } from '@mui/material';
import { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';
// import { Activity } from './Activity';

export const Canvas = () => {
  const { graph, selectedElement } = useAppSelector((state) => state.editor);
  // const canvasRef = useRef<SVGSVGElement>(null);
  const selectedRef = useRef<SVGRectElement>(null);
  const dispatch = useAppDispatch();
  // const [selectedElement, setSelectedElement] = useState<>()

  // const startDrag = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
  //   if(e.currentTarget.contains('draggable') {

  //   })
  // };

  const startDrag = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if ((e.target as SVGAElement).classList.contains('draggable')) {
      // selectedRef = e.target;
    }
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

  return (
    <>
      <Button onClick={() => getThemeMode()}>Get theme mode</Button>
      <Button onClick={() => toggleMode()}>Toggle dark mode</Button>
      <Button onClick={() => resetSystem()}>Reset to system</Button>

      <Button component={RouterLink} variant="contained" to="/">
        Go to frontpage
      </Button>
      <svg
        onClick={(e) => {
          startDrag(e);
          // console.log('curentTarget', e.currentTarget);
          // console.log('target', e.target);
        }}
        // onMouseMove={(e) => {
        //   console.log(e.currentTarget);
        // }}
        id="canvas"
        // ref={canvasRef}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <rect
          className="draggable"
          x={100}
          y={100}
          // onClick={(e) => console.log(e.currentTarget)}
          rx="10"
          ry="10"
          width="100"
          height="100"
          stroke="black"
          fill="transparent"
          strokeWidth="5"
        />
        {/* {graph &&
          graph.activies.map((activity) => (
            <Activity
              key={activity.aid}
              ref={selectedElement == activity.aid ? selectedRef : null}
              canvasRef={canvasRef}
              {...activity}
            />
          ))} */}
      </svg>
    </>
  );
};
