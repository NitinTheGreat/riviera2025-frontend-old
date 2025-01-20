"use client"

import { useState } from "react"
import { Share2, X, Link2 } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export default function ClientWrapper({ eventSlug }: { eventSlug: string }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/events/${eventSlug}`

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false)
  }

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = shareUrl
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
      }
      toast.success("Link copied to clipboard!", {
        icon: "🎉",
        style: {
          background: "#4CAF50",
          color: "#fff",
        },
      })
    } catch (err) {
      console.error("Failed to copy link: ", err)
      toast.error("Failed to copy link")
    }
  }

  const handleShareWhatsApp = () => {
    const shareLink = `https://wa.me/?text=${encodeURIComponent(`Check out this event: ${shareUrl}`)}`
    window.open(shareLink, "_blank")
  }

  return (
    <>
      <button
        onClick={handleShare}
        className="absolute top-10 right-8 bg-primary rounded-full p-2 cursor-pointer shadow-md hover:bg-primary/90 transition-colors duration-200"
        aria-label="Share event"
      >
        <Share2 size={24} className="text-primary-foreground" />
      </button>

      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleCloseShareModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary-foreground bg-clip-text  bg-gradient-to-r from-primary to-purple-500">
                  Share this event
                </h2>
                <button
                  onClick={handleCloseShareModal}
                  className="text-primary-foreground hover:text-primary transition-colors duration-200"
                  aria-label="Close share modal"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-6">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-purple-500 text-primary-foreground py-3 px-6 rounded-lg hover:from-primary/90 hover:to-purple-600 transition duration-200 shadow-lg"
                >
                  <Link2 size={24} />
                  <span className="text-lg font-semibold">Copy Link</span>
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-200 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="text-lg font-semibold">Share on WhatsApp</span>
                </button>
              </div>
              <p className="text-slate-400 text-center mt-6">Share this event with your friends and colleagues!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

