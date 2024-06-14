import React, { useState } from 'react'
import ModalWrapper from '../../../customComponents/ModalWrapper'
import ChatHeader from './ChatHeader'
import AddUser from './AddUser'
import RemoveUser from './RemoveUser'
import Others from './Others'

const UpdateGroupChat = ({ isOpen, setIsOpen }) => {

  const [selectedTab, setSelectedTab] = useState(1)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <ModalWrapper open={isOpen} onClose={handleClose}>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 '>
          <ChatHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        {selectedTab === 1 &&
          <div>
            <AddUser handleClose={handleClose} />
          </div>
        }
        {selectedTab === 2 &&
          <div>
            <RemoveUser handleClose={handleClose} />
          </div>
        }
        {selectedTab === 3 &&
          <div>
            <Others handleClose={handleClose} />
          </div>
        }
      </div>
    </ModalWrapper>
  )
}

export default UpdateGroupChat
