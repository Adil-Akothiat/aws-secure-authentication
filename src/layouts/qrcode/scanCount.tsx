import axios from "axios";
import { Button } from "flowbite-react";
import { useState, type FC } from "react";
import { IoMdEye } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import type { ScanCountProps } from '@types/qrcode.ts';

const ScanCount: FC<ScanCountProps> = ({ scanCount, id }) => {
    const [scans, setScans] = useState<number>(scanCount);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const refreshScans = ()=> {
        setIsRefreshing(true);
        axios.get(`${import.meta.env.VITE_REST_API}qrcode-scanner-tracker?qrcodeId=${id}`).then(res=> {
            const { data } = res;
            if(data?.Item) {
                setScans(Number(data.Item?.scanCount || scanCount));
            }
        }).catch(err=> console.error(err))
        .finally(()=> {
            setTimeout(()=>{
                setIsRefreshing(false);
            }, 500)
        })
    }

  return (
    <div className="flex items-center justify-center space-x-2">
      <IoMdEye className="w-3 h-3 text-blue-500" />
      <span className="font-medium">{scans} scans</span>
      <Button 
        size="sm" 
        color="alternative" 
        title="refresh scans"
        onClick={refreshScans}
    >
            <MdRefresh 
                size="20" 
                className={isRefreshing ? "animate-spin" : ""}
            />
       </Button>
    </div>
  );
};


export default ScanCount;