import { useEffect, useState, type FC } from "react";
import { Button } from "flowbite-react";
import GenerateQrcode, { type UpdateProps } from "./generateQrcode";
import axios from "axios";
import { useAuth } from "react-oidc-context";
import QrcodeDisplay from "./qrcodesDisplay";

export interface QRCodeData {
  id: Number;
  redirectUrl: string;
  urls: {
    local: String;
    prod: String;
  };
  userId: string;
  metaData: {
    userAgent: string;
    timestamp: string;
  };
  createdAt: string;
  scanCount?: number;
}

const QrcodeGenerator: FC = () => {
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const auth = useAuth();
  const userId = String(auth?.user?.profile?.sub || "");
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>(0);
  const [updateProps, setUpdateProps] = useState<UpdateProps>({
    wantUpdate: false,
    onUpdate: () => null,
  });
  const [isViewingMore, setIsViewingMore] = useState<boolean>(false);

  const handleSubmit = async (
    url: string,
    userId: string,
    metaData: object
  ) => {
    setIsGenerating(true);
    axios
      .post(`${import.meta.env.VITE_REST_API}qrcode-scanner-tracker`, {
        redirectUrl: url,
        userId,
        metaData,
      })
      .then(() => {
        fetchQRCodes(true, true);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsGenerating(false);
        setShowModal(false);
      });
  };

  const fetchQRCodes = async (firstRender = true, nullableKey=false) => {
    if(firstRender) {
      setIsLoading(true);
    } else {
      setIsViewingMore(true);
    }
    const limit = 4;
    let key = lastEvaluatedKey === 0 ? null : encodeURIComponent(JSON.stringify(lastEvaluatedKey));
    key = nullableKey ? null : key;
    axios
      .get(
        `${
          import.meta.env.VITE_REST_API
        }qrcode-scanner-tracker?userId=${userId}&limit=${limit}&lastEvaluatedKey=${key}`
      )
      .then((res) => {
        const data = res.data?.qrcodes?.Items?.map(
          ({
            id,
            redirectUrl,
            metaData,
            userId,
            createdAt,
            scanCount,
            urls,
          }: QRCodeData) => ({
            id,
            redirectUrl,
            urls,
            userId,
            metaData,
            createdAt,
            scanCount,
          })
        );
        if (firstRender && nullableKey) {
          setQrCodes(data);
        } else {
          setQrCodes((prev) => [...prev, ...data]);
        }
        setLastEvaluatedKey(res.data.qrcodes?.LastEvaluatedKey);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
        setIsViewingMore(false);
      });
  };
  useEffect(() => {
    fetchQRCodes(true, true);
  }, []);
  const viewMore = () => {
    fetchQRCodes(false);
  };
  const deleteItemHandler = async (id: string): Promise<void> => {
    setIsDeleting(true);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REST_API}qrcode-scanner-tracker?id=${id}`
      );
      if(res.status === 200) {
        setQrCodes(prev=> prev.filter(item=> String(item?.id) !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };
  const editHandler = (qrcode: QRCodeData) => {
    setShowModal(true);
    setUpdateProps({
      wantUpdate: true,
      item: qrcode,
      onUpdate: (url, id) => {
        setIsGenerating(true);
        axios
          .patch(
            `${import.meta.env.VITE_REST_API}qrcode-scanner-tracker?id=${id}`,
            {
              redirectUrl: url,
            }
          )
          .then((res) => {
            const { item } = res.data;
            setQrCodes(qrCodes.map((qrcode):QRCodeData=> {
              if(qrcode.id === item.id) {
                return item;
              }
              return qrcode;
            }));
          })
          .catch((err) => console.error(err))
          .finally(() => {
            setIsGenerating(false);
            setShowModal(false);
            setUpdateProps({ wantUpdate: false, onUpdate: () => null });
          });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
          QR Code Generator
        </h1>
        <p className="text-gray-600">
          Enter a URL to generate your QR code instantly
        </p>
      </div>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center flex justify-center mb-5">
          <Button
            onClick={() => {
              setShowModal(true);
              setUpdateProps({ wantUpdate: false, onUpdate: () => null });
            }}
            className="bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Create New QR Code
          </Button>
        </div>
      </div>
      <QrcodeDisplay
        isLoading={isLoading}
        qrCodes={qrCodes}
        viewMore={viewMore}
        lastEvaluatedKey={lastEvaluatedKey}
        onDelete={deleteItemHandler}
        isDeleting={isDeleting}
        onEdit={editHandler}
        isViewingMore={isViewingMore}
      />
      <GenerateQrcode
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        isGenerating={isGenerating}
        userId={userId}
        update={updateProps}
      />
    </div>
  );
};

export default QrcodeGenerator;