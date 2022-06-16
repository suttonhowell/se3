import { useDragSVGElement } from '../../../core/hooks/useDragSVGElement';
import {
  addRelation,
  SelectedElementType,
  selectElement,
  ToolType,
} from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';
import { Activity } from './Activity';

export const Canvas = () => {
  const dispatch = useAppDispatch();
  const { graph, selectedElement, isAddingRelation } = useAppSelector((state) => ({
    graph: state.editor.graph,
    selectedElement: state.editor.graph,
    isAddingRelation: state.editor.usingTool === ToolType.AddRelation,
  }));
  const [canvasRef, startDrag, drag, endDrag] = useDragSVGElement();

  const handleOnClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const target = e.target as SVGElement;
    const targetIsActivity = target.classList.contains('activity');
    if (isAddingRelation && targetIsActivity) {
      dispatch(addRelation(target.id));
    }
  };

  const handleOnMouseDown = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const target = e.target as SVGElement;
    // Disable select element feature when tool as active
    if (!isAddingRelation) {
      // Deselects element if the canvas is clicked
      if (selectedElement && target.id == 'canvas') {
        dispatch(selectElement({ id: null }));
      }
      // Selects the element if it an activity
      if (selectedElement && target.classList.contains('activity')) {
        dispatch(selectElement({ id: target.id, type: SelectedElementType.Activity }));
      }
    }
  };

  return (
    <svg
      onMouseDown={(e) => {
        startDrag(e);
        handleOnMouseDown(e);
      }}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onMouseMove={drag}
      onClick={handleOnClick}
      id="canvas"
      ref={canvasRef}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {graph.activities.map((activity) => (
        <Activity key={activity.aid} {...activity} />
      ))}
    </svg>
  );
};
