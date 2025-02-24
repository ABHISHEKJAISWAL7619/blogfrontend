import React from 'react'
import { Steps } from 'antd';
const description = 'This is a description.';

const Progressbar = () => {
  return (
    <div>
          <Steps
    direction="horizontal"
    current={1}
    items={[
      {
        title: 'Plz follow'
      },
      {
        title: 'Show User Post'
      }
    ]}
  />
      
    </div>
  )
}

export default Progressbar
