import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';

const StatisticsForm = ({ onSubmit, initialData, isEdit }) => {
    const [stats, setStats] = useState({
        academic_year: '',
        total_placements: '',
        average_package: '',
        highest_package: '',
        companies_visited: ''
    });

    useEffect(() => {
        if (initialData && isEdit) {
            setStats(initialData);
        }
    }, [initialData, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await onSubmit(stats);
            } else {
                // Direct API call for adding new statistics
                const response = await api.post('/api/training-placement/statistics', stats);
                console.log('Statistics added:', response.data);
                toast.success('Statistics added successfully');
                setStats({
                    academic_year: '',
                    total_placements: '',
                    average_package: '',
                    highest_package: '',
                    companies_visited: ''
                });
                if (onSubmit) onSubmit(); // Refresh parent data
            }
        } catch (error) {
            console.error('Error submitting statistics:', error);
            toast.error('Failed to submit statistics');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Academic Year (e.g., 2023-24)"
                    value={stats.academic_year}
                    onChange={(e) => setStats({...stats, academic_year: e.target.value})}
                    className="p-2 rounded border"
                    required
                />
                <input
                    type="number"
                    placeholder="Total Placements"
                    value={stats.total_placements}
                    onChange={(e) => setStats({...stats, total_placements: e.target.value})}
                    className="p-2 rounded border"
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Average Package (LPA)"
                    value={stats.average_package}
                    onChange={(e) => setStats({...stats, average_package: e.target.value})}
                    className="p-2 rounded border"
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Highest Package (LPA)"
                    value={stats.highest_package}
                    onChange={(e) => setStats({...stats, highest_package: e.target.value})}
                    className="p-2 rounded border"
                    required
                />
                <input
                    type="number"
                    placeholder="Companies Visited"
                    value={stats.companies_visited}
                    onChange={(e) => setStats({...stats, companies_visited: e.target.value})}
                    className="p-2 rounded border"
                    required
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                {isEdit ? 'Update Statistics' : 'Add Statistics'}
            </button>
        </form>
    );
};

export default StatisticsForm; 