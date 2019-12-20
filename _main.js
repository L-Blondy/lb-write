import { writeOnVisible, WriteSequence } from "./src/write.js"
import "./_style.css"

const mySeq = new WriteSequence( "section" ).write().then( array => array.forEach( node => node.classList.add( "gold" ) ) );

// writeOnVisible( ".elem" ).then( node => {
// 	mySeq.write().then( nodeList => {
// 		nodeList.push( node );
// 		nodeList.forEach( node => {
// 			node.classList.add( "gold" );
// 		} );
// 	} );
// } );