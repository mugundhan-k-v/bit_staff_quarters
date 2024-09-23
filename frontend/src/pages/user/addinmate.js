
//addinmate.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/user/addinmate.css'
import PageLayout from '../../component/PageLayout';

const AddInmatePage = ({ addInmate }) => {
    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [age, setAge] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [working, setWorking] = useState('');
    const [employer, setEmployer] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const newInmate = { name, relation, age, aadharNo, working, employer };
        addInmate(newInmate);
        console.log({ name, relation, age, aadharNo, working, employer });
        navigate('/inmatedetails');
    }
    const handleCancel = () => {
        navigate('/inmatedetails');
    }

    return (
        <PageLayout>
        <div className="add-page">
            <div className="content" style={{ marginLeft: '250px', padding: '20px' }}>
                <h1>Add New Inmate</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        Relation:
                        <input type="text" value={relation} onChange={e => setRelation(e.target.value)} />
                    </label>
                    <label>
                        Age:
                        <input type="number" value={age} onChange={e => setAge(e.target.value)} />
                    </label>
                    <label>
                        Aadhar No:
                        <input type="number" value={aadharNo} onChange={e => setAadharNo(e.target.value)} />
                    </label>
                    <div className="radio-container">
                        <label>Working:
                            <input type="radio" value="Yes" checked={working === 'Yes'} onChange={() => setWorking('Yes')} /> Yes
                            <input type="radio" value="No" checked={working === 'No'} onChange={() => setWorking('No')} /> No
                        </label>
                    </div>
                    {working === 'Yes' && (
                        <label>
                            Employer:
                            <input type="text" value={employer} onChange={e => setEmployer(e.target.value)} />
                        </label>
                    )}
                    <div className="button-container">
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <input type="submit" value="Submit" />
                  </div>
                </form>
            </div>
        </div>
        </PageLayout>
    );
};

export default AddInmatePage;