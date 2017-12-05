import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {Stack, StackFrame} from '../src'

class App extends Component {
	render() {
		return <div>
			<button onClick={() => this.context.stack.push(<Screen2 />)}>
				Screen 2 =&gt;
			</button>
			<p>APP</p>
		</div>
	}
}
App.contextTypes = {
	stack: PropTypes.object,
}

class Screen2 extends Component {
	render() {
		return <div style={{
			height: '100%',
			background: 'lightblue',
		}}>
			<button onClick={() => this.context.stack.pop()}>
				&lt;= Back
			</button>
			<p>Screen 2</p>
		</div>
	}
}
Screen2.contextTypes = {
	stack: PropTypes.object,
}

window.addEventListener('load', () => {
	ReactDOM.render(<Stack><App /></Stack>, document.getElementById('react'))
})
