export interface QRCodeData {
  id: number;
  redirectUrl: string;
  urls: {
    local: string;
    prod: string;
  };
  userId: string;
  metaData: {
    userAgent: string;
    timestamp: string;
  };
  createdAt: string;
  scanCount?: number;
}

export interface UpdateProps {
  wantUpdate?: boolean;
  item?: QRCodeData;
  onUpdate: (url: string, id: string) => void;
}

export interface GenerateQrcodeProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, userId: string, metaData: object) => void;
  isGenerating: boolean;
  userId: string;
  update?: UpdateProps;
}

export interface QrcodeDisplayProps {
  qrCodes: QRCodeData[];
  isLoading: boolean;
  onEdit?: (qrCode: QRCodeData) => void;
  onDelete: (id: string) => Promise<void>;
  viewMore?: () => void;
  lastEvaluatedKey: any;
  isDeleting: boolean;
  isViewingMore: boolean;
}

export interface ScanCountProps {
  id: string;
  scanCount: number;
}
