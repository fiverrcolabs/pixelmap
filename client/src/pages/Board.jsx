import React from 'react'
import { useState, useEffect } from 'react'
import {
  TransformWrapper,
  TransformComponent,
} from '@kokarn/react-zoom-pan-pinch'
import { useAppContext } from '../context/appContext'

function Board() {
  const { logoutUser } = useAppContext()

  let board = []
  for (let i = 1; i < 10001; i++) {
    board.push({
      id: i,
      state: 'free',
      color: '#fffff',
    })
  }
  console.log(board)

  // useEffect(() => {
  //     // let board = []
  //     // return ()=>{
  //         for (let i = 1; i < 101; i++) {
  //             board.push({
  //                 id: i,
  //                 state: "free",
  //                 color:"#fffff"
  //             });
  //         }
  //         console.log(board)
  //     // }

  // }, []);

  const [currentClick, setCurrentClick] = useState(0)
  const [color, setColor] = useState('#1f80ff')
  const [credit, setCredit] = useState(2)
  // console.log(board)

  const onclick = (e) => {
    console.log(e.target.id)
    // e.target.classList.add("clicked")
    if (board[e.target.id - 1].state === 'free') {
      setCurrentClick(e.target.id)
    } else {
      console.log('occupied')
    }
  }
  const onSubmit = () => {
    console.log('submit')
    if (currentClick) {
      let el = document.getElementById(currentClick)
      el.style.backgroundColor = color

      //    console.log(board[parseInt(currentClick)-1].color ,color)
      //    board[parseInt(currentClick)-1].color=String(color)
      console.log(board)

      setCredit(credit - 1)

      //todo save in database
    }
  }

  const onChange = (e) => {
    console.log(e.target.value)
    setColor(e.target.value)
  }

  const pathMatchRoute = (num) => {
    if (num.state === 'free') {
      if (parseInt(num.id) === parseInt(currentClick)) {
        return true
      } else {
        return false
      }
    }
  }

  return (
    <>
      <div className='bcontainer'>
        <div className='row d-flex justify-content-center m-3 p-3 '>
          <input
            type='button'
            className='btn btn-danger'
            value='Logout'
            onClick={logoutUser}
          />
        </div>

        {/* <div style={{height: 510, width: 510}}> */}

        <TransformWrapper
          defaultScale={1}
          // options={transformOptions}
          defaultPositionX={1}
          defaultPositionY={1}
        >
          <TransformComponent>
            {/* <div className='bcontainer' > */}

            <div className='grid-container'>
              {board.map((num) => (
                <div
                  className={
                    pathMatchRoute(num)
                      ? 'grid-item block clicked'
                      : 'grid-item block'
                  }
                  style={{
                    backgroundColor: num.color,
                  }}
                  id={num.id}
                  onClick={onclick}
                  key={num.id}
                >
                  {num.id}
                </div>
              ))}
            </div>

            {/* </div> */}
          </TransformComponent>
        </TransformWrapper>

        <div className='row mt-3'>
          <div className='col  d-flex justify-content-center m-3 p-1 border'>
            <label htmlFor='colorpicker'>Color Picker:</label>
            <input
              type='color'
              id='colorpicker'
              value={color}
              onChange={onChange}
              className='colorpicker'
            />
            {/* <div class="input-group">
              <span class="input-group-text">Color Picker</span>
              <input type="color" class="form-control" id="colorpicker" value="#0000ff"/>
              
          </div> */}
          </div>

          <div className='col  d-flex justify-content-center m-3 p-1 border'>
            <button
              type='subbit'
              className='btn btn-primary'
              onClick={onSubmit}
              disabled={!credit}
            >
              {' '}
              confirm
            </button>
          </div>

          <div className='col d-flex justify-content-center m-3 p-1 border'>
            <label htmlFor='credits'>available pixels:</label>
            <input
              type='button'
              id='credits'
              className='btn btn-outline-primary'
              value={credit}
              disabled
            />
            {/* <p  value={credit}>{credit}</p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Board
