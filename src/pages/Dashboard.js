import React from 'react'
import '../Dashboard/Dashboard.css'

import LineChartDemo from '../Dashboard/LineChart'
import PieChartDemo from '../Dashboard/PieChart'
const Dashboard = () => {
  return (
    <>
    <div className='dashboard-container'>
    <div className="box-container">
    <div className="box"><h1>Student <br></br>1000
    </h1> </div>
    <div className="box"><h1>Teacher<br></br> 150</h1></div>
    <div className="box"> <h1>1st year <br></br>50</h1></div>
   
  </div>
  <div className='button-container'>
  <div className="button">More info </div>
  <div className="button"> More info </div>
  <div className="button">More info </div>
  </div>
  
  <div className='Chart-main'>
    <LineChartDemo/>
    <PieChartDemo/>
  </div>
  </div>
  </>
  )
}

export default Dashboard