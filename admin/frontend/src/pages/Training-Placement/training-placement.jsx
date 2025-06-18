import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import StatisticsForm from './components/StatisticsForm';
import RecruiterForm from './components/RecruiterForm';
import Modal from '../../components/Modal';

const TrainingPlacement = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [overview, setOverview] = useState({ description: '', vision: '', mission: '' });
    const [editingOverview, setEditingOverview] = useState({ description: '', vision: '', mission: '' });
    const [statistics, setStatistics] = useState([]);
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, type: '', id: null });
    const [editModal, setEditModal] = useState({ show: false, type: '', data: null, isOverview: false });
    const [overviewEditMode, setOverviewEditMode] = useState(false);
    const [editingStatistics, setEditingStatistics] = useState({
        academic_year: '',
        total_placements: '',
        average_package: '',
        highest_package: '',
        companies_visited: ''
    });
    const [editingRecruiter, setEditingRecruiter] = useState({
        company_name: '',
        description: '',
        logo: null
    });
    const [logoPreview, setLogoPreview] = useState(null);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            const [overviewRes, statsRes, recruitersRes] = await Promise.all([
                api.get('/api/training-placement/overview'),
                api.get('/api/training-placement/statistics'),
                api.get('/api/training-placement/recruiters')
            ]);

            setOverview(overviewRes.data || { description: '', vision: '', mission: '' });
            setEditingOverview(overviewRes.data || { description: '', vision: '', mission: '' });
            setStatistics(Array.isArray(statsRes.data) ? statsRes.data : []);
            setRecruiters(Array.isArray(recruitersRes.data) ? recruitersRes.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleEditOverviewClick = (e) => {
        e.preventDefault();
        setEditingOverview({ ...overview });
        setOverviewEditMode(true);
    };

    const handleOverviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/api/training-placement/overview', editingOverview);
            setOverview(editingOverview);
            toast.success('Overview updated successfully');
            setOverviewEditMode(false);
        } catch (error) {
            console.error('Error updating overview:', error);
            toast.error('Failed to update overview');
        }
    };

    const handleDeleteStatistics = async (id) => {
        if (window.confirm('Are you sure you want to delete this statistics record?')) {
            try {
                await api.delete(`/api/training-placement/statistics/${id}`);
                toast.success('Statistics deleted successfully');
                fetchAllData();
            } catch (error) {
                console.error('Error deleting statistics:', error);
                toast.error('Failed to delete statistics');
            }
        }
    };

    const handleDeleteRecruiter = async (id) => {
        if (window.confirm('Are you sure you want to delete this recruiter?')) {
            try {
                await api.delete(`/api/training-placement/recruiters/${id}`);
                toast.success('Recruiter deleted successfully');
                fetchAllData();
            } catch (error) {
                console.error('Error deleting recruiter:', error);
                toast.error('Failed to delete recruiter');
            }
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            if (deleteModal.type === 'statistics') {
                await api.delete(`/api/training-placement/statistics/${deleteModal.id}`);
                toast.success('Statistics deleted successfully');
            } else {
                await api.delete(`/api/training-placement/recruiters/${deleteModal.id}`);
                toast.success('Recruiter deleted successfully');
            }
            fetchAllData();
        } catch (error) {
            console.error('Error deleting:', error);
            toast.error(`Failed to delete ${deleteModal.type}`);
        }
        setDeleteModal({ show: false, type: '', id: null });
    };

    const handleStatisticsSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/api/training-placement/statistics/${editModal.data.id}`, editingStatistics);
            if (response.status === 200) {
                toast.success('Statistics updated successfully');
                setEditModal({ show: false, type: '', data: null });
                fetchAllData();
            }
        } catch (error) {
            console.error('Error updating statistics:', error);
            toast.error('Failed to update statistics');
        }
    };

    const handleRecruiterSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(editingRecruiter).forEach(key => {
                if (key !== 'logo' || editingRecruiter[key] !== null) {
                    formData.append(key, editingRecruiter[key]);
                }
            });

            const response = await api.put(
                `/api/training-placement/recruiters/${editModal.data.id}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Recruiter updated successfully');
                setEditModal({ show: false, type: '', data: null });
                fetchAllData();
            }
        } catch (error) {
            console.error('Error updating recruiter:', error);
            toast.error('Failed to update recruiter');
        }
    };

    const handleEditStatisticsClick = (statistics) => {
        setEditingStatistics(statistics);
        setEditModal({ show: true, type: 'statistics', data: statistics });
    };

    const handleEditRecruiterClick = (recruiter) => {
        setEditingRecruiter({
            ...recruiter,
            logo: null
        });
        setLogoPreview(recruiter.logo_path ? `http://localhost:3663${recruiter.logo_path}` : null);
        setEditModal({ show: true, type: 'recruiters', data: recruiter });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditingRecruiter({
                ...editingRecruiter,
                logo: file
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Training & Placement Management</h1>
            
            {/* Tabs */}
            <div className="mb-6 border-b">
                <nav className="flex -mb-px space-x-8">
                    {['overview', 'statistics', 'recruiters'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm capitalize
                                ${activeTab === tab 
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Overview Section</h2>
                        
                        {/* Current Overview Display */}
                        <div className="mb-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Section</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Content</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 font-medium">Description</td>
                                            <td className="px-6 py-4 whitespace-pre-wrap">{overview.description || 'No description available'}</td>
                                            <td className="px-6 py-4" rowSpan="3">
                                                <button
                                                    onClick={handleEditOverviewClick}
                                                    className="font-medium text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium">Vision</td>
                                            <td className="px-6 py-4 whitespace-pre-wrap">{overview.vision || 'No vision available'}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-medium">Mission</td>
                                            <td className="px-6 py-4 whitespace-pre-wrap">{overview.mission || 'No mission available'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Overview Edit Modal - without the Modal component's default buttons */}
                        {overviewEditMode && (
                            <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
                                <div className="p-6 w-full max-w-md bg-white rounded-lg">
                                    <h2 className="mb-4 text-xl font-bold">Edit Overview</h2>
                                    <form onSubmit={handleOverviewSubmit} className="space-y-4">
                                        <div>
                                            <label className="block mb-2 font-medium">Description</label>
                                            <textarea
                                                value={editingOverview.description || ''}
                                                onChange={(e) => setEditingOverview({...editingOverview, description: e.target.value})}
                                                className="p-2 w-full rounded border"
                                                rows="4"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-medium">Vision</label>
                                            <textarea
                                                value={editingOverview.vision || ''}
                                                onChange={(e) => setEditingOverview({...editingOverview, vision: e.target.value})}
                                                className="p-2 w-full rounded border"
                                                rows="3"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-medium">Mission</label>
                                            <textarea
                                                value={editingOverview.mission || ''}
                                                onChange={(e) => setEditingOverview({...editingOverview, mission: e.target.value})}
                                                className="p-2 w-full rounded border"
                                                rows="3"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => setOverviewEditMode(false)}
                                                className="px-4 py-2 text-gray-600 rounded border border-gray-300 hover:bg-gray-100"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Statistics Tab */}
                {activeTab === 'statistics' && (
                    <div className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Placement Statistics</h2>
                        <StatisticsForm onSubmit={fetchAllData} />
                        
                        <div className="mt-6">
                            <h3 className="mb-4 font-semibold">Statistics Records</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Academic Year</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Total Placements</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Avg Package (LPA)</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Highest Package (LPA)</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Companies Visited</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {statistics.map((stat, index) => (
                                            <tr key={stat.id || index}>
                                                <td className="px-6 py-4 whitespace-nowrap">{stat.academic_year}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{stat.total_placements}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{stat.average_package}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{stat.highest_package}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{stat.companies_visited}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleEditStatisticsClick(stat)}
                                                        className="mr-3 font-medium text-blue-600 hover:text-blue-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteModal({ 
                                                            show: true, 
                                                            type: 'statistics', 
                                                            id: stat.id 
                                                        })}
                                                        className="font-medium text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Statistics Edit Modal */}
                        {editModal.show && editModal.type === 'statistics' && (
                            <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
                                <div className="p-6 w-full max-w-md bg-white rounded-lg">
                                    <h2 className="mb-4 text-xl font-bold">Edit Statistics</h2>
                                    <form onSubmit={handleStatisticsSubmit} className="space-y-4">
                                        <div>
                                            <label className="block mb-2">Academic Year</label>
                                            <input
                                                type="text"
                                                value={editingStatistics.academic_year || ''}
                                                onChange={(e) => setEditingStatistics({
                                                    ...editingStatistics,
                                                    academic_year: e.target.value
                                                })}
                                                className="p-2 w-full rounded border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Total Placements</label>
                                            <input
                                                type="text"
                                                value={editingStatistics.total_placements || ''}
                                                onChange={(e) => setEditingStatistics({
                                                    ...editingStatistics,
                                                    total_placements: e.target.value
                                                })}
                                                className="p-2 w-full rounded border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Average Package (LPA)</label>
                                            <input
                                                type="text"
                                                value={editingStatistics.average_package || ''}
                                                onChange={(e) => setEditingStatistics({
                                                    ...editingStatistics,
                                                    average_package: e.target.value
                                                })}
                                                className="p-2 w-full rounded border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Highest Package (LPA)</label>
                                            <input
                                                type="text"
                                                value={editingStatistics.highest_package || ''}
                                                onChange={(e) => setEditingStatistics({
                                                    ...editingStatistics,
                                                    highest_package: e.target.value
                                                })}
                                                className="p-2 w-full rounded border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Companies Visited</label>
                                            <input
                                                type="text"
                                                value={editingStatistics.companies_visited || ''}
                                                onChange={(e) => setEditingStatistics({
                                                    ...editingStatistics,
                                                    companies_visited: e.target.value
                                                })}
                                                className="p-2 w-full rounded border"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => setEditModal({ show: false, type: '', data: null })}
                                                className="px-4 py-2 text-gray-600 rounded border border-gray-300 hover:bg-gray-100"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Recruiters Tab */}
                {activeTab === 'recruiters' && (
                    <div className="p-6">
                        <h2 className="mb-4 text-xl font-semibold">Company Recruiters</h2>
                        <RecruiterForm onSubmit={fetchAllData} />
                        
                        <div className="mt-6">
                            <h3 className="mb-4 font-semibold">Recruiter Records</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Logo</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Company Name</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Description</th>
                                            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recruiters.map((recruiter, index) => (
                                            <tr key={recruiter.id || index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {recruiter.logo_path && (
                                                        <div className="overflow-hidden w-16 h-16 rounded border">
                                                            <img 
                                                                src={`http://localhost:3663${recruiter.logo_path}`}
                                                                alt={recruiter.company_name}
                                                                className="object-contain w-full h-full"
                                                                onError={(e) => {
                                                                    console.error('Error loading image:', e);
                                                                    e.target.src = 'placeholder-image-url'; // Optional: provide a placeholder image
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{recruiter.company_name}</td>
                                                <td className="px-6 py-4">{recruiter.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleEditRecruiterClick(recruiter)}
                                                        className="mr-3 font-medium text-blue-600 hover:text-blue-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteModal({ 
                                                            show: true, 
                                                            type: 'recruiters', 
                                                            id: recruiter.id 
                                                        })}
                                                        className="font-medium text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recruiters Edit Modal */}
                        {editModal.show && editModal.type === 'recruiters' && (
                            <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
                                <div className="p-6 w-full max-w-md bg-white rounded-lg">
                                    <h2 className="mb-4 text-xl font-bold">Edit Recruiter</h2>
                                    <form onSubmit={handleRecruiterSubmit} className="space-y-4">
                                        <div>
                                            <label className="block mb-2">Company Name</label>
                                            <input
                                                type="text"
                                                value={editingRecruiter.company_name || ''}
                                                onChange={(e) => setEditingRecruiter({
                                                    ...editingRecruiter,
                                                    company_name: e.target.value
                                                })}
                                                className="p-2 w-full rounded border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Description</label>
                                            <textarea
                                                value={editingRecruiter.description || ''}
                                                onChange={(e) => setEditingRecruiter({
                                                    ...editingRecruiter,
                                                    description: e.target.value
                                                })}
                                                className="p-2 w-full rounded border"
                                                rows="3"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Logo</label>
                                            {logoPreview && (
                                                <div className="overflow-hidden relative mb-2 w-32 h-32 rounded border group">
                                                    <img 
                                                        src={logoPreview}
                                                        alt="Logo preview" 
                                                        className="object-contain w-full h-full"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setLogoPreview(null);
                                                            setEditingRecruiter({
                                                                ...editingRecruiter,
                                                                logo: null
                                                            });
                                                        }}
                                                        className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-bl opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                onChange={handleLogoChange}
                                                className="p-2 w-full rounded border"
                                                accept="image/*"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditModal({ show: false, type: '', data: null });
                                                    setLogoPreview(null);
                                                }}
                                                className="px-4 py-2 text-gray-600 rounded border border-gray-300 hover:bg-gray-100"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal - Only for delete operations */}
            <Modal
                isOpen={deleteModal.show}
                onClose={() => setDeleteModal({ show: false, type: '', id: null })}
                onConfirm={handleDeleteConfirm}
                title="Confirm Delete"
            >
                <p>Are you sure you want to delete this {deleteModal.type} record?</p>
            </Modal>
        </div>
    );
};

export default TrainingPlacement;