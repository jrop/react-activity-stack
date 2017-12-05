// playground: https://codesandbox.io/s/ykr1zr4jzx
import arrify from 'arrify'
import EventEmitter from 'events'
import PropTypes from 'prop-types'
import React from 'react'
import {Transition, TransitionGroup} from 'react-transition-group'

export class StackFrame extends React.Component {
	constructor(props) {
		super(props)

		const baseStyle = Object.assign(
			{
				position: 'absolute',
				width: '100%',
				height: '100%',
				overflow: 'auto',
				transition: 'all 0.3s ease',
			},
			props.style
		)
		const startStyle = Object.assign(
			{
				top: '100%',
				transform: 'rotateX(-30deg) scale(0.5)',
				opacity: '0',
			},
			baseStyle
		)
		const endStyle = Object.assign(
			{
				top: '0%',
				transform: 'rotateX(0deg) scale(1)',
				opacity: '1',
			},
			baseStyle
		)

		this.styles = {
			entering: startStyle,
			entered: endStyle,
			exiting: startStyle,
			exited: endStyle,
		}
	}

	render() {
		return (
			<Transition timeout={300} unmountOnExit={true} {...this.props}>
				{state => <div style={this.styles[state]}>{this.props.children}</div>}
			</Transition>
		)
	}
}

const RelativeDiv = ({children}) => (
	<div
		style={{
			position: 'relative',
			width: '100%',
			height: '100%',
		}}>
		{children}
	</div>
)

export class Stack extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stack: arrify(props.children),
		}
		this.ids = new Map()
		this.state.stack.map(c => this.ids.set(c, this.id()))
	}

	id() {
		const alpha = 'qwertyuiopasdfghjklzxcvbnm'.split('')
		let id = ''
		while (alpha.length) {
			const i = Math.floor(Math.random() * alpha.length)
			id += alpha[i]
			alpha.splice(i, 1)
		}
		return id
	}

	push(component) {
		this.ids.set(component, this.id())
		const newStack = this.state.stack.slice()
		newStack.push(component)
		this.setState({stack: newStack})
	}

	pop() {
		let {stack} = this.state
		const [component] = stack.slice(stack.length - 1)
		this.ids.delete(component)
		stack = stack.slice(0, stack.length - 1) // eslint-disable-line no-unused-vars
		this.setState({stack})
	}

	getChildContext() {
		return {stack: this}
	}

	render() {
		const {stack} = this.state

		return (
			<TransitionGroup component={RelativeDiv}>
				{stack.map((component, index) => (
					<StackFrame
						key={this.ids.get(component)}
						style={{
							zIndex: index,
							backgroundColor: 'white',
						}}>
						{component}
					</StackFrame>
				))}
			</TransitionGroup>
		)
	}
}
Stack.childContextTypes = {
	stack: PropTypes.object,
}
