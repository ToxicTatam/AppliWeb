import React, {useState, useEffect} from 'react';
const PlayerForm = ({player=null, onSubmit, isSubmitting=false}) => {

    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        licence_number:'',
        date_of_birth:'',
        team:''
    });

    useEffect(() => {

        if(player){

            const formatDateForInput = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };

            setFormData({
                first_name: player.first_name || '',
                last_name: player.last_name || '',
                license_number: player.licence_number || '',
                date_of_birth : formatDateForInput(player.date_of_birth) || '',
                team: player.team || ''
            });
        }
    }, [player]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    // Form validation state
    const [errors, setErrors] = useState({});

    // Validate form before submission
    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
        if (!formData.license_number.trim()) newErrors.licence_number = 'License number is required'

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                {/* Name Field */}
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom*
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Info className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="fisrtName"
                            name="firstName"
                            value={formData.first_name}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            placeholder="Enter first name"
                            required
                        />
                    </div>
                    {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
                </div>


                {/* Competition Type */}
                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom*
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Type className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
                </div>

                {/* Date Of Birth */}
                <div>
                    <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                        Date de Naissance*
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Type className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>}
                </div>

                {/* License Number */}
                <div>
                    <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                        Numero de License*
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Type className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="licenceNumber"
                            name="licenceNumber"
                            value={formData.licence_number}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    {errors.license_number && <p className="mt-1 text-sm text-red-600">{errors.licence_number}</p>}
                </div>

                {/* Team */}
                <div>
                    <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                        Equipe
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Type className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="team"
                            name="team"
                            value={formData.team}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                </div>
            </div>

            
            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={(e) => {
                        if (!validateForm()) {
                            e.preventDefault();
                        }
                    }}
                    className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Saving...' : player ? 'Update Player' : 'Create Player'}
                </button>
            </div>
        </form>
    );
};

export default PlayerForm;
