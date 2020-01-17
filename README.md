# lb-write

Will take the text content and rewrite it letter by letter when needed.<br/>
Based on `requestAnimationFrame`

### **writeOnVisible** 

Will rewrite the element content when the element(s) is/are on screen <br/>
If you want a custom threshold on `writeOnVisible` use `WriteSequence` instead<br/>
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

Rewrite the elements one after another<br/>
Works with :
- nodeList / array of nodes,
- single node,
- string ( querySelector style )

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

## Notes

- `writeOnVisible` : Will not do anything if browser has no `IntersectionObserver` support.
- `WriteSequence` : Clears all fields on instanciation. Will work on first node only if Promises are not supported
<br/>
Both return a promise containing the node / array of nodes
Both will still work on single nodes if Promises are no supported