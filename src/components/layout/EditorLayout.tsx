import React, { useState, useRef, useEffect } from "react";
import ExportButtons from "@/components/common/ExportButtons";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface EditorLayoutProps {
  children: React.ReactNode;
  ControlPanel: React.ReactNode;
  onExport?: () => void;
  onCopy?: () => void;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  children,
  ControlPanel,
  onExport,
  onCopy,
}) => {
  const [zoom, setZoom] = useState(100);
  const [isPanning, setIsPanning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320); // Default sidebar width
  const [isResizing, setIsResizing] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const resizeStartXRef = useRef(0);

  // Format zoom value to avoid long decimal places
  const formattedZoom = Math.round(zoom);

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && isSpacePressed)) {
      // Middle mouse button or left button with space key
      setIsPanning(true);
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      // Change cursor to grabbing
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing";
      }
    }
  };

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && canvasRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;

      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  // Handle mouse up to stop panning
  const handleMouseUp = () => {
    setIsPanning(false);
    // Reset cursor
    if (canvasRef.current) {
      canvasRef.current.style.cursor = isSpacePressed ? "grab" : "default";
    }
  };

  // Handle mouse wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY * -0.01;
      // Round the zoom value to avoid floating point issues
      const newZoom = Math.min(Math.max(25, zoom + delta * 10), 400);
      setZoom(Math.round(newZoom * 10) / 10); // Round to 1 decimal place
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Reset view with '0'
      if (e.key === "0" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setZoom(100);
        setPosition({ x: 0, y: 0 });
      }

      // Space key for panning
      if (e.key === " " && !e.repeat && !isSpacePressed) {
        e.preventDefault();
        setIsSpacePressed(true);
        // Change cursor to grab
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "grab";
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Space key released
      if (e.key === " ") {
        e.preventDefault();
        setIsSpacePressed(false);
        // Reset cursor
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "default";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isSpacePressed, zoom]);

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeStartXRef.current = e.clientX;
  };

  // Handle resize move
  useEffect(() => {
    const handleResizeMove = (e: MouseEvent) => {
      if (isResizing) {
        const dx = resizeStartXRef.current - e.clientX;
        const newWidth = Math.min(Math.max(240, sidebarWidth + dx), 600);
        setSidebarWidth(newWidth);
        resizeStartXRef.current = e.clientX;
      }
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [isResizing, sidebarWidth]);

  // Zoom to fit function
  const zoomToFit = () => {
    setZoom(100);
    setPosition({ x: 0, y: 0 });
  };

  // Handle zoom button clicks with proper rounding
  const handleZoomIn = () => {
    setZoom((prev) => {
      const newZoom = Math.min(400, prev + 10);
      return Math.round(newZoom * 10) / 10; // Round to 1 decimal place
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(25, prev - 10);
      return Math.round(newZoom * 10) / 10; // Round to 1 decimal place
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] h-full font-geist">
      {/* Left side - Editor canvas with solid background */}
      <div
        className="flex-1 p-4 overflow-hidden relative bg-[#f2f2f2] dark:bg-[#121212]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Zoom and position controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-[#F8F8F9] dark:bg-[#000000] rounded-md shadow-md p-2 z-10 text-xs">
          <Button
            variant="ghost"
            size="sm"
            onClick={zoomToFit}
            className="h-8 px-2 text-xs dark:bg-[#000000] dark:hover:bg-[#181818]"
          >
            Fit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="h-8 w-8 p-0 text-xs dark:bg-[#000000] dark:hover:bg-[#181818]"
          >
            -
          </Button>
          <div className="w-20 text-center text-xs font-geist-mono">
            {formattedZoom}%
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            className="h-8 w-8 p-0 text-xs dark:bg-[#000000] dark:hover:bg-[#181818]"
          >
            +
          </Button>
        </div>

        {/* Canvas with zoom and position */}
        <div
          ref={canvasRef}
          className="relative flex items-center justify-center h-full w-full"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${
              zoom / 100
            })`,
            transformOrigin: "center",
            transition: isPanning ? "none" : "transform 0.1s ease-out",
          }}
          id="export-container"
        >
          {children}
        </div>
      </div>

      {/* Resize handle */}
      <div
        className="w-1 cursor-col-resize bg-transparent hover:bg-blue-500 active:bg-blue-600 transition-colors"
        onMouseDown={handleResizeStart}
      />

      {/* Right side - Controls sidebar */}
      <div
        className="border-l border-[#CECECF] dark:border-[#333333] bg-[#F2F2F2] dark:bg-[#1E1E1E] flex flex-col min-h-[calc(100vh-80px)] sidebar text-xs text-[#2F3130] dark:text-[#E8E8E8]"
        style={{ width: `${sidebarWidth}px` }}
      >
        <ExportButtons onExportImage={onExport} onCopyToClipboard={onCopy} />
        <div className="flex-1 overflow-y-auto p-4">
          {/* Zoom control slider */}
          <div className="mb-6">
            <label className="block text-xs font-medium mb-2 text-[#2F3130] dark:text-[#E8E8E8]">
              Zoom: <span className="font-geist-mono">{formattedZoom}%</span>
            </label>
            <Slider
              value={[zoom]}
              min={25}
              max={400}
              step={1}
              onValueChange={(value) => {
                // Round to avoid floating point issues
                setZoom(Math.round(value[0] * 10) / 10);
              }}
            />
          </div>
          {/* Keyboard shortcuts help */}
          <div className="mb-6 p-3 bg-[#F8F8F9] dark:bg-[#000000] rounded-md text-xs border border-[#CECECF] dark:border-[#333333]">
            <h3 className="font-medium mb-2 text-[#2F3130] dark:text-[#E8E8E8]">
              Keyboard Shortcuts
            </h3>
            <ul className="space-y-1 text-[#2F3130] dark:text-[#E8E8E8]">
              <li>
                <kbd className="px-1 bg-[#F8F8F9] dark:bg-[#000000] border border-[#CECECF] dark:border-[#333333] rounded font-geist-mono">
                  Space
                </kbd>{" "}
                + Drag: Pan canvas
              </li>
              <li>
                <kbd className="px-1 bg-[#F8F8F9] dark:bg-[#000000] border border-[#CECECF] dark:border-[#333333] rounded font-geist-mono">
                  Ctrl/⌘
                </kbd>{" "}
                + Scroll: Zoom in/out
              </li>
              <li>
                <kbd className="px-1 bg-[#F8F8F9] dark:bg-[#000000] border border-[#CECECF] dark:border-[#333333] rounded font-geist-mono">
                  Ctrl/⌘
                </kbd>{" "}
                +{" "}
                <kbd className="px-1 bg-[#F8F8F9] dark:bg-[#000000] border border-[#CECECF] dark:border-[#333333] rounded font-geist-mono">
                  0
                </kbd>
                : Reset view
              </li>
            </ul>
          </div>
          {ControlPanel}
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
