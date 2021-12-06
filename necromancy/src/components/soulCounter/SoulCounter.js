import React from 'react';

class SoulCounter extends React.Component {
    render() {
        return (
            <div className="soulCounter">
                <div className="Souls">Souls:</div>
                <div className="count">{this.props.count}</div>
            </div>
        )
    }
}

export default SoulCounter;