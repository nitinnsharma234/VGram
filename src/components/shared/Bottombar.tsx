import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { bottombarLinks } from '@/constants';

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">

      {
        bottombarLinks.map((link: { route: string; imgURL: string; label: string }) => {
          const isActive = pathname === link.route;
          return (

            <Link to={link.route} key={link.route} className={`${isActive  && 'bg-primary-500 rounded-[10px]'}  flex-center gap-1  p-2 flex-col`}>
              <img src={link.imgURL} className={`group-hover:invert-white ${isActive && 'invert-white'}`} 
                    height={16}
                    width={16}
              />
              <p className='tiny-medium text-light-2'>{link.label}</p>
            </Link>

          )
        })
      }

    </section>
  )
}

export default Bottombar