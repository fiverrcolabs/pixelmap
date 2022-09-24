import React from 'react'
import { useState, useEffect } from 'react'
import {
  TransformWrapper,
  TransformComponent,
} from '@kokarn/react-zoom-pan-pinch'
import { useAppContext } from '../context/appContext'
import io from "socket.io-client";
const socket = io("http://localhost:4001/api/v1/socket", { transports: ['websocket'] });
const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

function Board() {

  const { getBoard, savePixel,getAvailablePixels ,saveAvailablePixels } = useAppContext()


  const { logoutUser } = useAppContext()





  const [currentClick, setCurrentClick] = useState(0)
  const [color, setColor] = useState('#1f80ff')
  const [credit, setCredit] = useState(0)
  const [loading, setLoading] = useState(true)
  const [board, setBoard] = useState([]);
  // console.log(board)




  useEffect(() => {
    async function fetchData(board) {
      let tempBoard = []
      for (let i = 1; i < 10001; i++) {
        tempBoard.push({
          id: i,
          state: false,
          color: '#fffff',
        })
      }
      // You can await here
      const bd = await getBoard(token);
      const availablePixels =await getAvailablePixels(user);
      setCredit(parseInt(availablePixels))
     
      // console.log("Board is: ", bd)
      // console.log(board[parseInt(bd[0].row)].color)
      bd.forEach((item) => {
        tempBoard[parseInt(item.row) - 1].id = item.row;
        tempBoard[parseInt(item.row) - 1].state = item.state;
        tempBoard[parseInt(item.row) - 1].color = item.color;
      })

      // tempBoard[parseInt(bd[0].row)].color='#FF0000'
      setBoard(tempBoard)
      setLoading(false)
      // ...
    }

    fetchData(board);

  }, []);



  // useEffect(()=>{

  //   async function fetchData(user) {

    
  //   const availablePixels =await getAvailablePixels(user);
  //   setCredit(parseInt(availablePixels))
  //   }

  //   fetchData(user)
  // },[])


  useEffect(() => {

    socket.on("newPixel", async (item) => {
      console.log("from socket", item)

      setBoard((prevState) => {

        const tempBoard = [...prevState];
        // console.log("tmp from socket", tempBoard)
        tempBoard[parseInt(item.row) - 1].id = item.row
        tempBoard[parseInt(item.row) - 1].state = item.state
        tempBoard[parseInt(item.row) - 1].color = item.color



        // console.log("test1", prevState)
        return tempBoard
      });

    });


  }, [socket]);




  const onclick = (e) => {
    console.log(e.target.id)
    // e.target.classList.add("clicked")
    if (!board[e.target.id - 1].state) {
      setCurrentClick(e.target.id)
    } else {
      console.log('occupied')
    }
  }
  const onSubmit = () => {
    console.log('submit')

    if (currentClick) {
    
      const pixel = {
        row: parseInt(currentClick),
        state: true,
        color: color
      }

      savePixel(pixel,token)
      //    console.log(board[parseInt(currentClick)-1].color ,color)
      //    board[parseInt(currentClick)-1].color=String(color)
      // console.log(board)

      saveAvailablePixels(user)
      setCredit(credit - 1)

    }
  }

  const onChange = (e) => {
    console.log(e.target.value)
    setColor(e.target.value)
  }

  const pathMatchRoute = (num) => {
    if (!num.state) {
      if (parseInt(num.id) === parseInt(currentClick)) {
        return true
      } else {
        return false
      }
    }
  }

  if (loading) {
    return <div className='bcontainer' > <h1 >Loading.....</h1> </div>
  }

  return (
    <>
      <div className='full-page'>
        <div className='d-flex flex-row-reverse bd-highlight'>
          <input
            type='button'
            className='btn btn-danger m-3'
            value='Logout'
            onClick={logoutUser}
          />
          <input
            type='button'
            className='btn btn-outline-primary m-3'
            value='contact'

          />


        </div>
        <div className='bcontainer'>
          {/* <div className='row d-flex justify-content-center  p-3 '>
          <input
            type='button'
            className='btn btn-danger'
            value='Logout'
            onClick={logoutUser}
          />
        </div> */}

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
                {board && board.map((num) => (
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
                    {/* {num.id} */}
                  </div>
                ))}
              </div>

              {/* </div> */}
            </TransformComponent>
          </TransformWrapper>

          <div className='row  '>
            <div className='col  d-flex justify-content-center  p-1 border'>
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

            <div className='col  d-flex justify-content-center  p-1 border'>
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

            <div className='col d-flex justify-content-center  p-1 border'>
              <label htmlFor='credits'>available pixels: </label>
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
      </div>
    </>
  )
}

export default Board
