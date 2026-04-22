import React from 'react'
import 
{BsCart3, FcSalesPerformance, FaRupeeSign, IoPeopleSharp, FaCartArrowDown  }
 from 'react-icons/bs';

function AdminSidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <FcSalesPerformance className='icon'/> Number of Sales Count
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <FaRupeeSign className='icon'/> Number of Payment Recieved
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <IoPeopleSharp className='icon'/> Number of SignUp Counts
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <FaCartArrowDown className='icon'/> Number of Orders
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default AdminSidebar