import React, { useEffect } from 'react';
const PlayerCard = ({playerId}) => {
    const [history, setHistory] = setUsage([]);
    const [loading, setLoading] = setUsgae(true);
    
    useEffect(() => {
        if (!playerId) throw new Error("No playerId to fetch data");;

        const fetchData = async () => {
            try { 
                setLoading(true);
                const playerHistory= await fetch("http://localhost:8080/api/player/" + playerId + "/history");

                if (!playerHistory) throw new Error("Failure to load plyer history");

                const historyData = await playerHistory.json();

                setHistory(historyData);
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
                    <h1 className="text-2xl font-bold">
                        <Link href="/public">Joueur</Link>
                    </h1>
                    <h2>
                        <ul className="flex space-x-4">
                           {history.map((entry, i) => (
                                <li key={i}>
                                    Match n°{entry.matchId} - Note {entry.rating} 
                                </li> 
                           ))} 
                            
                        </ul>
                    </h2>
                </div>
    );  
};

export default PlayerCard;
