# react-activity-stack

Emulates an Android activity stack (including animations), for React.

## Installation

```sh
$ npm install --save-dev react-activity-stack
$ # OR
$ yarn add --dev react-activity-stack
```

## Use

```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Stack} from 'react-activity-stack'

class Home extends Component {
	render() {
		return <div style={{width: '100%', height: '100%'}}>
			<button onClick={() => this.context.stack.push(<About />)}>
				About
			</button>
			<p>Home</p>
		</div>
	}
}
Home.contextTypes = {stack: React.PropTypes.object}

class About extends Component {
	render() {
		return <div style={{width: '100%', height: '100%'}}>
			<button onClick={() => this.context.stack.pop()}>
				Back
			</button>
			<p>About</p>
		</div>
	}
}
About.contextTypes = {stack: React.PropTypes.object}

ReactDOM.render(<Stack>
	<Home />
</Stack>, document.getElementById('root'))
```

## License

ISC License (ISC)
Copyright (c) 2016, Jonathan Apodaca <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
