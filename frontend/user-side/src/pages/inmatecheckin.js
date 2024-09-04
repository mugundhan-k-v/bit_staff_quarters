
//inmatecheckin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../component/PageLayout';
// import "./inmatecheckin.css"

const InmateCheckinPage = ({ checkinDetails }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleAddClick = () => {
        navigate('/addcheckin');
      }
      return (
        <PageLayout>
        <div className="details-page">
            <div className="details-content">
                <h1>Inmate Check-in Details</h1>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button className="add-button" onClick={handleAddClick}>Add <strong>+</strong></button>
                </div>
                <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Check-in Time</th>
                            <th>Check-out Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkinDetails.filter(detail => detail.name.includes(search)).map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.name}</td>
                                <td>{detail.checkinTime}</td>
                                <td>{detail.checkoutTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </PageLayout>
    );
};

export default InmateCheckinPage;
     
    //  In the above code, we have created a functional component  InmateCheckinPage  that takes  checkinDetails  as a prop. This component renders the list of check-in details of inmates. It also has a search bar to filter the list of inmates based on the name. 
    //  The  handleAddClick  function is used to navigate to the  /addcheckin  route when the Add button is clicked. 
    //  Step 4: Create AddCheckinPage Component 
    //  Now, let’s create the  AddCheckinPage  component to add a new check-in detail for an inmate. 
    //  Path: frontend/my-react-app/src/addcheckin.js