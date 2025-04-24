import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

const CompetitionCard = ({ competition, onRegister, onViewDetails, userRole }) => {
    // Format dates for display
    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), 'dd MMM yyyy');
        } catch (error) {
            return 'Date unavailable';
        }
    };

    // Calculate if registration is still open
    const isRegistrationOpen = () => {
        if (!competition.registrationDeadline) return false;
        return new Date(competition.registrationDeadline) >= new Date();
    };

    // Status badge color based on competition status
    const getStatusColor = (status) => {
        switch (status) {
            case 'UPCOMING':
                return 'bg-blue-100 text-blue-800';
            case 'ONGOING':
                return 'bg-green-100 text-green-800';
            case 'COMPLETED':
                return 'bg-gray-100 text-gray-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{competition.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(competition.status)}`}>
            {competition.status}
          </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{competition.description}</p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(competition.startDate)} - {formatDate(competition.endDate)}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{competition.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{competition.teams?.length || 0} / {competition.maxTeams || 'unlimited'} teams</span>
                    </div>

                    {competition.registrationDeadline && (
                        <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>Registration deadline: {formatDate(competition.registrationDeadline)}</span>
                        </div>
                    )}
                </div>

                <div className="flex space-x-2 pt-3 border-t border-gray-100">
                    <button
                        onClick={() => onViewDetails(competition.id)}
                        className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium transition-colors"
                    >
                       Voir details
                    </button>

                    {userRole === 'COACH' && isRegistrationOpen() && (
                        <button
                            onClick={() => onRegister(competition.id)}
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                        >
                            Enregistrer une equipe
                        </button>
                    )}

                    {userRole === 'ADMIN' && (
                        <button
                            onClick={() => onViewDetails(competition.id)}
                            className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors"
                        >
                            Gerer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompetitionCard;