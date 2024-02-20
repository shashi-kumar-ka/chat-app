import React from 'react'

const ListItem = () => {
  return (
    <>
        <div className="container">
            <div className="box">
                <div className="logo">

                </div>
                <div className="message-info">
                    <div className="title"><p className='h-primary'>Title</p><p className='h-secondary'>Date</p></div>
                    <p className='h-primary'>Subheading</p>
                    <p className='h-secondary'>sub heading 2</p>
                </div>
            </div>
        </div>
        <hr className='hr-line' />
    </>
  )
}

export default ListItem