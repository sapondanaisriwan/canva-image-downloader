import msg from "../data/message";

function getImages() {
  const images = Array.from(document.images, (img) => img.src).filter(
    (image) =>
      !image.includes("document-export.canva.com") && !image.startsWith("blob")
  );
  const svg = images.filter((image) => image.endsWith(".svg"));
  const png = images.filter((image) => image.endsWith(".png"));
  const jpg = images.filter((image) => image.endsWith(".jpg"));
  const template = images.filter((image) =>
    image.includes("template.canva.com")
  );
  return { images, svg, png, jpg, template };
}

const main = async () => {
  const data = getImages();
  try {
    const response = await chrome.runtime.sendMessage({
      from: msg.contentScript,
      action: msg.openNewTab,
      data: data,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

main();
