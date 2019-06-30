function handleKeys(key) {
    if (key === 'w') {
	return { move: { dx: 0, dy: -1 } }
    } else if (key === 's') {
	return { move: { dx: 0, dy: 1 } }
    } else if (key === 'a') {
	return { move: { dx: -1, dy: 0 } }
    } else if (key === 'd') {
	return { move: { dx: 1, dy: 0 } }
    } 

    return {}
}

export default handleKeys
