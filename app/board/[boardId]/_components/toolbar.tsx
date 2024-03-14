import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2
} from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { CanvasMode, CanvasState, LayerType } from '@/types/canvas';

import { ToolButton } from './tool-button';

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
          isDisabled={false}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text })}
          isActive={
            canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Text
          }
          isDisabled={false}
        />
        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Note
          }
          isDisabled={false}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
          isDisabled={false}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() =>
            setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Ellipse })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse
          }
          isDisabled={false}
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          isActive={canvasState.mode === CanvasMode.Pencil}
          isDisabled={false}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton label="Undo" icon={Undo2} onClick={undo} isDisabled={!canUndo} />
        <ToolButton label="Redo" icon={Redo2} onClick={redo} isDisabled={!canRedo} />
      </div>
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-4 flex flex-col gap-y-4 h-[360px] w-[52px]">
      <Skeleton className="h-[80%] w-full" />
      <Skeleton className="h-[20%] w-full" />
    </div>
  );
};
