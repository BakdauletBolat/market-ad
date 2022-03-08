import React from 'react';
import { useNavigate } from 'react-router-dom';
import TestBillBoardImg from '../assets/images/test-billboard.webp';
const Main = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='hero-block'>
                <div className='hero-block__row container'>
                    <div className='hero-block__content'>
                        <div className='hero-block__title'>
                        Портал наружных реклам <span className='hero-block__title-capture'>KazBillboard</span>
                        </div>
                        <div className='hero-block__description'>
                        Билборд, скроллер, флэксборд, LED монитор и другие виды рекламных конструкции
                        </div>
                        <div className='button' onClick={()=>{
                            navigate('/map');
                        }}>
                            Показать на карте
                        </div>
                    </div>
                    <div className='hero-block__image'> 
                        <img src={TestBillBoardImg} alt="" /> 
                    </div>
                </div>
            </div>
        </>
    );
};
export default Main;
