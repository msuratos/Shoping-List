import React from "react";
import { useSelector } from "react-redux";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './ExpandableView.css';

const ExpandableView = (props) => {
    const { setCurrentCategoryId } = props;
    const items = useSelector(state => state.itemlist.items);

    return (
        <>
            {
                items.map((item) => 
                    <Accordion key={item.categoryid} onChange={(event, expanded) => setCurrentCategoryId(item.categoryid)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content">
                            {item.category}
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {item.items.map((it, i) => <li key={i}>{it}</li>)}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                )
            }
        </>
    );
}

export default ExpandableView;