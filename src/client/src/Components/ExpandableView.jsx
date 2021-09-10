import React, {  } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './ExpandableView.css';

const ExpandableView = (props) => {
    const { items } = props;

    return (
        <>
            {
                items.map((item) => 
                    <Accordion key={item._id}>
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