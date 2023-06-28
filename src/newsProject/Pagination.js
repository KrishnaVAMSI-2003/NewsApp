import React, { useState, useEffect } from 'react'

export default function Pagination(props) {
    const {pageNo,setPageNo} = props
    const [arr, setArr] = useState([])
    useEffect(()=>{
        setArr([])
        for(let i=1;i<10;i++){
            setArr(arr=>[...arr,i])
        }
    },[])
    
    const handleClick=(no)=>{
        setPageNo(no)
    }
    // const buttons = (val)=>{
    //     if(val==='prev10' && st>1){
    //         setSt(st-10) //st is a state
    //     }
    //     if(val==='next10' && st+10<total)
    //         setSt(st+10)   
    // }
    const prevNext = (val) => {
        val==='-' && pageNo>0 &&setPageNo(pageNo-1)
        val==='+' && pageNo<9 && setPageNo(pageNo+1)
    }
    
    
  return (
    <div>
        <button onClick={()=>{prevNext('-')}}>prev</button>
        {/*<button title='previos 10 page numbers' onClick={()=>buttons('prev10')}>≤</button>*/}
        {arr.map((ele,index)=>{
            return <button onClick={()=>handleClick(ele)}>{ele}</button>
        })}
        {/*<button title='next 10 page numbers' onClick={()=>buttons('next10')}>≥</button>*/}
        <button onClick={()=>{prevNext('+')}}>Next</button>
    </div>
  )
}
