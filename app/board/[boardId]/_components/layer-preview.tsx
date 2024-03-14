'use client';

import { PointerEvent, memo } from 'react';

import { useStorage } from '@/liveblocks.config';
import { LayerType } from '@/types/canvas';

import { Rectangle } from './layer/rectangle';
import { Ellipse } from './layer/ellipse';
import { Text } from './layer/text';
import { Note } from './layer/note';
import { Path } from './layer/path';
import { colorToCss } from '@/lib/utils';

interface LayerPreviewProps {
  layerId: string;
  onLayerPointDown: (e: React.PointerEvent, layer: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({ layerId, onLayerPointDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(layerId));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Path:
        return (
          <Path
            key={layerId}
            points={layer.points}
            onPointerDown={(e: PointerEvent<Element>) => onLayerPointDown(e, layerId)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : '#000'}
            stroke={selectionColor}
          />
        );
      case LayerType.Note:
        return (
          <Note
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn('Unknown layer type');
        return null;
    }
  }
);

LayerPreview.displayName = 'LayerPreview';
