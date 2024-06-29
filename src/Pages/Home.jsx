import React from 'react'

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaStar } from 'react-icons/fa';
import { PiPawPrintFill } from "react-icons/pi";
import PawImg from "../assets/imgs/paws.webp"
const Home = () => {
    
  return (
    <div>
        <div className="z-[-2] h-screen bg-custom-gradient w-full flex flex-col items-center font-VarelaRound">
       
            <div className="flex flex-col items-center justify-between h-[70vh] gap-2.5">
                <div className="flex flex-col items-center h-fit gap-2">
                    <div className="mt-[50px] relative">
                        <div className="absolute top-3 right-[-2rem] flex flex-row items-start">
                            <PiPawPrintFill className="text-white text-[2.2rem] transform rotate-45 " />
                            <PiPawPrintFill className="text-white text-[2rem] transform -rotate-12 mt-4" />
                        </div>
                        <h2 style={{ textShadow: '2px 4px 6px black' }} className=" text-[4rem] text-white drop-shadow-3xl font-extrabold font-VarelaRound tracking-wider`">Purrfect Stay Boarding</h2>
                        <div className="absolute bottom-0 left-[-2rem] flex flex-row items-start">
                            <PiPawPrintFill className="text-white text-[2.2rem] transform rotate-45 " />
                            <PiPawPrintFill className="text-white text-[2rem] transform -rotate-12 mt-4 " />
                        </div>
                    </div>
                    <img

                        className="mx-auto my-auto h-72 backdrop-blur"
                        src={PawImg}
                        alt="Paws"
                    />
                    <p className="text-[24px] drop-shadow-3xl w-full px-4 text-center font-semibold tracking-wider h-md:hidden">Pause to stay Paws</p>
                <div className="text-[18px] text-center max-width-[95%] pt-3 font-baijam drop- tracking-wider">
                    <p>
                        "Welcome aboard
                    </p>
                    <p>
                        Pets are precious"
                    </p>
                </div>
                {/* BUTTON */}
            <div className="">
                <button
                    type='submit'
                    className="bg-gradient-to-r from-[#f27b79] via-[#e6466c] to-[#f3285b] text-white focus:outline-none rounded-[40px] shadow-buttonShadow py-1 font-bold tracking-widest text-[2rem] px-10">
                    <Link to="/boardpets">Board Pets</Link>
                </button>
            </div>
            </div>
            
        </div>
    </div>
        </div>
  )
}

export default Home