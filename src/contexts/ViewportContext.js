import { createContext, useContext, useMemo, useState } from 'react';
import { WebMercatorViewport } from 'react-map-gl';

export const ViewportContext = createContext(null);
export const ViewportContextUpdate = createContext((data) => {});
export const ViewportContextBounds = createContext(null);

export function useViewport() {
  return useContext(ViewportContext);
}

export function useViewportUpdate() {
  return useContext(ViewportContextUpdate);
}

export function useViewportBounds() {
  return useContext(ViewportContextBounds);
}

export function ViewportProvider({ children }) {
  const [viewport, setViewport] = useState(null);

  const viewportBounds = useMemo(() => {
    if (!viewport) return null;

    const bounds = new WebMercatorViewport(viewport).getBounds();
    return {
      sw: { lng: bounds[0][0], lat: bounds[0][1] },
      ne: { lng: bounds[1][0], lat: bounds[1][1] },
    };
  }, [viewport]);

  return (
    <ViewportContext.Provider value={viewport}>
      <ViewportContextUpdate.Provider value={setViewport}>
        <ViewportContextBounds.Provider value={viewportBounds}>
          {children}
        </ViewportContextBounds.Provider>
      </ViewportContextUpdate.Provider>
    </ViewportContext.Provider>
  );
}
