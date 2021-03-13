import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  
  const handleChange = (event) => {
    //console.log('FILTER PROPS ',props)
    props.setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10,
    marginTop: 10,
  }

  return (
    <div style={style}>
      <label>
        Filter<br/>
        <input onChange={handleChange} />
      </label>
    </div>
  )
}

export default connect(null, { setFilter })(Filter)
