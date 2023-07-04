import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisiblity = () => setVisible(!visible);

  useImperativeHandle(refs, () => {
    return {
      toggleVisiblity,
    };
  });

  return (
    <>
      {!visible && (
        <div>
          <button onClick={toggleVisiblity}>{buttonLabel}</button>
        </div>
      )}

      {visible && (
        <div>
          {children}
          <button onClick={toggleVisiblity}>Cancel</button>
        </div>
      )}
    </>
  );
});

export default Togglable;
