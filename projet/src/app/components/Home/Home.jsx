import React, {useState} from "react";
import Planning from "./Planning";
import PlanningTable from "./PlanningTable";
import Manche from "./Manche";

function Home({token, updateToken, titlePage, updateTitlePage}) {
    const [selectedPlanning, setSelectedPlanning] = useState();
    const [selectedManche, setSelectedManche] = useState();

    if (selectedPlanning === undefined)
        return <PlanningTable updateSelectedPlanning={setSelectedPlanning} token={token}/>;
    else
        if (selectedManche === undefined)
            return <Planning planning={selectedPlanning} updateSelectedPlanning={setSelectedPlanning} token={token} updateSelectedManche={setSelectedManche}/>;
        else
            return <Manche planning={selectedPlanning} manche={selectedManche} updateSelectedPlanning={setSelectedPlanning} token={token} updateSelectedManche={setSelectedManche}/>;
}

export default Home;