  import React, { useState } from 'react';
  import axios from 'axios';

  const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline";
  const labelClasses = "block text-white text-sm font-bold mb-2 w-screen";
  const buttonClasses = "bg-white hover:bg-zinc-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  const SignUpForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      bloodGroup: '',
      phone: '',
      altPhone: '',
      address: ''
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http:localhost:3000/server/user', formData);
        console.log('User data submitted successfully');
        // Optionally, you can redirect the user to another page after successful submission
      } catch (error) {
        console.error('Error submitting user data:', error);
      }
    };

    return (
      <div className="bg-black  p-8">
        <div className="max-w-lg mx-auto bg-gray p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 bg-gray">
              <label htmlFor="name" className={labelClasses}>Your Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClasses} />
            </div>
            <div className="mb-4">
              <label htmlFor="blood-group" className={labelClasses}>Blood Group</label>
              <input type="text" id="blood-group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" className={inputClasses} />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className={labelClasses}>Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className={inputClasses} />
            </div>
            <div className="mb-4">
              <label htmlFor="alt-phone" className={labelClasses}>Alternate Phone Number</label>
              <input type="tel" id="alt-phone" name="altPhone" value={formData.altPhone} onChange={handleChange} placeholder="Alternate Phone Number" className={inputClasses} />
            </div>
            <div className="mb-6">
              <label htmlFor="address" className={labelClasses}>Address</label>
              <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="Your Address" className={inputClasses}></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button className={buttonClasses} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default SignUpForm;
