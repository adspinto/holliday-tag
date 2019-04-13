import React from 'react'


export default class Product extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.pepeRef = React.createRef()
    }
    componentDidMount() {
        this.props.getChildRef(this.pepeRef.current);
    }

    render() {
        return (
            <div ref={this.pepeRef}>TESTE</div>
        )
    }
}