import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { getPersonImg } from './api';

const classNames = require('classnames')

export const Review = ({review}) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null)

  return (
    <div
      ref={ref}
      onClick={() => {
        setActive(!active)
      }}
      id={review.id}
      className={classNames(["review", {'review--active': active}])}
    >
      <div className={classNames(["review__author", {'review__author--active': active}])}>
        <img
          src={getPersonImg(review.author_details.avatar_path)}
          alt=""
          className="review__author-img"
        />
        <div className="review__author-nickname">
          {review.author_details.name}
        </div>
      </div>
      <div className={classNames(["review__content", {'review__content--active': active}])}>
        {review.content}
      </div>
      <div className="review__footer">
        {new Date(review.created_at).toLocaleString('default', { year: 'numeric', month: 'long' })}
      </div>
    </div>
  )
}
