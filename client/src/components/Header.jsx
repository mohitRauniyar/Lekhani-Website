import React from 'react'
import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link , useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'


export default function Header() {
    const path = useLocation().pathname
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-indigo-950 text-white rounded-md'>Lekhani</span>
            <span className=' font-semibold px-5'>X</span>
            <span className='px-2 py-1 bg-pink-600 text-white rounded-md'>Amrita</span>
        </Link>
        <form>
            <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline'/>
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-15 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon />
            </Button>
            <Link to='/signin'>
                <Button gradientDuoTone='purpleToBlue' outline> Sign In</Button>
            </Link>
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
                <Link to='/' className='text-lg'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as={'div'}>
                <Link to='/about' className='text-lg'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/projects'} as={'div'}>
                <Link to='/projects' className='text-lg'>Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>

    </Navbar>
  )
}
