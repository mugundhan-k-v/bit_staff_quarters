import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout';
import '../../css/user/addcomplaint.css';
import { FacultyContext } from '../../context/FacultyContext';

const AddComplaintPage = () => {
    const [formState, setFormState] = useState({
        category: '',
        description: '',
        quarters: '',
        proof: null, // proof will be a file object
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const navigate = useNavigate();
    const { facultyId } = useContext(FacultyContext);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type (Only allow images and videos)
        if (!['image/jpeg', 'image/png', 'video/mp4', 'video/webm'].includes(file.type)) {
            setUploadError('Only JPG, PNG images, and MP4, WebM videos are allowed.');
            return;
        }

        setUploadError('');
        setFormState((prevState) => ({
            ...prevState,
            proof: file, // Store the selected file directly
        }));
    };

    // Handle drag over event
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    // Handle drag leave event
    const handleDragLeave = () => {
        setDragActive(false);
    };

    // Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileChange({ target: { files: [file] } });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!facultyId) {
            setErrorMessage('Faculty ID is missing. Please try logging in again.');
            return;
        }

        const formData = new FormData(); // Create FormData to send file
        formData.append('facultyId', facultyId);
        formData.append('category', formState.category);
        formData.append('quarters', formState.quarters);
        formData.append('description', formState.description);
        formData.append('status', 'Pending'); // Default status

        // If a proof (file) is selected, append it to formData
        if (formState.proof) {
            formData.append('proof', formState.proof); // Send file as proof
        }

        try {
            const response = await fetch('http://localhost:5000/api/complaints', {
                method: 'POST',
                body: formData, // Send FormData object in the request
            });

            if (response.ok) {
                navigate('/complaints'); // Navigate to complaints page on success
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to add complaint. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error adding complaint. Please try again later.');
        }
    };

    return (
        <PageLayout>
            <div className="add-page">
                <form onSubmit={handleSubmit}>
                    <h1>Add New Complaint</h1>
                    <select
                        name="category"
                        value={formState.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Gardening">Gardening</option>
                        <option value="Others">Others</option>
                    </select>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formState.description}
                        onChange={handleChange}
                        required
                    />
                    <p className='warning'>**Description should be alteast 10 characters**</p>
                    <input
                        type="text"
                        name="quarters"
                        placeholder="Quarters No"
                        value={formState.quarters}
                        onChange={handleChange}
                        required
                    />
                    <div
                        className={`file-upload ${dragActive ? 'drag-active' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/jpeg, image/png, video/mp4, video/webm"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                        <p>Drag & Drop your file here or click to select a file</p>
                        {formState.proof && <p className="file-name">{formState.proof.name}</p>}
                    </div>
                    <p className='warning'>**File size does not exceed 10MB**</p>
                    {uploadError && <div className="error-message">{uploadError}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}   
                    <button type="submit">Submit</button>
                </form>
            </div>
        </PageLayout>
    );
};

export default AddComplaintPage;