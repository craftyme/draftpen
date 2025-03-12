import { toPng } from "html-to-image";

export const exportAsImage = async (
  element: HTMLElement | null,
  fileName: string = "export.png"
): Promise<void> => {
  if (!element) return;

  try {
    // Store original transform style
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;

    // Temporarily reset transform for export (to avoid exporting with zoom/pan)
    element.style.transform = "";
    element.style.transition = "none";

    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
    });

    // Restore original transform
    element.style.transform = originalTransform;
    element.style.transition = originalTransition;

    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error exporting image:", error);
  }
};

export const copyToClipboard = async (
  element: HTMLElement | null
): Promise<boolean> => {
  if (!element) return false;

  try {
    // Store original transform style
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;

    // Temporarily reset transform for export (to avoid copying with zoom/pan)
    element.style.transform = "";
    element.style.transition = "none";

    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
    });

    // Restore original transform
    element.style.transform = originalTransform;
    element.style.transition = originalTransition;

    // Create a temporary image to get blob data
    const img = document.createElement("img");
    img.src = dataUrl;

    // Wait for image to load
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Create a canvas to draw the image
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw image to canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
    ctx.drawImage(img, 0, 0);

    // Get blob from canvas
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/png", 0.95);
    });

    if (!blob) return false;

    // Use clipboard API to copy image
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    return false;
  }
};
