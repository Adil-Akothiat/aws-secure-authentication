import { useEffect, useRef, type FC } from "react";
import AuthLoader from "../components/loader";
import axios from "axios";
import { useParams } from "react-router-dom";

const QRCodeRedirect: FC = () => {
    const { id } = useParams();
    const hasRunRef = useRef(false);
  useEffect(() => {
    if(hasRunRef.current) return;
    hasRunRef.current = true;
    axios.patch(`${import.meta.env.VITE_REST_API}qrcode-scanner-tracker?id=${id}&incrementScanCount=${true}`, {})
    .then(res=> {
        const { data } = res;
        window.location.href = data.item.redirectUrl;
    })
  }, []);

  return <AuthLoader text="Redirect..."/>;
};

export default QRCodeRedirect;