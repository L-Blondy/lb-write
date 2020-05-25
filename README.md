# lb-write

Exposes two functions that will clear the text content of any element and rewrite it letter by letter when specified.  
- `writeOnVisible` will trigger the effect when the element is visible. Will not do anything if browser has no `IntersectionObserver` support.
- `writeSequence` is manually triggerred and will write all of its targets in a sequence. Will work only on the first node if `Promises` are not supported
They both return a promise resolving with the target node / array of nodes once the effect is over.  

### **writeOnVisible** 

Rewrites the content when the element intersects with the root.  
Works with :
- single node,
- string ( querySelector style )
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

Rewrites the content of the elements in a sequence.  
Works with :
- nodeList / array of nodes,
- single node,
- string ( querySelectorAll style )

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
	.then( () => sequence.write() )
	.then( () => console.log( "sequence finished" ) )
```