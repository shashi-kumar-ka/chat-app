import React from 'react'
import ListItem from '../src/components/ListItem'

const index = () => {
  return (
    <div className='relative'>
      <div className="topbar">
        <div className="container">
          <div className="navbar">
            <h3>Filter by Title / Order ID</h3>
            <input type="text" placeholder="Start typing to search" className="search-bar" />
          </div>
        </div>
        <hr className='hr-line' />
      </div>
    <div className="content">
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
    </div>
  )
}

export default index