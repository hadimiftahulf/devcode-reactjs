import React from 'react'

function EmptyState({datacy, src, onClick}) {
  return (
    <div data-cy={datacy} onClick={() => onClick()} class="empty-data">
      <img src={`${src}`} />
    </div>
  )
}

export default EmptyState
