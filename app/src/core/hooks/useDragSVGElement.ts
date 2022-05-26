import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Position } from '../models/DCRGraph';
import { moveActivity } from '../redux/features/editor/editorSlice';

const getRelativeMousePosition = (
  e: React.MouseEvent<SVGElement, MouseEvent>,
  canvasRef: React.RefObject<SVGSVGElement>
) => {
  const CTM = (canvasRef.current as SVGSVGElement).getCTM() as DOMMatrix;
  return {
    x: (e.clientX - CTM.e) / CTM.a,
    y: (e.clientY - CTM.f) / CTM.d,
  };
};

const getTranslateXY = (target: SVGElement) => {
  const style = window.getComputedStyle(target);
  const transfromMatrix = style.transform;
  var matrixValues = transfromMatrix.match(/matrix.*\((.+)\)/);
  if (matrixValues) {
    matrixValues = matrixValues[1].split(', ');
    return { x: matrixValues[4], y: matrixValues[5] };
  } else {
    return { x: '0', y: '0' };
  }
};

type UseDragSVGElementHook = [
  React.RefObject<SVGSVGElement>,
  (e: React.MouseEvent<SVGElement, MouseEvent>) => void,
  (e: React.MouseEvent<SVGElement, MouseEvent>) => void,
  (e: React.MouseEvent<SVGElement, MouseEvent>) => void
];

export const useDragSVGElement = (): UseDragSVGElementHook => {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [draggedElement, setDraggedElement] = useState<(EventTarget & SVGElement) | null>(null);
  const [offset, setOffset] = useState<Position | null>(null);
  const dispatch = useDispatch();

  const startDrag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const target = e.target as SVGElement;
    if (target.classList.contains('draggable')) {
      const gElement = target.parentNode as SVGElement;
      setDraggedElement(gElement);
      const { x: mouseX, y: mouseY } = getRelativeMousePosition(e, canvasRef);
      const { x, y } = getTranslateXY(gElement);
      setOffset({
        x: mouseX - parseFloat(x || '0'),
        y: mouseY - parseFloat(y || '0'),
      });
    }
  };

  const drag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (draggedElement && offset) {
      e.preventDefault();
      const { x, y } = getRelativeMousePosition(e, canvasRef);
      draggedElement.setAttributeNS(
        null,
        'transform',
        `translate(${x - offset.x},${y - offset.y})`
      );
    }
  };

  const endDrag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (draggedElement) {
      const aid = draggedElement.id;
      const { x, y } = getTranslateXY(draggedElement);
      const position = {
        x: parseFloat(x || '0'),
        y: parseFloat(y || '0'),
      };
      setDraggedElement(null);
      dispatch(moveActivity({ aid, position }));
    }
  };

  return [canvasRef, startDrag, drag, endDrag];
};
