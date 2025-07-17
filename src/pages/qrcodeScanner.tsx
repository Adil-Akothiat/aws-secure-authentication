import type { FC } from "react";
import QrcodeGenerator from "../layouts/qrcode/qrcodescanner";

const QrcodeScanner:FC = ()=> {
    return (
        <div>
            <QrcodeGenerator />
        </div>
    );
}
export default QrcodeScanner;