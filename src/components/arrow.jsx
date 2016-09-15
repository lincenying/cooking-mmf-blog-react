import React, {Component} from 'react'

export class Arrow extends Component {
    constructor(props) {
        super(props)
        this.handleGoTop = this.handleGoTop.bind(this)
        this.handleGoBack = this.handleGoBack.bind(this)
    }
    shouldComponentUpdate () {
        return false
    }
    handleGoTop() {
        window.scrollTo(0, 0)
    }
    handleGoBack() {
        window.history.go(-1)
    }
    render() {
        return (
            <div className="arrow">
                <a className="go-top" href="javascript:;" onClick={this.handleGoTop} />
                <a className="go-back" href="javascript:;" onClick={this.handleGoBack} />
            </div>
        )
    }
}
