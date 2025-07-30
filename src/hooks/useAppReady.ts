import { useState, useEffect } from 'react';

const useAppReady = (delay = 4000) => {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		const prepare = async () => {
			setTimeout(() => {
				setAppIsReady(true);
			}, delay);
		};
		prepare();
	}, [delay]);

	return appIsReady;
};

export default useAppReady;
