 
const GoogleMap = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6623.553955826837!2d35.5192045!3d33.8953972!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f3d8044acc601%3A0x38a4620ae23fb258!2sCoducators!5e0!3m2!1sen!2slb!4v1749481560302!5m2!1sen!2slb"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
 