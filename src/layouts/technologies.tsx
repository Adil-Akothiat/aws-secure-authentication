import type React from "react";
import { FaAws, FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import ViteIcon from "../assets/svg/vite.svg";

const Technologies: React.FC = ()=> {
    return (
        <div className="flex items-center justify-center gap-x-3 mt-5">
            <div>
                <SiTypescript className="text-[#3178C6] mx-auto" size="38" />
            </div>
            <div>
                <FaReact className="text-[#087EA4] mx-auto" size="38" />
            </div>
            <div>
                <img src={ViteIcon} alt="vite icon"/>
            </div>
            <div>
                <RiTailwindCssFill className="text-[#00BCFF] mx-auto" size="38" />
            </div>
            <div>
                <FaAws className="text-[#161D26] mx-auto" size="38" />
            </div>
        </div>
    );
}

export default Technologies;