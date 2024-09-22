import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { HiUser, HiPlus, HiChat, HiCog } from 'react-icons/hi';
import { SlCalender } from "react-icons/sl";

const WorkforceSidebar = ({ tab, handleSignout }) => {
  return (
    <Sidebar className='w-full md:w-64 custom-sidebar h-full'>
      <Sidebar.Items className='flex flex-col justify-between h-full'>
        <div>
          <Sidebar.ItemGroup className='mt-12'>
             <Sidebar.Item>
           
             </Sidebar.Item>
            <Link to='/talent'>
              <Sidebar.Item
                icon={HiUser}
                className={`custom-sidebar-item ${tab === 'manage-workforce' ? 'active' : ''}`}
                as='div'
                style = {{marginTop: '50px'}}
              >
                Manage workforce
              </Sidebar.Item>
            </Link>
            <Link to='/hiring-form'>
              <Sidebar.Item
                icon={HiPlus}
                className={`custom-sidebar-item ${tab === 'hire-more' ? 'active' : ''}`}
                as='div'
              >
                Hire more
              </Sidebar.Item>
            </Link>
            <Link to='/schedule'>
              <Sidebar.Item
                icon={SlCalender}
                className={`custom-sidebar-item ${tab === 'customer-support' ? 'active' : ''}`}
                as='div'
                style = {{marginTop: '5px'}}
              >
               schedule
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </div>
        <div>
          <Sidebar.ItemGroup>
            <Link to='/feedback'>
              <Sidebar.Item
                icon={HiChat}
                className={`custom-sidebar-item ${tab === 'customer-support' ? 'active' : ''}`}
                as='div'
                style = {{marginTop: '480px'}}
              >
                Customer support
              </Sidebar.Item>
            </Link>
            
            <Link to='/dashboard?tab=profile'>
              <Sidebar.Item
                icon={HiCog}
                className={`custom-sidebar-item ${tab === 'settings' ? 'active' : ''}`}
                as='div'
              >
                Settings
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </div>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default WorkforceSidebar;
