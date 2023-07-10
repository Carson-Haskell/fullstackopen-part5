import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

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

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Togglable;
