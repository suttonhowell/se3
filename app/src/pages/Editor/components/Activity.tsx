import { forwardRef, useState } from 'react';
import { Activity as ActivityType } from '../../../core/models/DCRGraph';
import { selectElement } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch } from '../../../core/redux/hooks';

// const getMousePosition = (
//   e: React.MouseEvent<SVGRectElement, MouseEvent>,
//   canvasRef: SVGSVGElement
// ) => {
//   const CTM = canvasRef.getCTM() as DOMMatrix;
//   return {
//     x: (e.clientX - CTM.e) / CTM.a,
//     y: (e.clientY - CTM.f) / CTM.d,
//   };
// };

interface ActivityProps extends ActivityType {
  canvasRef: React.RefObject<SVGSVGElement>;
  // ref: React.RefObject<SVGRectElement> | null;
}

export const Activity = forwardRef<SVGRectElement, ActivityProps>((props, ref) => {
  const dispatch = useAppDispatch();

  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [position, setPosition] = useState(props.position);
  const [mouseOffset, setMouseOffSet] = useState({ x: 0, y: 0 });

  // const startDrag = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
  //   e.preventDefault();
  //   const { x, y } = getMousePosition(e, props.canvasRef.current as SVGSVGElement);
  //   setMouseOffSet({ x: x - position.x, y: y - position.y });
  //   setIsBeingDragged(true);
  // };
  const startDrag = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(selectElement(props.aid));
    // const { x, y } = getMousePosition(e, props.canvasRef.current as SVGSVGElement);
    // setMouseOffSet({ x: x - position.x, y: y - position.y });
    // setIsBeingDragged(true);
  };

  // const drag = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
  //   if (isBeingDragged) {
  //     e.preventDefault();

  //     const { x, y } = getMousePosition(e, props.canvasRef.current as SVGSVGElement);
  //     setPosition({ x: x - mouseOffset.x, y: y - mouseOffset.y });
  //   }
  // };

  return (
    <rect
      ref={ref}
      className="draggable"
      x={position.x}
      y={position.y}
      onMouseDown={(e) => startDrag(e)}
      onClick={(e) => console.log(e.currentTarget)}
      // onMouseMove={(e) => drag(e)}
      // onMouseUp={() => setIsBeingDragged(false)}
      // onClick={(e) => getMousePosition(props.canvasRef.current as SVGSVGElement, e)}
      rx="10"
      ry="10"
      width="100"
      height="100"
      stroke="black"
      fill="transparent"
      strokeWidth="5"
    />
  );
});
