import React, { FC } from "react"
import { Modal } from "@material-ui/core"
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton
} from "react-share"

type ShareModalProps = {
  isOpen: boolean
  onClose: () => void
  url: string
}
const ShareModal: FC<ShareModalProps> = ({ isOpen, onClose, url }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-content">
        <div className="share-modal__container">
          <button onClick={onClose} className="modal-content__close-button">
            <img src="/images/close.svg" alt="Cross icon" />
          </button>
          <h3 className="share-modal__title">Spread the word</h3>
          <div className="share-modal__buttons">
            <FacebookShareButton url={url}>
              <FacebookIcon />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <TwitterIcon />
            </TwitterShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon />
            </LinkedinShareButton>
            <EmailShareButton url={url}>
              <EmailIcon />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
