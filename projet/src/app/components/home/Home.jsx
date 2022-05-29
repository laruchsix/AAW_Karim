import React, {useState} from "react";
import Planning from "./Planning";
import PlanningTable from "./PlanningTable";
import Manche from "./Manche";
import {useEffect} from "react";

const Home = ({token, updateToken, title, updateTitle}) => {
    useEffect(() => {
        if (title !== "Home"){
            updateTitle("Home");
        }
    }, [title])


    const [selectedPlanning, setSelectedPlanning] = useState();
    const [selectedManche, setSelectedManche] = useState();

    if (!selectedPlanning)
        return <PlanningTable updateSelectedPlanning={setSelectedPlanning} token={token} updateToken={updateToken}/>;
    else
        if (!selectedManche)
            return <Planning planning={selectedPlanning} updateSelectedPlanning={setSelectedPlanning} token={token} updateSelectedManche={setSelectedManche}/>;
        else
            return <Manche planning={selectedPlanning} manche={selectedManche} updateSelectedPlanning={setSelectedPlanning} token={token} updateSelectedManche={setSelectedManche}/>;
}

export default Home;