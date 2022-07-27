import { useEffect, useState } from 'react'
import { IoIosArrowDropupCircle } from "react-icons/io";
import scrollUp from './scrollUp';

const BackToTop = () => {
  const [backToTop, setBackToTop] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1500) {
        setBackToTop(true)
      } else {
        setBackToTop(false)
      }
    })
  }, [])

  return (
    <div>
        {backToTop && <div className="back-to-top d-flex justify-content-center align-items-center">
          <IoIosArrowDropupCircle className="back-to-top-icon" onClick={() => scrollUp()} />
        </div>}
    </div>
  )
}

export default BackToTop