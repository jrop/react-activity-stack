import arrify from 'arrify'
import EventEmitter from 'events'
import React from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'

export class StackFrame extends React.Component {
	ee: any

	baseStyle: any
	startStyle: any
	endStyle: any

	props: any
	state: any

	constructor(props) {
		super(props)

		this.ee = new EventEmitter()

		const transistionStyle = {
			transition: 'all 0.3s ease',
		}

		this.baseStyle = Object.assign({
			position: 'absolute',
			width: '100%',
			height: '100%',
			overflow: 'auto',
		}, props.style)

		this.startStyle = Object.assign({
			top: '100%',
			transform: 'rotateX(-30deg) scale(0.5)',
			opacity: '0',
		}, this.baseStyle, transistionStyle)

		this.endStyle = Object.assign({
			top: '0%',
			transform: 'rotateX(0deg) scale(1)',
			opacity: '1',
		}, this.baseStyle, transistionStyle)

		this.state = {
			style: this.baseStyle,
		}
	}

	__play(start, end) {
		this.setState(start)

		// forceUpdate and wait for DOM {{
		return Promise.all([
			new Promise(y => this.ee.once('update', y)),
			new Promise(y => this.forceUpdate(y)),
		])
		.then(() =>
			new Promise(y => setTimeout(y, 50))) // let DOM catch up
		// }}

		.then(() => {
			this.setState(end)
			return new Promise(y => setTimeout(y, 500))
		})
	}

	componentDidUpdate() {
		this.ee.emit('update')
	}
	componentWillEnter(done) {
		this.__play({style: this.startStyle}, {style: this.endStyle})
		.then(() => done())
	}
	componentWillLeave(done) {
		this.__play({style: this.endStyle}, {style: this.startStyle})
		.then(() => done())
	}
	render() {
		return <div style={this.state.style}>
			{this.props.children}
		</div>
	}
}

export class Stack extends React.Component {
	state: {
		stack: any,
	}

	constructor(props) {
		super(props)
		this.state = {
			stack: arrify(props.children),
		}
	}

	push(component) {
		this.setState({
			stack: [...this.state.stack, component],
		})
	}

	pop() {
		const stack = this.state.stack.slice(0, this.state.stack.length - 1) // eslint-disable-line no-unused-vars
		this.setState({stack})
	}

	getChildContext() {
		return {stack: this}
	}

	render() {
		const {stack} = this.state
		return <div style={{
			position: 'relative',
			width: '100%',
			height: '100%',
		}}>
			<ReactTransitionGroup>
					{stack.map((frame, index) => <StackFrame key={index} style={{
						zIndex: index,
						backgroundColor: 'white',
					}}>
					{frame}
				</StackFrame>)}
			</ReactTransitionGroup>
		</div>
	}
}
Stack.childContextTypes = {
	stack: React.PropTypes.object,
}
