const Notification = ({ message }) => {
  if (message === null) return null;

  return (
    <div
      className={`notification ${
        message.type === 'error' ? 'error' : 'success'
      }`}
    >
      {message.content}
    </div>
  );
};

export default Notification;
