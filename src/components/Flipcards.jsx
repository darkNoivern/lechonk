import React from 'react'

const Flipcards = (props) => {
    const spinner = () => {
        document.querySelectorAll(".sp-card")[props.id].classList.toggle("voltorb");
    };

    return (
        <>
            <div className="balance__transaction__content poke">
                <div
                    onClick={() => { spinner(); }}
                    className="transaction__card sp-card">
                    <div className="main__card front">
                        <div className='transaction__ transaction__top'>
                            <i class="uil uil-times-circle delete__button"></i>
                            <div className="category-style flexy py-1 px-2">
                                <div className={`pokemon-tag bg-purple-400 mx-2`}></div>
                                <div>Bills</div>
                            </div>
                        </div>
                        <div className='transaction__ transaction__back'>
                            <span>Hello</span>
                            <span>₹ 3000</span>
                        </div>
                    </div>
                    <div className="main__card back">
                        hello there
                    </div>

                </div>
            </div>
        </>
    )
}

export default Flipcards