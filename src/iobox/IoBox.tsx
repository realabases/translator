import React from "react";
import soundIcon from "../assets/sound_max_fill.svg"
import copyIcon from "../assets/Copy.svg"   
import tIcon from "../assets/Sort_alfa.svg"
import sIcon from "../assets/Horizontal_top_left_main.svg"


export default function IoBox({mode, handleChange, handleClick, data, handleSwitch} : any)
{
    return(
        <div className="Box" style={{backgroundColor: mode==0 ? "#212936cc" : "#121826cc"}}>

            <div className="topBar">
                {/* {mode == 0 && <button>Detect Language</button>} */}
                <button id={data.from == "en" && mode == 0 ? "active" : data.to =="en" && mode == 1 ? "active" : ""} 
                name="en" 
                onClick={(e) => handleChange(e, mode)}>English</button>
                <button id={data.from == "fr" && mode == 0 ? "active" : data.to =="fr" && mode == 1 ? "active" : ""} 
                name="fr" 
                onClick={(e) => handleChange(e, mode)}>Frensh</button>
                <button id={data.from == "ar" && mode == 0 ? "active" : data.to =="ar" && mode == 1 ? "active" : ""} 
                name="ar" 
                onClick={(e) => handleChange(e, mode)}>Arabic</button>
                { 
                mode == 1 && 
                <button id="switch">
                    <img src={sIcon} onClick={handleSwitch}></img>
                </button>
                }
                
            </div>
            <center>
              <div className="line"></div>
            </center>
            <textarea 
                disabled={mode} name="msg" value={mode == 0 ? data.msg : data.tMsg}
                placeholder={mode == 0 ? "Enter text" : ""} 
                onChange={(e) => handleChange(e)} maxLength={500}>
            </textarea>
            {mode == 0 && <p id="letters">{`${data.letters}/500`}</p>}
            <div className="bottomBar">
                <button>
                    <img src={copyIcon} onClick={() => {navigator.clipboard.writeText(mode == 0 ? data.msg : data.tMsg)}}></img>
                </button>
                {
                mode == 0 &&
                <button id="translate" onClick={() => handleClick(data.msg,data.from,data.to)}>
                    <img src={tIcon}></img>
                    <p>Translate</p>
                </button>
                }
            </div>
        </div>
    )
}