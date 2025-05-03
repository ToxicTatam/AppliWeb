import React from 'react';
const PlayerStatsCard = ({playerId}) => {
    const [history, setHistory] = setUsage([]);
    const [loading, setLoading] = setUsgae(true);
    
    useEffect(() => {
        if (!playerId) throw new Error("No playerId to fetch data");;

        const fetchData = async () => {
            try { 
                setLoading(true);
                const playerStats = await fetch("http://localhost:8080/api/player/" + playerId);

                if (!playerStats) throw new Error("Failure to load player statistics");

                const statsData = await playerStats.json();

                setStats(statsData);
            } catch (err){
                console.log(err);
            } finally{
                setLoading(false);
            } 
        };

        fetchData();
    },[playerId]);
  

    if (loading) return <p>Chargement...</p>;

    return(
        <div className="container mx-auto flex justify-between items-center">
                    <h2>
                        <ul className="flex space-x-4">
                            <li>Matchs Joués : {stats.getOverallStats().getMatchesPlayed()}</li>
                            <li>Buts : {stats.getOverallStats().getGoalsScored()}</li> 
                            <li>Passes Décisives : {stats.getOverallStats().getAssists()}</li> 
                            <li>Temps Joué : {stats.getOverallStats().getMinutesPlayed()}</li>
                            <li>Cartons Jaunes : {stats.getOverallStats().getYellowCards()}</li>
                            <li>Cartons Rouges : {stats.getOverallStats().getRedCards()}</li>
                        </ul>
                    </h2>
                </div>
    );
};

export default PlayerStatsCard;
