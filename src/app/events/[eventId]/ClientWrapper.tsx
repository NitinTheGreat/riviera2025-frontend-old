'use client'

import { useState } from 'react'
import { Share2, X, Link2, Facebook, Twitter } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export default function ClientWrapper({ eventSlug }: { eventSlug: string }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/events/${eventSlug}`

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false)
  }

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      toast.success("Link copied to clipboard!", {
        icon: "🎉",
        style: {
          background: '#4CAF50',
          color: '#fff',
        },
      });
    } catch (err) {
      console.error("Failed to copy link: ", err);
      toast.error("Failed to copy link");
    }
  };
  

  const handleSharePlatform = (platform: string) => {
    let shareLink = ""
    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodeURIComponent(`Check out this event: ${shareUrl}`)}`
        break
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Check out this event!")}`
        break
    }
    window.open(shareLink, "_blank")
  }

  return (
    <>
      <button
        onClick={handleShare}
        className="absolute top-2 right-2 bg-primary rounded-full p-2 cursor-pointer shadow-md hover:bg-gray-40000"
        aria-label="Share event"
      >
        <Share2 size={24} color="white" />
      </button>

      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseShareModal}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-700 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary-foreground">Share this event</h2>
                <button
                  onClick={handleCloseShareModal}
                  className="text-primary-foreground hover:text-primary transition-colors duration-200"
                >
                  <X size={32} />
                </button>
              </div>
              <div className="space-y-4">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition duration-200"
                >
                  <Link2 size={20} />
                  Copy Link
                </button>
                <button
                  onClick={() => handleSharePlatform("whatsapp")}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.917 1.05 5.591 2.79 7.665L1.102 23.99l4.425-1.642C7.537 23.418 9.702 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.068 0-3.996-.613-5.617-1.66l-3.342 1.238 1.266-3.173C3.38 16.715 2 14.486 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.778-13.889l-1.389-.389c-.168-.047-.356.017-.467.111-.237.201-.547.49-.743.768-.104.148-.237.339-.317.486-.137.254-.215.312-.368.194-1.104-.857-2.044-1.893-2.751-3.035-.126-.204-.097-.368.05-.55.113-.14.241-.301.335-.451.19-.305.235-.67.115-1.007l-.472-1.333c-.097-.274-.352-.453-.642-.453-.097 0-.193.018-.284.053l-1.767.624c-.336.119-.554.446-.554.803 0 2.489 2.956 5.622 6.59 5.622.174 0 .347-.016.516-.048l1.694-.451c.265-.07.451-.318.451-.596 0-.028-.002-.055-.005-.082l-.225-1.265c-.044-.25-.247-.44-.497-.47z"/>
                  </svg>
                  Share on WhatsApp
                </button>
                <button
                  onClick={() => handleSharePlatform("facebook")}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  <Facebook size={20} />
                  Share on Facebook
                </button>
                <button
                  onClick={() => handleSharePlatform("twitter")}
                  className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                  <Twitter size={20} />
                  Share on Twitter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

