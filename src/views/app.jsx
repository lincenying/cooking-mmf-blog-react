import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {About} from '../components/about.jsx'
import {MenuFront} from '../components/menu-front.jsx'
import {MenuAdmin} from '../components/menu-admin.jsx'
import {Arrow} from '../components/arrow.jsx'
import {DevTools} from '../components/devtools.jsx'
import {Toastr} from '../components/_toastr.jsx'
import '../html/css/style.css'
import '../html/css/nprogress.css'
import '../html/css/animate.min.css'
import '../html/css/toastr.min.css'

export const App = props => {
    const {route: {needLogin}} = props
    const menu = needLogin === "1" ? <MenuAdmin /> : <MenuFront />
    return (
        <div className="g-doc">
            <div className="g-hd">
                <About />
                {menu}
            </div>
            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {React.cloneElement(props.children, {
                    key: props.location.pathname
                })}
            </ReactCSSTransitionGroup>
            <Arrow />
            <DevTools />
            <Toastr />
        </div>
    )
}
