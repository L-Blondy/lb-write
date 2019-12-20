# lb-write

Will take the text content and write it when needed

## Usage

`writeOnVisible` && `WriteSequence` can both take the following as first argument :
- nodeList / array of nodes,
- single node,
- string ( querySelector style )

1. **writeOnVisible** 
```
import { writeOnVisible } from "./write.js"

...

//optional, the following are the default values
const options = {
	letters: 1,
	speed: 1,
	root: null //viewport
}
writeOnVisible( ".elem", options )
	.then( node => console.log( node ) )
```

2. **WriteSequence** 

```
import { WriteSequence } from "./write.js"

...

//optional, the following are the default values
const options = {
	letters: 1,
	speed: 1,
}
const sequence = new WriteSequence( ".elems", options ) //initialization automatically cleans the nodes
	.write()
	.then( nodeList => console.log( nodeList ) )
```

3.  **Combine both**

```

const sequence = new WriteSequence( ".nodes" )

writeOnVisible( ".node" )
	.then( () => sequence.start() )
	.then( () => console.log( "sequence finished" ) )
```

## Notes

- `writeOnVisible` : Will not do anything if browser has no `IntersectionObserver` support.
- `WriteSequence` : Clears all fields on instanciation. Will work on first node only if Promises are not supported
<br/>
Both return a promise containing the node / array of nodes
Both will still work on single nodes if Promises are no supported