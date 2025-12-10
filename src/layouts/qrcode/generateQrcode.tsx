import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { Button } from "flowbite-react";
import CustomModal from "../../components/modal";
import type { GenerateQrcodeProps } from '@types/qrcode.ts';
import { useDebounce } from "@hooks";

const GenerateQrcode: FC<GenerateQrcodeProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isGenerating,
  userId,
  update
}) => {
  const [url, setUrl] = useState<string>(String(update?.item?.redirectUrl || ""));
  const [isValidUrl, setIsValidUrl] = useState(true);
  const debouncedUrl = useDebounce(url, 300);

  useEffect(()=>{
    if(update?.wantUpdate) {
      setUrl(String(update?.item?.redirectUrl || ""));
    } else {
      setUrl('');
    }
  },[update])

  // Validate URL when debounced value changes
  useEffect(() => {
    if (debouncedUrl === "") {
      setIsValidUrl(true);
    } else if (
      !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
        debouncedUrl
      )
    ) {
      setIsValidUrl(false);
    } else {
      setIsValidUrl(true);
    }
  }, [debouncedUrl]);

  const setUrlHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setUrl(inputValue);
  };

  const handleSubmit = () => {
    if (!url || !isValidUrl) return;
    if(update?.wantUpdate) {
        update?.onUpdate(url, String(update?.item?.id));
    } else {
        onSubmit(url, userId, {
        userAgent: navigator?.userAgent,
        createdAt: new Date(),
        });
    }
    setUrl("");
  };

  return (
    <CustomModal
      header={update?.wantUpdate ? "Update QR Code" : "Generate QR Code"}
      onClose={onClose}
      isOpen={isOpen}
      footer={
        <>
          <Button
            onClick={handleSubmit}
            disabled={!url || !isValidUrl || isGenerating}
            className={`${
              url && isValidUrl && !isGenerating
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {update?.wantUpdate ? (isGenerating ? "Generating..." : "Update QR Code") : (isGenerating ? "Generating..." : "Generate QR Code")}
          </Button>
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            URL (Link)
          </label>
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={setUrlHandler}
              autoFocus={true}
              placeholder="https://example.com"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                !isValidUrl && url !== ""
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              }`}
            />
            {url && isValidUrl && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            )}
          </div>
          {!isValidUrl && url !== "" && (
            <div className="mt-2 flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-sm text-red-600">
                Please enter a valid URL (e.g., https://example.com)
              </p>
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default GenerateQrcode;