import React from "react";
import './expandableview.css';

function createCheckboxAndLabel(divContainer, key) {
    let inputCheckbox = document.createElement('input');
    let labelInput = document.createElement('label');

    inputCheckbox.type = 'checkbox';
    inputCheckbox.name = 'item1';
    inputCheckbox.value = key;

    labelInput.htmlFor = 'item1';
    labelInput.id = 'item1';
    labelInput.textContent = key;

    divContainer.append(inputCheckbox);
    divContainer.append(labelInput);
}

class ExpandableView extends React.Component {
    formatText(inputKey) {
        let key = inputKey.key;
        console.log(`${key} key was pressed`);
        
        let divContainer = document.querySelector("#editContainer");

        // Make sure that the first input will have a checkbox input
        if (divContainer.innerHTML === '' || divContainer.innerHTML === undefined || divContainer.innerHTML === null) {
            inputKey.preventDefault();
            createCheckboxAndLabel(divContainer, key);
        }
        // Check for the enter key.
        // If so, create a new input checkbox element
        else if (key === 'Enter') {
            createCheckboxAndLabel(divContainer, '');
        }
        // Modify label and input checkbox with the key press value
        else {
            inputKey.preventDefault();

            const inputCheckbox = document.querySelector("input[name='item1']");
            const labelInput = document.getElementById("item1");

            inputCheckbox.value += key;
            labelInput.textContent += key;
        }
    }

    render() {
        return (
            <div id="editContainer" className="container" contentEditable={true} suppressContentEditableWarning={true} onKeyPress={this.formatText}></div>
        );
    }
}

export default ExpandableView;