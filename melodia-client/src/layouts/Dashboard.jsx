import { FaHome, FaMusic, FaUser } from 'react-icons/fa';
import { MdPayments } from 'react-icons/md';
import { BiSelectMultiple } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi';
import { GiMusicSpell } from 'react-icons/gi';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAdmin from '../Hooks/UseAdmin';
import useInstructor from '../Hooks/UseInstructor';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem("theme")
    document.querySelector("html").setAttribute("data-theme", localTheme)
  }, [theme])

  const handleToggle = e => {
    if (e.target.checked) {
      setTheme("forest")
    }
    else {
      setTheme("light")
    }
  }

  const bgColor = theme === 'light' ? 'bg-[#fbf7f4]' : 'bg-[#3e3e3e]';

  return (
    <div>
      {/* drawer */}
      <div className="drawer lg:drawer-open bg--[#3e3e3e]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content py-10 px-20">
          <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className={`menu h-full rounded w-64 shadow p-4 ${bgColor}`}>
            <div className="p-8 flex justify-between items-center">
              <h3 className='text-xl font-medium'>
                <Link to='/'>Melodia</Link>
              </h3>
              <label className="swap swap-rotate bg-opa">

                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  onChange={handleToggle}
                  checked={theme === 'light' ? false : true}
                />

                {/* sun icon */}
                <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                {/* moon icon */}
                <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

              </label>
            </div>
            {/* Sidebar content here */}
            {/* admin */}
            {
              isAdmin ? <>
                <li className="py-2 px-8">
                  <NavLink to={'/dashboard/manageClasses'}><FaMusic></FaMusic> Manage Classes</NavLink>
                </li>
                <li className="py-4 px-8">
                  <NavLink to={'/dashboard/manageUser'}> <FaUser></FaUser> Manage Users</NavLink>
                </li>
              </> :
                isInstructor ?
                  <>
                    <li className="py-2 px-8">
                      <NavLink to={'/dashboard/addClass'}><FaMusic></FaMusic> Add a Class</NavLink>
                    </li>
                    <li className="py-4 px-8">
                      <NavLink to={'/dashboard/myClasses'}> <FaUser></FaUser> My Classes</NavLink>
                    </li>
                  </>

                  : <>
                    <li className="py-2 px-8">
                      <NavLink to={'/dashboard/selectedClasses'}><FaMusic></FaMusic> Selected Classes</NavLink>
                    </li>
                    <li className="py-4 px-8">
                      <NavLink to={'/dashboard/enrolledClasses'}> <BiSelectMultiple></BiSelectMultiple> Enrolled Classes</NavLink>
                    </li>
                    <li className="py-4 px-8">
                      <NavLink to={'/dashboard/paymentHistory'}> <MdPayments></MdPayments> Payment History</NavLink>
                    </li>
                  </>
            }
            <div className="flex flex-col w-full border-opacity-50">
              <div className="divider"></div>
            </div>
            <li className="py-2 mt-1 px-8">
              <NavLink to={'/'}><FaHome></FaHome> Home</NavLink>
            </li>
            <li className="py-2 px-8">
              <NavLink to={'/instructors'}><HiUsers></HiUsers> Instructors</NavLink>
            </li>
            <li className="py-4 px-8">
              <NavLink to={'/classes'}><GiMusicSpell></GiMusicSpell>Classes</NavLink>
            </li>
          </ul>

        </div>
      </div>
    </div >
  );
}

export default Dashboard;

