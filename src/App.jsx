import React from 'react'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'
import Footer from './view-trip/components/Footer'

function App() {
  return (
    <div className='flex flex-col min-h-[90vh]'>
      {/* Hero Section */}
      <Hero/>

      <div className='mt-auto items-end'>
        <Footer/>
      </div>
    </div>
  )
}

export default App