import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';

const RecruiterForm = ({ onSubmit, initialData, isEdit }) => {
    const [recruiter, setRecruiter] = useState({
        company_name: '',
        description: '',
        logo: null,
        logo_path: ''
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (initialData && isEdit) {
            setRecruiter({
                ...initialData,
                logo: null
            });
            // Set the image preview to the existing logo path with the correct URL
            setImagePreview(initialData.logo_path ? `http://localhost:3663${initialData.logo_path}` : null);
        }
    }, [initialData, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('company_name', recruiter.company_name);
            formData.append('description', recruiter.description);
            if (recruiter.logo) {
                formData.append('logo', recruiter.logo);
            }
            // Add a flag to indicate if the logo should be removed
            formData.append('remove_logo', !imagePreview && isEdit ? 'true' : 'false');

            if (isEdit) {
                await onSubmit(formData);
            } else {
                const response = await api.post('/api/training-placement/recruiters', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Recruiter added:', response.data);
                toast.success('Recruiter added successfully');
                setRecruiter({ company_name: '', description: '', logo: null, logo_path: '' });
                setImagePreview(null);
                if (onSubmit) onSubmit();
            }
        } catch (error) {
            console.error('Error submitting recruiter:', error);
            toast.error('Failed to submit recruiter');
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setRecruiter({ ...recruiter, logo: file });
            
            // Create preview URL for the new image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <input
                type="text"
                placeholder="Company Name"
                value={recruiter.company_name}
                onChange={(e) => setRecruiter({...recruiter, company_name: e.target.value})}
                className="p-2 rounded border"
                required
            />
            <textarea
                placeholder="Description"
                value={recruiter.description}
                onChange={(e) => setRecruiter({...recruiter, description: e.target.value})}
                className="p-2 rounded border"
                rows="3"
            />
            <div className="space-y-2">
                {imagePreview && (
                    <div className="overflow-hidden relative w-32 h-32 rounded border group">
                        <img 
                            src={imagePreview} 
                            alt="Logo preview" 
                            className="object-contain w-full h-full"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setImagePreview(null);
                                setRecruiter({ ...recruiter, logo: null, logo_path: '' });
                            }}
                            className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-bl opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            ✕
                        </button>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="p-2 w-full rounded border"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                {isEdit ? 'Update Recruiter' : 'Add Recruiter'}
            </button>
        </form>
    );
};

export default RecruiterForm; 