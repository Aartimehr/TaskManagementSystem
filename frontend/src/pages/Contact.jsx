import { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Since this is a simple task manager, we won't build a 
    // full email backend. We'll just simulate a success state.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Thank You!</h2>
        <p>Your message has been received. We will get back to you soon.</p>
        <button onClick={() => setSubmitted(false)}>Send another message</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <h2>Contact Us</h2>
        <p>Have questions about TaskMaster? We'd love to hear from you.</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label>Message</label>
            <textarea 
              rows="5" 
              placeholder="How can we help you?" 
              style={{
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ddd',
                fontFamily: 'inherit'
              }}
              required
            ></textarea>
          </div>
          
          <button type="submit" style={{ width: '100%' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;