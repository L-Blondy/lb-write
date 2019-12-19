import { writeOnVisible, WriteSequence } from "./write.js"

/*********************
 *  writeOnVisible
 */

const elem = document.querySelector( ".elem" )

const options1 = {
	letters: 1,
	speed: 1,
	root: null //viewport
}
writeOnVisible( elem, options1 )
	.then( ( node ) => console.log( node ) )

/*********************
 *  WriteSequence
 */

const nodeList = document.querySelectorAll( "section" );

const options2 = {
	letters: 1,
	speed: 1,
}
const sequence = new WriteSequence( nodeList, options2 )
	.clear()
	.start()
	.then( ( nodeList ) => console.log( nodeList ) )

/*********************
 *  Combine both
 */

// const elem = document.querySelector( ".elem" )
// const nodeList = document.querySelectorAll( "section" );

// const options1 = {
// 	letters: 1,
// 	speed: 1,
// 	root: null //viewport
// }
// const options2 = {
// 	letters: 1,
// 	speed: 1,
// }

// const sequence = new WriteSequence( nodeList, options2 )
// 	.clear()

// writeOnVisible( elem, options1 )
// 	.then( () => sequence.start() )
// 	.then( () => console.log( "sequence finished" ) )