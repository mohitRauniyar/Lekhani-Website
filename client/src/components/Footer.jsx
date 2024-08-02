import React from 'react'
import {Footer} from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function FooterComponent() {
  return (
    <Footer className='border border-t-8 border-indigo-950 p-10'>
        <div className="w-full mx-auto max-w-7xl">
            <div className=" grid w-full justify-between lg:flex lg:grid-cols-1" >
                    <Link to='/' className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-indigo-950 text-white rounded-md'>Lekhani</span>
                        <span className=' font-semibold px-5'>X</span>
                        <span className='px-2 py-1 bg-pink-600 text-white rounded-md'>Amrita</span>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 md:grid-cols-3 sm:gap-6">
                    <div>
                        <Footer.Title title='About'/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='/about'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                This Site
                            </Footer.Link>
                            <Footer.Link
                                href='/about'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Lekhani Club
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow us'/>
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='/about'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Instagram
                            </Footer.Link>
                            <Footer.Link
                                href='/about'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Snapchat
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Contact us'/>
                        <Footer.LinkGroup col>
                            <p>bl.en.u4cse22089@bl.students.amrita.edu</p>
                            <p>Room - 102, E-block</p>
                        </Footer.LinkGroup>
                    </div>
            </div>
        </div>
    </Footer>
  )
}
