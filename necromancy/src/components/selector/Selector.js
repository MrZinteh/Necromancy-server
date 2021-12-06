import React from 'react';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.updateStyle = this.updateStyle.bind(this);
    }

    updateStyle(selectedMinion, minionType) {
        if (selectedMinion === minionType) {
            return {
                color: "#456545",
                fontWeight: "bold"
            }
        }
        else {
            return {
                color: "black",
                fontWeight: "normal"
            }
        }
    }

    render() {
        const selectMinion = this.props.selectMinion;
        const selectedMinion = this.props.selectedMinion;
        return (
            <div className='Selector'>
                <div className='selectorItem' id='Skeleton' onClick={selectMinion} style={ this.updateStyle(selectedMinion, 'Skeleton') }>Skeleton</div>
                <div className='selectorItem' id='Zombie' onClick={selectMinion} style={ this.updateStyle(selectedMinion, 'Zombie') }>Zombie</div>
                <div className='selectorItem' id='Ghoul' onClick={selectMinion} style={ this.updateStyle(selectedMinion, 'Ghoul') }>Ghoul</div>
                <div className='selectorItem' id='Ghast' onClick={selectMinion} style={ this.updateStyle(selectedMinion, 'Ghast') }>Ghast</div>
                <div className='selectorItem' id='Wight' onClick={selectMinion} style={ this.updateStyle(selectedMinion, 'Wight') }>Wight</div>
                <div className='selectorItem' id='Mummy' onClick={selectMinion} style={ this.updateStyle(selectedMinion, 'Mummy') }>Mummy</div>
                <div className='selectorItem' id='Undead Spirit' onClick={selectMinion} style={ this.updateStyle(selectedMinion, 'Undead Spirit') }>Undead Spirit</div>
            </div>
        );
    }
}

export default Selector;