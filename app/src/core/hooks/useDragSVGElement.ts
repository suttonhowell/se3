import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Position } from '../models/DCRGraph';
import { moveActivity } from '../redux/features/editor/editorSlice';
import { useAppSelector } from '../redux/hooks';

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

// Gets the X and Y value from transform=(translate) property
const getTranslateXY = (target: SVGElement) => {
  const style = window.getComputedStyle(target);
  const transfromMatrix = style.transform;
  var matrixValues = transfromMatrix.match(/matrix.*\((.+)\)/);
  if (matrixValues) {
    matrixValues = matrixValues[1].split(', ');
    return { x: parseFloat(matrixValues[4]), y: parseFloat(matrixValues[5]) };
  } else {
    return { x: 0, y: 0 };
  }
};

type UseDragSVGElementHook = [
  React.RefObject<SVGSVGElement>,
  (e: React.MouseEvent<SVGElement, MouseEvent>) => void,
  (e: React.MouseEvent<SVGElement, MouseEvent>) => void,
  (e: React.MouseEvent<SVGElement, MouseEvent>) => void
];

export const useDragSVGElement = (): UseDragSVGElementHook => {
  const dispatch = useDispatch();
  const selectedElement = useAppSelector((state) => state.editor.selectedElement);
  const canvasRef = useRef<SVGSVGElement>(null);
  const [aid, setAid] = useState<string>('');
  const [draggedElement, setDraggedElement] = useState<(EventTarget & SVGElement) | null>(null);
  const [offset, setOffset] = useState<Position | null>(null);

  const startDrag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const target = e.target as SVGElement;
    if (target.classList.contains('draggable')) {
      const gElement = target.parentNode as SVGElement;
      const { x: mouseX, y: mouseY } = getRelativeMousePosition(e, canvasRef);
      const { x, y } = getTranslateXY(gElement);
      setDraggedElement(gElement);
      setAid(target.id);
      setOffset({
        x: mouseX - x,
        y: mouseY - y,
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
    if (draggedElement && selectedElement) {
      const { x, y } = getTranslateXY(draggedElement);
      // True if the activity was moved doing the dragging phase
      if (x !== selectedElement.position.x && y !== selectedElement.position.y) {
        const position = { x: x, y: y };
        dispatch(moveActivity({ aid, position }));
      }
    }
    setDraggedElement(null);
    setAid('');
  };

  return [canvasRef, startDrag, drag, endDrag];
};
