# lb-write

Will take the text content and rewrite it letter by letter when needed.
Based on `requestAnimationFrame`

## Usage

`writeOnVisible` && `WriteSequence` can both take the following as first argument :
- nodeList / array of nodes,
- single node,
- string ( querySelector style )

### **writeOnVisible** 
```
import { writeOnVisible } from "lb-write"

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

### **WriteSequence** 

```
import { WriteSequence } from "lb-write"

...

//optional, the following are the default values
const options = {
	letters: 1,
	speed: 1,
}
//initialization automatically cleans the nodes
const sequence = new WriteSequence( ".elems", options ) 
	.write()
	.then( nodeList => console.log( nodeList ) )
```

###  **Combine both**

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