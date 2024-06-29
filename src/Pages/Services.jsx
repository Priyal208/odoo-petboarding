import React, { useState } from 'react';
import "../index.css";
import { LuBath } from "react-icons/lu";
import { GiComb } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { GiDoctorFace } from "react-icons/gi";
import { PiBeachBallThin } from "react-icons/pi";
import { FaBone } from "react-icons/fa6";
import { GiSittingDog } from "react-icons/gi";
import { GiBelt } from "react-icons/gi";

const Services = () => {
    const [exploreHover, setExploreHover] = useState(false);
    const [activityHover, setActivityHover] = useState(false);
    const [eventHover, setEventHover] = useState(false);
    const [seasonHover, setSeasonHover] = useState(false);

    return (
        <div id='about-us' className=' bg-custom-gradient font-VarelaRound'>
            <h1 className='about-us-heading text-[6rem] text-white drop-shadow-xl font-extrabold font-VarelaRound ' style={{ textShadow: '2px 4px 6px black' }}>Services</h1>
            <div className='about-us-block text-sky-950'>
                <div className='about-us-community' onMouseOver={() => setExploreHover(true)} onMouseLeave={() => setExploreHover(false)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem',padding:'0.5rem 0rem 0rem 1rem' }}>
                        <LuBath  className='about-us-icon' fontSize={27}/>
                        <div className='about-us-blk-text'>Pet Grooming</div>
                    </div>
                    <p className='about-us-blk-para'>Our pet grooming services at BharatYatra are designed to provide expert care and attention to your beloved pets. From luxurious baths to breed-specific grooming styles, we ensure that each grooming session is tailored to meet the unique needs of your furry companions. Our experienced groomers not only focus on enhancing your pet's appearance but also conduct thorough health checks during each session. This proactive approach helps in early detection of skin issues, parasites, or other health concerns, ensuring your pet stays healthy and happy.</p>
                </div>
                <div className='about-us-product text-sky-950' onMouseOver={() => setActivityHover(true)} onMouseLeave={() => setActivityHover(false)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem',padding:'0.5rem 0rem 0rem 1rem' }}>
                    <FaUserDoctor  className='about-us-icon' fontSize={27}/>
                        <div className='about-us-blk-text'>Pet Health</div>
                    </div>
                    <p className='about-us-blk-para '>We prioritize the holistic health and fitness of your pets through comprehensive care and personalized plans. Our dedicated team conducts thorough health assessments, including vaccinations, dental care, and regular check-ups, to monitor and maintain your pet's well-being. We offer customized fitness plans that cater to your pet's individual needs, incorporating activities like walks, runs, and interactive play sessions to promote physical health and vitality. Nutritional guidance is also a cornerstone of our services, ensuring your pet receives a balanced diet tailored to their nutritional requirements. </p>
                </div>
            </div>
            <div className='about-us-block text-sky-950'>
                <div className='about-us-location' onMouseOver={() => setEventHover(true)} onMouseLeave={() => setEventHover(false)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem',padding:'0.5rem 0rem 0rem 1rem' }}>
                    <PiBeachBallThin  className='about-us-icon' fontSize={27}/>
                        <div className='about-us-blk-text'>Pet Playzone</div>
                    </div>
                    <p className='about-us-blk-para'>We believe in positive reinforcement and personalized training programs to nurture well-behaved and confident pets. Our certified trainers utilize positive reinforcement techniques to teach essential commands and address specific behavioral issues effectively. Whether it's obedience training to instill good manners or behavioral modifications to overcome challenges like anxiety or aggression, our structured approach focuses on strengthening the bond between you and your pet through effective communication and understanding.</p>
                </div>
                <div className='about-us-event text-sky-950' onMouseOver={() => setSeasonHover(true)} onMouseLeave={() => setSeasonHover(false)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem',padding:'0.5rem 0rem 0rem 1rem' }}>
                    <GiSittingDog className='about-us-icon' fontSize={27}/>
                        <div className='about-us-blk-text'>Pet Training</div>
                    </div>
                    <p className='about-us-blk-para'>Pet playing at BharatYatra is more than just fun and games—it's about enriching your pet's life through engaging activities and social interaction. Our playtime sessions offer a variety of stimulating games and toys that cater to your pet's energy levels and preferences, both indoors and outdoors. Supervised play with other pets promotes socialization skills and enhances overall well-being in a safe and monitored environment. These interactive sessions not only keep your pets physically active but also provide valuable bonding opportunities between you and your furry friends. </p>
                </div>
            </div>
        </div>
    )
}

export default Services;