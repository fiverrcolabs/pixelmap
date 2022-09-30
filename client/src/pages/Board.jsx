import React from 'react'
import { useState, useEffect } from 'react'
import {
  TransformWrapper,
  TransformComponent,
} from '@kokarn/react-zoom-pan-pinch'
import { useAppContext } from '../context/appContext'
import { HexColorPicker } from "react-colorful";
import io from "socket.io-client";
// import './pages.css'

const socket = io("http://localhost:4001/api/v1/socket", { transports: ['websocket'] });

// const user = useAppContext('user')
// const token = localStorage.getItem('token')

function Board() {

  const { getBoard, savePixel, getAvailablePixels } = useAppContext()
  const { user, token } = useAppContext()

  const { logoutUser } = useAppContext()





  const [currentClick, setCurrentClick] = useState("")
  const [color, setColor] = useState('#1f80ff')
  const [credit, setCredit] = useState(0)
  const [loading, setLoading] = useState(true)
  const [board, setBoard] = useState([]);
  const [act, setAct] = useState(false);
  const sizeofboard = process.env.REACT_APP_SIZE;

  // console.log(board)




  useEffect(() => {
    async function fetchData(board) {
      let tempBoard = []
      // for (let i = 1; i < (sizeofboard * sizeofboard) + 1; i++) {
      //   tempBoard.push({
      //     id: i,
      //     state: false,
      //     color: '#fffff',
      //   })
      // }

      for (let i = 1; i < parseInt(sizeofboard)+1; i++) {
        for (let j = 1; j < parseInt(sizeofboard)+1; j++) {
          tempBoard.push({
            id: [i, j],
            state: false,
            color: '#fffff',
          })

        }

      }


      // You can await here
      console.log("from board", user, token)
      const bd = await getBoard(token);
      const availablePixels = await getAvailablePixels(user, token);
      setCredit(parseInt(availablePixels))

      // console.log("Board is: ", bd)
      // console.log(board[parseInt(bd[0].row)].color)
      bd.forEach((dbitem) => {
        // tempBoard[parseInt(item.row) - 1].id = item.row;
        // tempBoard[parseInt(item.row) - 1].state = item.state;
        // tempBoard[parseInt(item.row) - 1].color = item.color;
        tempBoard.forEach((item) => {
          
          if(item.id.toString()===dbitem.row){
              item.state=dbitem.state;
              item.color=dbitem.color;
          }
          })
  
      })

   

      setBoard(tempBoard)
      setLoading(false)

    }

    fetchData(board);

  }, [user, token]);




  useEffect(() => {

    socket.on("newPixel", async (dbitem) => {
      console.log("from socket", dbitem)

      setBoard((prevState) => {

        const tempBoard = [...prevState];
        // console.log("tmp from socket", tempBoard)
        // tempBoard[parseInt(item.row) - 1].id = item.row
        // tempBoard[parseInt(item.row) - 1].state = item.state
        // tempBoard[parseInt(item.row) - 1].color = item.color
        tempBoard.forEach((item) => {
          
          if(item.id.toString()===dbitem.row){
              item.state=dbitem.state;
              item.color=dbitem.color;
          }
          })

        // console.log("test1", prevState)
        return tempBoard
      });

      const availablePixels = await getAvailablePixels(user, token);
      setCredit(parseInt(availablePixels))

    });


  }, [socket]);


  // const checkandset=(bd, posi)=>{
  //   bd.forEach((item) => {
  //     //   tempBoard[parseInt(item.row) - 1].id = item.row;
  //     //   tempBoard[parseInt(item.row) - 1].state = item.state;
  //     //   tempBoard[parseInt(item.row) - 1].color = item.color;
  //     // })

  // }


  const onclick = (e) => {
    // console.log(e.target.id)
    // e.target.classList.add("clicked")
    // if (!board[e.target.id - 1].state) {
    //   setCurrentClick(e.target.id)
    // } else {
    //   setCurrentClick(0)
    //   console.log('occupied')
    // }
    // console.log("id",e.target.id)
    setCurrentClick(e.target.id)
    // console.log(currentClick)
  }
  const onSubmit = () => {
    // console.log('submit')

    if (currentClick && credit) {

      const pixel = {
        row: currentClick,
        state: true,
        color: color,
        email: user.email
      }

      savePixel(pixel, token)

      // setCredit(credit - 1)
      setCurrentClick(0)

    }
  }

  // const onChange = (e) => {
  //   console.log(e.target.value)
  //   setColor(e.target.value)
  // }
  // const getIntArray = (li) => {
  //   var nli = []
  //   li.split(',').map(function (item) {
  //     nli.push(parseInt(item, 10))
  //   })

  //   return nli
  // }


  const pathMatchRoute = (num) => {
    
    // if (!num.state) {
    if (num.id==currentClick) {
      // console.log(currentClick)
      return true
    } else {
      return false
    }
    // }
  }

  

  const getClickindex = (st) => {
    // if (!num.state) {

       for (let j = 0; j < parseInt(sizeofboard*sizeofboard); j++) {
          if(board[j].id.toString()===st){
            // console.log(j)
            return j
          }
        }
  }




  // function isEqual(li1, li2) {
  //   if (li1[0] === li2[0] && li1[1] === li2[1]) {
  //     return true
  //   }
  //   return false
  // }

  function getZoom(num){
   
    if(num>200){
      return ['1000px','1050px']
    }
    if(num>100){
      return ['700px','750px']
    }
    return ['600px' ,'650px']
  }




  if (loading) {
    return <div className='bcontainer' > <h1 >Loading.....</h1> </div>
  }

  return (
    <>
      {/* <div className='full-page' style={{zoom:getZoom(sizeofboard)}}> */}
      <div className='full-page' >
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
        <div className='bcontainer' style={
          {
            width:getZoom(sizeofboard)[0],
            height:  getZoom(sizeofboard)[1]
        }}> 



          <TransformWrapper
            defaultScale={1}
            // options={transformOptions}
            defaultPositionX={100}
            defaultPositionY={100}
          >

        
            <TransformComponent>

          
         
              <div className='grid-container' style={{
                gridTemplateColumns: 'auto '.repeat(sizeofboard),
                width:getZoom(sizeofboard)[0],
                height:  getZoom(sizeofboard)[0]
                
              }} >
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
                    id={num.id.toString()}
                    onClick={onclick}
                    key={num.id.toString()}
                  >
                    {/* {num.id.toString()} */}
                  </div>
                ))}
              </div>

           
            </TransformComponent>

           
          </TransformWrapper>

          <div style={{ display: (!act) ? 'none' : '' }} className='cp'>
            <input className="form-control " type="text" name="name" value={color} onChange={(e) => setColor(e.target.value)} />
            <HexColorPicker color={color} onChange={setColor} />


          </div>


          <div className='row  '>
            <div className='col  d-flex justify-content-center  p-1 border'>
              <label htmlFor='colorpicker'>Color Picker:</label>

              <input
                type='button'
                id='colorclick'
                className='btn btn-outline-primary'
                value="  "
                style={{ backgroundColor: color }}
                onClick={() => { setAct(!act) }}

              />


            </div>

            <div className='col  d-flex justify-content-center  p-1 border'>
              <button
                type='subbit'
                className='btn btn-primary'
                onClick={onSubmit}
                disabled={!credit || currentClick === "" || (currentClick && color === board[getClickindex(currentClick)].color)}
                // || color == board[currentClick - 1].color
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

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Board
