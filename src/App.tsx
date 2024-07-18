import React from "react";
import IoBox from "./iobox/IoBox"
import "./index.css"

export default function App()
{
  const [data, setData] = React.useState(
    {
        msg: "", 
        letters: 0,
        from: "en", 
        to: "ar",
        tMsg: ""
    })

    function handleChange(e:any, mode:any)
    {
        setData((prev) => {

            const newLetters = e.target.value.replace(/[^a-zA-Z0-9]/g, ' ').length;
            if(e.target.type === "submit")
            {
                if(mode == 0)
                  {
                    if (data.to == e.target.name) return({...prev})
                    return(
                      {
                        ...prev,
                        from: e.target.name
                      }
                    )

                  }
                  if (data.from == e.target.name) return({...prev})
                return(
                    {
                      ...prev,
                      to: e.target.name
                    }
                  )
            }
            return(
                {
                    ...prev,
                    [e.target.name]: e.target.value,
                    letters: newLetters
                }
            )
            })      
    }

    async function handleClick(msg: String,from: String, to: String){
      fetch(`https://api.mymemory.translated.net/get?q=${msg}&langpair=${from}|${to}`)
      .then(response => response.json())
      .then(data => {
        setData((prev) =>{
          return(
            {
              ...prev,
              tMsg: data.responseData.translatedText
            }
          )
        })
      })
      .catch(error => {
        console.log(error)
      })
    

    }


    function handleSwitch()
    {
      setData((prev)=>{

          return({
              ...prev,
              to: prev.from,
              from: prev.to,
              msg: prev.tMsg,
              tMsg: prev.msg,
              letters: data.tMsg.replace(/[^a-zA-Z0-9]/g, ' ').length
          })
      })
    }

  return (
    <div id="container">
      <IoBox mode={0} handleChange={handleChange} handleClick={handleClick}data={data} handleSwitch={handleSwitch}></IoBox>
      <IoBox mode={1} handleChange={handleChange} handleClick={handleClick}data={data} handleSwitch={handleSwitch}></IoBox>
    </div>

  )

      
  
}