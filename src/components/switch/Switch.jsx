/* eslint-disable react/prop-types */
import "./styles.scss";
import { useState } from "react";
const Switch = ({options,handleSwitch}) => {
    const [selectedTab,setSelectedTab ] = useState(0);
    const [left,setLeft ] = useState(0);
  const activeTab = (option,index)=>{
    setLeft(index * 100)
    setTimeout(
      ()=>{
setSelectedTab(index)
      },300
    )
      handleSwitch(option,index)
  }
  return (
    <div className="switchTabs">
      <div className="tabItems">
        {options.map((option,index) => ( 
        <span key={index} className={`tabItem ${selectedTab === index ? 'active':''}` } onClick={
          ()=>activeTab(option,index)
        }>
            {option}
            </span>
        )
        )}
      <span className="movingBg" style={{left}}/>
      </div>
    </div>
  );
};

export default Switch;
