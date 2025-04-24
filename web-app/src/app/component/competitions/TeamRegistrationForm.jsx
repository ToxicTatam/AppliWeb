import React, { useState, useEffect } from 'react';
import { Users, CheckCircle } from 'lucide-react';

const TeamRegistrationForm = ({ competition, userTeams, onSubmit, isSubmitting = false }) => {
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const [errors, setErrors] = useState({});
    const [confirmation, setConfirmation] = useState(false);

    // Set the first team as default if available
    useEffect(() => {
        if (userTeams && userTeams.length > 0) {
            setSelectedTeamId(userTeams[0].id);
        }
    }, [userTeams]);

    // Handle team selection
    const handleTeamSelect = (e) => {
        setSelectedTeamId(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};
        if (!selectedTeamId) newErrors.team = 'Please select a team';
        if (!confirmation) newErrors.confirmation = 'Please confirm your registration';

        setErrors(newErrors);

        // If no errors, submit the form
        if (Object.keys(newErrors).length === 0) {
            onSubmit({
                teamId: selectedTeamId,
                competitionId: competition.id
            });
        }
    };

    // Check if team is eligible (example criteria)
    const isTeamEligible = (team) => {
        // Add your eligibility criteria here
        // For example: team size, age restrictions, etc.
        return true;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                <h2 className="text-lg font-semibold text-blue-800">Register for {competition?.name}</h2>
                <p className="text-sm text-blue-600">
                    Registration deadline: {competition?.registrationDeadline ?
                    new Date(competition.registrationDeadline).toLocaleDateString() :
                    'No deadline set'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Team Selection */}
                <div>
                    <label htmlFor="teamSelect" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Team to Register
                    </label>

                    {userTeams && userTeams.length > 0 ? (
                        <div className="space-y-4">
                            {userTeams.map(team => (
                                <div
                                    key={team.id}
                                    className={`relative border rounded-lg p-4 ${
                                        selectedTeamId === team.id.toString()
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        id={`team-${team.id}`}
                                        name="teamSelect"
                                        value={team.id}
                                        checked={selectedTeamId === team.id.toString()}
                                        onChange={handleTeamSelect}
                                        className="sr-only"
                                    />

                                    <label htmlFor={`team-${team.id}`} className="cursor-pointer flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                <Users className="h-6 w-6 text-gray-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">{team.name}</h3>
                                                <p className="text-sm text-gray-500">{team.players?.length || 0} players</p>
                                            </div>
                                        </div>

                                        {selectedTeamId === team.id.toString() && (
                                            <CheckCircle className="h-5 w-5 text-blue-500" />
                                        )}
                                    </label>

                                    {!isTeamEligible(team) && (
                                        <div className="mt-2 text-sm text-red-600">
                                            This team does not meet eligibility requirements
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <p className="text-gray-500">You don't have any teams yet.</p>
                            <a href="/dashboard/coach/teams" className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-800">
                                Create a team first
                            </a>
                        </div>
                    )}

                    {errors.team && <p className="mt-1 text-sm text-red-600">{errors.team}</p>}
                </div>

                {/* Competition Details Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Competition Details</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li><span className="font-medium">Type:</span> {competition?.competitionType}</li>
                        <li><span className="font-medium">Dates:</span> {competition?.startDate && competition?.endDate ?
                            `${new Date(competition.startDate).toLocaleDateString()} - ${new Date(competition.endDate).toLocaleDateString()}` :
                            'Dates not specified'}</li>
                        <li><span className="font-medium">Location:</span> {competition?.location || 'Not specified'}</li>
                        <li><span className="font-medium">Teams:</span> {competition?.teams?.length || 0} / {competition?.maxTeams || 'unlimited'}</li>
                    </ul>
                </div>

                {/* Confirmation Checkbox */}
                <div className="pt-2">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="confirmation"
                                name="confirmation"
                                type="checkbox"
                                checked={confirmation}
                                onChange={() => setConfirmation(!confirmation)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="confirmation" className="font-medium text-gray-700">
                                I confirm that my team will participate in this
                            </label>
                        </div>
                    </div>

                    {errors.confirmation && <p className="mt-1 text-sm text-red-600">{errors.confirmation}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeamRegistrationForm;
