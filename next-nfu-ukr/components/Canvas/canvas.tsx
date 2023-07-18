import Init from "./canvasScript";
import { useEffect, useRef } from "react";
import React from "react";
import CanvasStyle from "./Canvas.module.scss";

export default  function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(()=> {
        Init(canvasRef.current!)
      }, [])
    
    return (
        <canvas ref={canvasRef} className={CanvasStyle.canvas}/>
    )
}