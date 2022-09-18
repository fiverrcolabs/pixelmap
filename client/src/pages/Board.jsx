import React from 'react'
import { useState, useEffect } from 'react';

function Board() {

    let board = []
    for (let i = 1; i < 101; i++) {
        board.push({
            id: i,
            state: "free"
        });
    }
    console.log(board)

    // useEffect(() => {
    //     // let board = []
    //     for (let i = 1; i < 26; i++) {
    //         board.push({
    //             id:i,
    //             state:"free"
    //         });
    //     }
    //     console.log(board)
    // }, []);


    const [currentClick, setCurrentClick] = useState(0);
    const [color, setColor] = useState('#1f80ff');
    const [credit, setCredit] = useState(2);




    const onclick = (e) => {

        console.log(e.target.id)
        // e.target.classList.add("clicked")
        setCurrentClick(e.target.id)
        
    }
    const onSubmit = () => {

        console.log("submit")
        if(currentClick){
            let el = document.getElementById(currentClick);
            el.style.backgroundColor = color;
            setCredit(credit-1)
            //todo save in database
        }
       
        
    }

    const onChange = (e) => {

        console.log(e.target.value)
        setColor(e.target.value)
         
    }

    const pathMatchRoute = (id) => {
     
        if ( parseInt(id) ===  parseInt(currentClick)) {
            return true
        }
        else{
            return false
        }
    }

    return (
        <>
            <div className='bcontainer' >

                
            <div className='row d-flex justify-content-center m-3 p-3 ' >
                        <input type="button" className='btn btn-danger' value="Logout"  />

                    </div>

                <div className="grid-container">

                    {board.map((num) => (
                        <div className={pathMatchRoute(num.id)?"grid-item block clicked" :"grid-item block"}
                           
                        id={num.id} onClick={onclick} key={num.id}>{num.id}</div>
                    ))
                    }

                </div>


                <div className='row mt-3' >
                    <div className='col  d-flex justify-content-center m-3 p-1 border'>
                        <label for="colorpicker">Color Picker:</label>
                        <input type="color" id="colorpicker" value={color} onChange={onChange} className='colorpicker'/>
                        {/* <div class="input-group">
                            <span class="input-group-text">Color Picker</span>
                            <input type="color" class="form-control" id="colorpicker" value="#0000ff"/>
                            
                        </div> */}

                    </div>

                    <div className='col  d-flex justify-content-center m-3 p-1 border'>
                        <button type='subbit' className='btn btn-primary' onClick={onSubmit} disabled={!credit} > confirm</button>

                    </div>

                    <div className='col d-flex justify-content-center m-3 p-1 border' >
                        
                        <label for="credits">available pixels:</label>
                        <input type="button" id="credits" className='btn btn-outline-primary' value={credit} disabled />
                        {/* <p  value={credit}>{credit}</p> */}

                    </div>


                </div>





            </div>


        </>
    )
}

export default Board