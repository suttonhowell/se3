import { useRef, useState } from 'react';
import { Position } from '../models/DCRGraph';

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

  const startDrag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const target = e.target as SVGElement;
    if (target.classList.contains('draggable')) {
      setDraggedElement(e.target as SVGElement);
      const { x, y } = getRelativeMousePosition(e, canvasRef);
      setOffset({
        x: x - parseFloat(target.getAttributeNS(null, 'x') || '0'),
        y: y - parseFloat(target.getAttributeNS(null, 'y') || '0'),
      });
    }
  };

  const drag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (draggedElement && offset) {
      e.preventDefault();
      const { x, y } = getRelativeMousePosition(e, canvasRef);
      draggedElement.setAttributeNS(null, 'x', (x - offset.x).toString());
      draggedElement.setAttributeNS(null, 'y', (y - offset.y).toString());
    }
  };

  const endDrag = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (draggedElement) {
      setDraggedElement(null);
    }
  };

  return [canvasRef, startDrag, drag, endDrag];
};
