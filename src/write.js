class Rewrite {
	constructor ( node ) {
		this.node = node;
		this.text_original = node.textContent;
		this.finalLength = node.textContent.length;
		this.executionCount = 0;
		this.letterIndex = 0;
	}
	clear () {
		this.node.textContent = "";
		return this;
	}
	write ( speed = 1, max_letters = 1 ) {
		this.speed = speed;
		this.max_letters = max_letters;

		const loop = resolve => {
			let innerCount = 0;
			//write all necessary letters (max_letters)
			if ( this.executionCount % this.speed === 0 ) {
				while (
					innerCount < this.max_letters &&
					this.letterIndex < this.finalLength
				) {
					this.node.textContent += this.text_original[ this.letterIndex ];
					this.letterIndex++;
					innerCount++;
				}
			}
			//return if text is complete
			if ( this.letterIndex >= this.finalLength ) {
				if ( resolve ) return resolve( this.node );
				else return;
			}
			this.executionCount++;
			window.requestAnimationFrame( () => loop( resolve ) );
		};
		if ( "Promise" in window ) return new Promise( resolve => loop( resolve ) );
		else loop();
	}
}

export function writeOnVisible ( node, options = {} ) {
	typeof node === "string" && ( node = document.querySelector( node ) );
	//options={speed, letters, root}
	if ( !( "IntersectionObserver" in window ) ) return;

	if ( "Promise" in window ) {
		let promise = new Promise( function ( resolve ) {
			const effect = new Rewrite( node ).clear();
			const opts = {
				root: options.root,
				threshold: 0.001
			};
			const cb = entries => {
				entries.forEach( e => {
					if ( e.intersectionRatio > 0 ) {
						effect
							.write( options.speed, options.letters )
							.then( node => resolve( node ) );
						obs.unobserve( node );
					}
				} );
			};
			const obs = new IntersectionObserver( cb, opts );
			obs.observe( node );
		} );
		return promise;
	} else {
		const effect = new Rewrite( node ).clear();
		const opts = {
			root: options.root,
			threshold: 0.001
		};
		const cb = entries => {
			entries.forEach( e => {
				if ( e.intersectionRatio > 0 ) {
					effect.write( options.speed, options.letters );
					obs.unobserve( node );
				}
			} );
		};
		const obs = new IntersectionObserver( cb, opts );
		obs.observe( node );
	}
}

export class WriteSequence {
	//options={speed, letters}
	constructor ( nodeList, options = {} ) {
		this.nodeList = getNodeList( nodeList );
		this.options = options;
		this.clear();

		function getNodeList ( nodeList ) {
			if ( typeof nodeList === "string" ) {
				return document.querySelectorAll( nodeList );
			}
			return nodeList.length ? nodeList : [ nodeList ];
		}
	}
	clear () {
		if ( !( "Promise" in window ) ) {
			const val = new Rewrite( this.nodeList[ 0 ] ).clear()
			this.map = [ val ];
		}
		else
			this.map = [].map.call( this.nodeList, node => new Rewrite( node ).clear() );
		return this;
	}
	write () {
		if ( "Promise" in window ) {
			const seq = ( resolve, index = 0 ) => {
				if ( !( index < this.map.length ) )
					return resolve( [].slice.call( this.nodeList ) );
				this.map[ index ]
					.write( this.options.speed, this.options.letters )
					.then( () => seq( resolve, index + 1 ) );
			};
			return new Promise( resolve => seq( resolve ) );
		}
		else {
			this.map[ 0 ].write( this.options.speed, this.options.letters )
		}
	}
}
