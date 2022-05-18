import { forwardRef } from 'react';
import { batch } from 'react-redux';
import { Activity as ActivityType } from '../../../core/models/DCRGraph';
import { selectElement, setOffset } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';

interface ActivityProps extends ActivityType {
  canvasRef: React.RefObject<SVGSVGElement>;
}

const getMousePosition = (
  e: React.MouseEvent<SVGElement, MouseEvent>,
  canvasRef: React.RefObject<SVGSVGElement>
) => {
  const CTM = (canvasRef.current as SVGSVGElement).getCTM() as DOMMatrix;
  return {
    x: (e.clientX - CTM.e) / CTM.a,
    y: (e.clientY - CTM.f) / CTM.d,
  };
};

export const Activity = forwardRef<SVGRectElement, ActivityProps>((props, ref) => {
  const { selectedElement } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const startDrag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    const { x, y } = getMousePosition(e, props.canvasRef);
    batch(() => {
      dispatch(selectElement(props.aid));
      dispatch(
        setOffset({
          x: x - props.position.x,
          y: y - props.position.y,
        })
      );
    });
  };

  return (
    <rect
      ref={ref}
      className="draggable"
      x={props.position.x}
      y={props.position.y}
      onMouseDown={(e) => startDrag(e)}
      rx="10"
      ry="10"
      width="100"
      height="100"
      stroke={selectedElement === props.aid ? 'blue' : props.style.borderColor}
      fill={props.style.bgColor}
      strokeWidth="5"
      style={{ cursor: 'move' }}
    />
  );
});
