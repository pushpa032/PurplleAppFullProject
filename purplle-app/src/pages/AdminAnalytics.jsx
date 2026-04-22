import { useState } from 'react'
import "../styles/AdminAnalytics.css";
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import AdminHome from './AdminHome'

function AdminAnalytics() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="adminAnalytics">
        <div className='grid-container'>
            <AdminHeader OpenSidebar={OpenSidebar}/>
            <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <AdminHome />
        </div>
    </div>
  )
}

export default AdminAnalytics;