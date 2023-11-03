const formatVideoTime = (secs) => {
	const hour = Math.floor(secs / 3600)
	const mins = Math.floor((secs % 3600) / 60)
	const remainingSecs = secs % 60
	const hh = String(hour).padStart(2, '0')
	const mm = String(mins).padStart(2, '0')
	const ss = String(Math.floor(remainingSecs)).padStart(2, '0')
	const decimalSecs = (remainingSecs % 1).toFixed(2).slice(1)
	return `${hh}:${mm}:${ss}${decimalSecs}`
}

export default formatVideoTime
