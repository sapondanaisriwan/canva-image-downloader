import { useEffect, useState } from "react";
import Image from "next/image"
import msg from "../../data/message";

export default function Card() {

  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [svg, setSvg] = useState([]);
  const [jpg, setJpg] = useState([]);
  const [png, setPng] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (message, sender, reply) => {
      if (
        message.from === msg.background &&
        message.action === msg.displayData
      ) {
        setData(message.data);
        setImages(message.data.images);
        setSvg(message.data.svg);
        setJpg(message.data.jpg);
        setPng(message.data.png);
        setLoading(false);
        reply();
        return true;
      }
    };
    console.log("Init")
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      console.log("Remove removeListener")
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, []);

  if (loading) return null;

  return (
    <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-100 h-full ml-60">
      {images.map((url, index) => (
        <div key={index} className="relative group overflow-hidden rounded-lg">
          <Image
            alt={`image-${index}`}
            className="aspect-[3/4] w-full group-hover:opacity-50 transition-opacity"
            height={300}
            width={400}
            src={url}
            loading="lazy"
            objectFit="contain"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <button>
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}
