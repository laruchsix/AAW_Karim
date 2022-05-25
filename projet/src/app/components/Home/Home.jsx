import React, {useState} from "react";
import Planning from "./Planning";
import PlanningTable from "./PlanningTable";

function Home({token, updateToken, titlePage, updateTitlePage}) {
    const [selectedPlanning, setSelectedPlanning] = useState();

    if (selectedPlanning === undefined)
        return <PlanningTable updateSelectedPlanning={setSelectedPlanning} token={token}/>;
    else
        return <Planning planning={selectedPlanning} updateSelectedPlanning={setSelectedPlanning}/>;
}

export default Home;