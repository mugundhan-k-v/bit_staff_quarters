import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout';
import { FacultyContext } from '../../context/FacultyContext';
import '../../css/user/addinmate.css';

const AddInmatePage = () => {
  const { facultyId } = useContext(FacultyContext);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [relation, setRelation] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [working, setWorking] = useState(false);
  const [employer, setEmployer] = useState('Nil'); // Default value set to 'Nil'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/inmates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          relation,
          facultyId,
          aadharNo,
          working,
          employer: working ? employer : 'Nil', // Set to 'Nil' if not working
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add inmate');
      }
      navigate('/inmatedetails');
    } catch (error) {
      console.error('Error adding inmate:', error);
    }
  };

  const handleCancel = () => {
    navigate('/inmatedetails');
  };

  return (
    <PageLayout>
      <div className="add-page">
        <div className="content">
          <form onSubmit={handleSubmit}>
            <h1>Add Inmate</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Aadhar No"
              value={aadharNo}
              onChange={(e) => setAadharNo(e.target.value)}
              required
            />
            <div className="radio-container">
              <label>
                <input
                  type="radio"
                  value={true}
                  checked={working === true}
                  onChange={() => setWorking(true)}
                />
                Working
              </label>
              <label>
                <input
                  type="radio"
                  value={false}
                  checked={working === false}
                  onChange={() => {
                    setWorking(false);
                    setEmployer('Nil'); // Set employer to 'Nil' when not working
                  }}
                />
                Not Working
              </label>
            </div>
            <input
              type="text"
              placeholder="Employer"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              required={working} // Only required if working is true
              disabled={!working} // Disable the field if not working
            />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddInmatePage;