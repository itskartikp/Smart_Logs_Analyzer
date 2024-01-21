import React from 'react'

import PropTypes from 'prop-types'

import './question1.css'

const Question1 = (props) => {
  return (
    <div className="question1-container">
      <span className="question1-text heading3">{props.Question}</span>
      <span className="bodySmall">{props.Answer}</span>
    </div>
  )
}

Question1.defaultProps = {
  Answer:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum mi ut rhoncus.',
  Question: 'What types of cars do you sell?',
}

Question1.propTypes = {
  Answer: PropTypes.string,
  Question: PropTypes.string,
}

export default Question1
