import { useDragSVGElement } from '../../../core/hooks/useDragSVGElement';
import { selectElement } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';
import { Activity } from './Activity';

export const Canvas = () => {
  const dispatch = useAppDispatch();
  const { graph, selectedElementAid } = useAppSelector((state) => state.editor);
  const [canvasRef, startDrag, drag, endDrag] = useDragSVGElement();

  const handleDeselectElement = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (selectedElementAid && (e.target as SVGElement).id == 'canvas') {
      dispatch(selectElement(null));
    }
  };

  return (
    <svg
      onMouseDown={startDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onMouseMove={drag}
      onClick={handleDeselectElement}
      id="canvas"
      ref={canvasRef}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {graph && graph.activities.map((activity) => <Activity key={activity.aid} {...activity} />)}
    </svg>
  );
};
