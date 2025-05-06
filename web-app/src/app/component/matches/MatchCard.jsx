import React,{useState, useEffect} from 'react';
const PlayerStatsCard = ({matchId}) => {
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (!matchId) throw new Error("No matchId to fetch data");;

        const fetchData = async () => {
            try { 
                setLoading(true);
                const matchData = await fetch("http://localhost:8080/api/" + matchId);

                if (!matchData) throw new Error("Failure to load match informations");

                const matchObj = await matchData.json();

                setMatch(matchObj);
            } catch (err){
                console.log(err);
            } finally{
                setLoading(false);
            } 
        };

        fetchData();
    },[matchId]);
  

    if (loading) return <p>Chargement...</p>;

    return(
<div class="imso_mh__tm-scr imso_mh__mh-bd">
    <div>
        <div class="imso_mh__stts-l imso-ani imso_mh__stts-l-cont" style="">
            <div class="imso_mh__pst-m-stts-l">
                <span class="imso_mh__ft-mtch imso-medium-font imso_mh__ft-mtchc" aria-label="Score à la fin du temps réglementaire">{match.getMatchStatus().toString()}</span>
                <div class="imso-hide-overflow">
                    <span>
                        <span>
                            <span jscontroller="zhya9d" class="imso-loa imso-ln" role="link" style="color:#162E58" tabindex="0" jsdata="QRQcFf;_;ByyJhM" jsaction="rcuQ6b:npT2md;dnGRzb" data-ved="2ahUKEwiQiYzb3oeNAxXPZ0EAHYurCPIQr056BAgCEAk">
                                {match.getCompetition().getName()} 
                            </span>
                        </span>
                        <span class="imso_mh__bull"> · </span>
                    </span>
                    <span>
                        {match.getMatchDate().toString()} 
                    </span>
                </div>
            </div>
        </div>
        <div class="imso_mh__tm-a-sts">
            <div class="imso-ani imso_mh__tas" style="">
                <div class="imso_mh__ts-nee">
                    <div class="imso_mh__first-tn-ed imso_mh__tnal-cont imso-loa imso-ut imso-tnol" jscontroller="QhKwbc" data-df-team-mid="/m/0xbm" role="link" tabindex="0" jsdata="EdZxp;_;ByyJhQ" jsaction="rcuQ6b:npT2md;hOPlV" data-ved="2ahUKEwiQiYzb3oeNAxXPZ0EAHYurCPIQukt6BAgCEAo">
                        <div class="imso_mh__tm-nm imso-medium-font imso_mh__tm-nm-ew" data-dtype="d3sen">
                            <div class="ellipsisize liveresults-sports-immersive__team-name-width" data-df-team-mid="/m/0xbm">
                                <span aria-hidden="true">
                                    {match.getHomeTeam().getName()} 
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="imso_mh__scr-sep">
                        <div>
                            <div class="imso_mh__ma-sc-cont">
                                <div class="imso_mh__l-tm-sc imso_mh__scr-it imso-light-font">
                                    {match.getHomeScore().toString()} 
                                </div>
                                <div class="imso_mh__scr-it imso_mh__sep imso-light-font">-</div>
                                <div class="imso_mh__r-tm-sc imso_mh__scr-it imso-light-font">
                                    {match.getAwayScore().toString()} 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="imso_mh__second-tn-ed imso_mh__tnal-cont imso-loa imso-ut imso-tnol" jscontroller="QhKwbc" data-df-team-mid="/m/01_1kk" role="link" tabindex="0" jsdata="EdZxp;_;ByyJhU" jsaction="rcuQ6b:npT2md;hOPlV" data-ved="2ahUKEwiQiYzb3oeNAxXPZ0EAHYurCPIQukt6BAgCEAs">
                        <div class="imso_mh__tm-nm imso-medium-font imso_mh__tm-nm-ew" data-dtype="d3sen">
                            <div class="ellipsisize liveresults-sports-immersive__team-name-width" data-df-team-mid="/m/01_1kk">
                                <span aria-hidden="true">
                                    {match.getAwayTeam().getName()} 
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default PlayerStatsCard;
