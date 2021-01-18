import React from "react";
import './expandableview.css';

class ExpandableView extends React.Component {
    formatText(inputKey) {
        const key = inputKey.key;

        console.log('key has been pressed', key);

        switch (key) {
            case '-':
                inputKey.preventDefault();
                document.execCommand('insertunorderedlist', false, null);
                break;
        
            default:
                break;
        }
    }

    render() {
        return (
            <div id="editContainer" className="container" contentEditable={true} suppressContentEditableWarning={true} onKeyPress={this.formatText}>
                Hello from expandable view
            </div>
        );
    }
}

export default ExpandableView;