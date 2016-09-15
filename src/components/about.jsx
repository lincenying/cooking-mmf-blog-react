import React, {Component} from 'react'

export class About extends Component {
    shouldComponentUpdate() {
        return false
    }
    handleSlideToggle() {
        $(".m-about").slideToggle("800")
    }
    render() {
        return (
            <div>
                <div className="box m-tit">
                    <h1><a onClick={this.handleSlideToggle} href="javascript:;" /></h1>
                    <a onClick={this.handleSlideToggle} href="javascript:;" className="w-icon">{'查看个人介绍'}</a>
                </div>
                <div className="box box-do m-about">
                    <div className="logo">
                        <a href="javascript:;"><img src="http://ww2.sinaimg.cn/large/005uQRNCgw1f4ij3dy4pmj302o02odfo.jpg" /></a>
                    </div>
                    <p>{'姓名: 林岑影'}</p>
                    <p>{'年龄: 1987.09'}</p>
                    <p>{'职业: 前端开发'}</p>
                    <p>{'技能: HTML5 + CSS3 + jQuery + Gulp + WebPack + ES6 + Vue + NodeJS + PHP'}</p>
                    <a onClick={this.handleSlideToggle} href="javascript:;" className="w-icon">{'收起个人介绍'}</a>
                </div>
            </div>
        )
    }
}
