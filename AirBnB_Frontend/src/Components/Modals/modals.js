"use client"
import { useEffect, useState } from "react"
import { useCallback } from "react"

const Modals = ({ label, content, isOpen, close }) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  

    const handleClose = useCallback(() => {
        setShowModal(false)

        // wait for animation before closing
        setTimeout(()=>{
            close(false)
        },300)
        
    }, [close])


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[90%] md:w-[80%] lg:w-[700px] mx-auto">
        <div
          className={`transform transition-all duration-300 ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
            <header className="h-[60px] relative flex items-center justify-center border-b border-b-gray-400">
              
              {/* SVG CLOSE BUTTON */}
              <div
                onClick={handleClose}
                className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <h1 className="text-lg font-bold text-gray-600">{label}</h1>
            </header>

            <section className="p-6">{content}</section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modals
