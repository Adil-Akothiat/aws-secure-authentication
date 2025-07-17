import { useState, type FC } from "react";
import { QRCodeSVG } from "qrcode.react";
import { type QRCodeData } from "./qrcodescanner";
import { Button, Spinner } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiClock } from "react-icons/hi";
import CustomModal from "../../components/modal";
import { formatDate, getTimeAgo } from "../../utilities/dateTime";
import { FiPlus } from "react-icons/fi";
import ScanCount from "./scanCount";

interface QrcodeDisplayProps {
  qrCodes: QRCodeData[];
  isLoading: Boolean;
  onEdit?: (qrCode: QRCodeData) => void;
  onDelete: (id: string) => Promise<void>;
  viewMore?: ()=> void;
  lastEvaluatedKey: any;
  isDeleting: boolean;
  isViewingMore: boolean;
}

const QrcodeDisplay: FC<QrcodeDisplayProps> = ({ 
  qrCodes,
  isLoading, 
  onEdit, 
  onDelete,
  viewMore,
  lastEvaluatedKey,
  isDeleting,
  isViewingMore
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState<Boolean>(false);
  const [itemId, setItemId] = useState<string>('');

  const handleEdit = (qrCode: QRCodeData) => {
    if (onEdit) {
      onEdit(qrCode);
    } else {
      alert("Edit functionality would be implemented here");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 p-8">
      <CustomModal
        header="Do you want to delete this item?"
        footer={
          <>
          <Button 
            color={isDeleting?"gray":"red"}
            disabled={isDeleting}
            outline={true}
            onClick={async ()=> {
              await onDelete(itemId);
              setShowConfirmModal(false);
            }}
          >
            {isDeleting ? "deleting..." : 'Delete'}
          </Button>
          <Button color="gray" onClick={()=> setShowConfirmModal(false)}>
            Cancel
          </Button>
          </>
        }
        isOpen={Boolean(showConfirmModal)}
        onClose={()=> setShowConfirmModal(false)}
      >
        <p className="text-gray-600">
          This action cannot be undone. Are you sure you want to proceed?
        </p>
      </CustomModal>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner className="" aria-label="loading qrcodes ..." />
        </div>
      ) : qrCodes.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
            <FiPlus size="32" />
          </div>
          <p className="text-xl font-semibold text-gray-700">No QR codes yet</p>
          <p className="text-sm text-gray-500 mt-2">Generate your first QR code above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {qrCodes.map((qrCode) => (
            <div
              key={`key-${qrCode.id}`}
              className="group bg-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
              id={String(qrCode.id)}
            >
              <div className="absolute top-4 right-4 z-10">
                <div className="flex items-center space-x-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  <HiClock className="w-3 h-3" />
                  <span>{getTimeAgo(Number(qrCode?.createdAt))}</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-5">
                <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl shadow-md border border-gray-100 group-hover:shadow-lg transition-shadow duration-300">
                  <QRCodeSVG
                    value={String(qrCode.urls.prod)}
                    size={120}
                    level="M"
                  />
                </div>
                <div className="text-center w-full space-y-3">
                  <h3
                    className="font-semibold text-gray-800 text-sm leading-tight truncate px-2"
                    title={qrCode.redirectUrl}
                  >
                    {qrCode.redirectUrl}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <HiClock className="w-3 h-3 text-gray-500" />
                      <span>
                        Created: {formatDate(qrCode.createdAt || qrCode.metaData.timestamp)}
                      </span>
                    </div>
                    <ScanCount scanCount={Number(qrCode?.scanCount || 0)} id={String(qrCode?.id||"")} />
                  </div>
                </div>
                <div className="flex space-x-2 w-full">
                  <button
                    onClick={() => window.open(String(qrCode.urls.prod), "_blank")}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg text-sm font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                  >
                    Visit
                  </button>
                  <button
                    onClick={() => {
                      alert("Download functionality would be implemented here");
                    }}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:from-gray-200 hover:to-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 shadow-md hover:shadow-lg"
                  >
                    Download
                  </button>
                </div>
                <div className="flex space-x-2 w-full">
                  <button
                    onClick={() => handleEdit(qrCode)}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <FaEdit className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmModal(true);
                      setItemId(String(qrCode.id));
                    }}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <MdDelete className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 flex items-center justify-center">
        <Button 
          id="view-more-item" 
          color="cyan" 
          onClick={viewMore} 
          disabled={!lastEvaluatedKey || isViewingMore}
          className="px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          {!lastEvaluatedKey ? "Less" : isViewingMore ? "Viewing More" : "View More"}
        </Button>
      </div>
    </div>
  );
};

export default QrcodeDisplay;