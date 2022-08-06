import React from 'react';

export default function MessageForm() {
  return (
    <>
      <div className="form-floating mb-3">
        <input type="title" className="form-control" id="floatingInput" placeholder="Title" />
        <label htmlFor="floatingInput">Title</label>
      </div>
      <div className="form-floating">
        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} />
        <label htmlFor="floatingTextarea2">Comments</label>
      </div>
    </>
  );
}
